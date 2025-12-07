"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createSafeAction, actionResult } from "@/lib/safe-action";

// Petite fonction interne pour slugifier
function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// --- HELPER : DÉTECTION DE CYCLE (SHERLOCK HOLMES) ---
// Vérifie si "targetId" est un ancêtre de "startId"
async function isDescendant(candidateParentId: string, childId: string) {
  let currentId = candidateParentId;
  
  // On remonte la chaîne des parents jusqu'en haut
  // (Limité à 10 niveaux par sécurité pour éviter une boucle infinie ici aussi)
  for (let i = 0; i < 10; i++) {
    if (currentId === childId) return true; // Cycle trouvé !
    
    const parent = await db.property.findUnique({
      where: { id: currentId },
      select: { parentId: true }
    });
    
    if (!parent || !parent.parentId) break; // Pas de parent, on arrête
    currentId = parent.parentId;
  }
  return false;
}

// ----------------------------------------------------
//  ZOD : SCHEMA
// ----------------------------------------------------

const PropertySchema = z.object({
  title: z.string().min(3, "Titre trop court"),
  address: z.string().min(5, "Adresse requise"),
  city: z.string().min(2, "Ville requise"),

  type: z.enum([
    "APARTMENT", "HOUSE", "STUDIO", "OFFICE", "RETAIL", 
    "WAREHOUSE", "INDUSTRIAL", "LAND", "PARKING", 
    "BUILDING", "ROOM"
  ]),

  price: z.coerce.number().nonnegative(),
  surface: z.coerce.number().positive().optional(),
  rooms: z.coerce.number().int().min(0).optional(),
  coverImage: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(),
});

// ----------------------------------------------------
// 1️⃣ ACTION : CRÉATION
// ----------------------------------------------------

export const createProperty = createSafeAction(
  PropertySchema,
  async ({ userId }, data) => {
    
    // 👇 CORRECTION CRITIQUE : Vérification obligatoire
    if (!userId) {
      return actionResult.error("Utilisateur non identifié.");
    }

    const base = slugify(data.title);
    const slug = `${base}-${Date.now().toString().slice(-4)}`;

    await db.property.create({
      data: {
        ...data,
        slug,
        managerId: userId, // TypeScript sait maintenant que userId est une string valide
        currency: "XOF",
        status: "AVAILABLE",
        images: data.coverImage ? [data.coverImage] : [],
      },
    });

    revalidatePath("/properties");
    revalidatePath("/dashboard");

    if (data.parentId) {
      revalidatePath(`/properties/${data.parentId}`);
    }

    return actionResult.success("Bien créé avec succès !");
  },
  { rolesAllowed: ["AGENCY", "OWNER"] }
);

// ----------------------------------------------------
// 2️⃣ ACTION : UPDATE (SÉCURISÉE)
// ----------------------------------------------------

const UpdatePropertySchema = PropertySchema.extend({
  id: z.string().min(1, "ID manquant"),
});

export const updateProperty = createSafeAction(
  UpdatePropertySchema,
  async ({ userId }, data) => {

    // 👇 CORRECTION CRITIQUE
    if (!userId) {
      return actionResult.error("Utilisateur non identifié.");
    }

    // 1. Sécurité de base
    if (data.id === data.parentId) {
      return actionResult.error("Un bien ne peut pas être lié à lui-même.");
    }

    // 2. Sécurité Avancée (Anti-Cycle)
    if (data.parentId) {
       const cycleDetected = await isDescendant(data.parentId, data.id);
       if (cycleDetected) {
          return actionResult.error("Impossible : Ce changement créerait une boucle infinie.");
       }
    }

    // 3. Vérification Propriété
    const existing = await db.property.findFirst({
      where: { id: data.id, managerId: userId },
    });

    if (!existing) {
      return actionResult.error("Bien introuvable ou accès non autorisé.");
    }

    // 4. Mise à jour
    await db.property.update({
      where: { id: data.id },
      data: {
        title: data.title,
        address: data.address,
        city: data.city,
        type: data.type,
        price: data.price,
        surface: data.surface,
        rooms: data.rooms,
        coverImage: data.coverImage,
        parentId: data.parentId ?? null,
      },
    });

    revalidatePath(`/properties/${data.id}`);
    revalidatePath("/properties");

    return actionResult.success("Modifications enregistrées.");
  },
  { rolesAllowed: ["AGENCY", "OWNER"] }
);

// ----------------------------------------------------
// 3️⃣ ACTION : DELETE
// ----------------------------------------------------

const DeletePropertySchema = z.object({
  id: z.string().min(1),
});

export const deleteProperty = createSafeAction(
  DeletePropertySchema,
  async ({ userId }, { id }) => {

    // 👇 CORRECTION CRITIQUE
    if (!userId) {
      return actionResult.error("Utilisateur non identifié.");
    }

    // Anti-orphelins
    const children = await db.property.count({
      where: { parentId: id },
    });

    if (children > 0) {
      return actionResult.error(`Impossible de supprimer : ce bien contient ${children} lots. Supprimez-les d'abord.`);
    }

    const result = await db.property.deleteMany({
      where: { id, managerId: userId },
    });

    if (result.count === 0) {
      return actionResult.error("Impossible de supprimer ce bien.");
    }

    revalidatePath("/properties");
    revalidatePath("/dashboard");

    return actionResult.success("Bien supprimé.");
  },
  { rolesAllowed: ["AGENCY", "OWNER"] }
);