"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createSafeAction, actionResult } from "@/lib/safe-action";

// --- CONFIGURATION ---
const PHONE_REGEX = /^(?:221|\+221)?(?:70|71|75|76|77|78)\d{7}$/;

const PhoneSchema = z.object({
  phone: z.string().regex(PHONE_REGEX, "Numéro invalide. Opérateurs autorisés : 70, 71, 75, 76, 77, 78."),
});

// --- ACTIONS DE MODIFICATION ---

export const updateUserPhone = createSafeAction(
  PhoneSchema,
  async ({ userId }, input) => { 
    
    // CORRECTION ICI : On s'assure que userId n'est pas null/undefined
    if (!userId) {
        return actionResult.error("Utilisateur non identifié.");
    }
    
    // Maintenant TypeScript sait que userId est un string
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) return actionResult.error("Utilisateur introuvable.");

    try {
        await db.user.update({
          where: { id: userId }, // Ici aussi, userId est sûr
          data: { phone: input.phone },
        });

        revalidatePath("/dashboard");
        revalidatePath("/settings");
        
        return actionResult.success("Profil mis à jour.", { phone: input.phone });
    } catch (e) {
        return actionResult.error("Erreur lors de la mise à jour.");
    }
  },
  { rolesAllowed: ["AGENCY", "OWNER", "TENANT"] }
);