"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createSafeAction, actionResult } from "@/lib/safe-action";

// Regex Téléphone Sénégal
const PHONE_REGEX = /^(?:221|\+221)?(?:70|71|75|76|77|78)\d{7}$/;

// Schéma de validation complet
const TenantSchema = z.object({
  // 1. Identité
  firstName: z.string().min(2, "Prénom requis"),
  lastName: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().regex(PHONE_REGEX, "Numéro invalide"),
  
  // 2. Le Bien
  propertyId: z.string().min(1, "Veuillez sélectionner un bien"),

  // 3. Le Bail (Finances)
  rentAmount: z.coerce.number().positive("Le loyer doit être positif"),
  deposit: z.coerce.number().min(0).default(0),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), "Date invalide"),
});

export const createTenant = createSafeAction(
  TenantSchema,
  async ({ userId }, data) => {
    
    // Vérification de sécurité
    if (!userId) return actionResult.error("Non autorisé.");

    // On utilise une TRANSACTION pour que tout réussisse ou tout échoue ensemble
    await db.$transaction(async (tx) => {
      
      // A. Vérifier si le bien est disponible et appartient au manager
      const property = await tx.property.findUnique({
        where: { id: data.propertyId, managerId: userId }
      });

      if (!property) throw new Error("Bien introuvable.");
      if (property.status === "RENTED") throw new Error("Ce bien est déjà loué !");

      // B. Créer le Locataire
      const tenant = await tx.tenant.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone.replace(/\s/g, ''), // Nettoyage
          propertyId: data.propertyId,
          solvencyScore: 100, // Score de départ neutre
        }
      });

      // C. Créer le Bail (Lease) - 1 an par défaut
      const startDate = new Date(data.startDate);
      const endDate = new Date(startDate);
      endDate.setFullYear(endDate.getFullYear() + 1); 

      const lease = await tx.lease.create({
        data: {
          startDate: startDate,
          endDate: endDate,
          rentAmount: data.rentAmount,
          deposit: data.deposit,
          status: "ACTIVE",
          propertyId: data.propertyId,
          tenantId: tenant.id,
          userId: userId, 
        }
      });

      // D. Générer le Premier Paiement (À payer)
      await tx.payment.create({
        data: {
          amount: data.rentAmount,
          status: "PENDING",
          date: startDate, // Date d'émission
          dueDate: startDate, // Date limite (entrée dans les lieux)
          leaseId: lease.id,
          tenantId: tenant.id,
        }
      });

      // E. Mettre à jour le statut du bien
      await tx.property.update({
        where: { id: data.propertyId },
        data: { status: "RENTED" }
      });
    });

    // F. Rafraîchissement global
    revalidatePath("/tenants");
    revalidatePath("/properties");
    revalidatePath("/dashboard");
    revalidatePath("/payments");

    return actionResult.success("Locataire installé avec succès !");
  },
  { rolesAllowed: ["AGENCY", "OWNER"] }
);