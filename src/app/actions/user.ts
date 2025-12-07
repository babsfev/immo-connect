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

// --- ACTIONS ---

/**
 * Mise à jour du téléphone
 */
export const updateUserPhone = createSafeAction(
  PhoneSchema,
  async ({ userId }, input) => {
    
    // Sécurité TypeScript : on vérifie que l'ID est bien là
    if (!userId) {
        return actionResult.error("Utilisateur non identifié.");
    }

    await db.user.update({
      where: { id: userId },
      data: { phone: input.phone },
    });

    // On rafraîchit l'interface
    revalidatePath("/dashboard");
    
    return actionResult.success("Profil mis à jour.", { phone: input.phone });
  },
  { rolesAllowed: ["AGENCY", "OWNER", "TENANT"] }
);