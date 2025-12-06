"use server";

import { z } from "zod";
import { createSafeAction, actionResult } from "@/lib/safe-action";
import { db } from "@/lib/prisma";

const SettingsSchema = z.object({
  companyName: z.string().optional(),
  ninea: z.string().optional(),
  logoUrl: z.string().optional().nullable(),
  signatureUrl: z.string().optional().nullable(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  website: z.string().optional(),
});

export const updateAgencySettings = createSafeAction(
  SettingsSchema,
  async ({ userId }, data) => {
    
    // 👇 CORRECTION CRITIQUE : Cette vérification est obligatoire pour TypeScript
    if (!userId) {
      return actionResult.error("Utilisateur non identifié.");
    }

    // Maintenant TypeScript sait que 'userId' est une string valide
    await db.agencySettings.upsert({
      where: { userId },
      update: { ...data },
      create: { 
        userId, 
        ...data 
      },
    });
    
    return actionResult.success("Paramètres mis à jour !");
  },
  { rolesAllowed: ["AGENCY", "OWNER"] }
);