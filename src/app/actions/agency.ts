"use server";

import { z } from "zod";
import { createSafeAction, actionResult } from "@/lib/safe-action";
import { db } from "@/lib/prisma";

const SettingsSchema = z.object({
  companyName: z.string().optional(),
  ninea: z.string().optional(),
  logoUrl: z.string().optional().nullable(),
  signatureUrl: z.string().optional().nullable(),
});

export const updateAgencySettings = createSafeAction(
  SettingsSchema,
  async ({ userId }, data) => {
    
    // 👇 CORRECTION ICI : On vérifie (et on type) userId
    if (!userId) {
      return actionResult.error("Utilisateur non identifié.");
    }

    // Maintenant TypeScript sait que userId est un string !
    await db.agencySettings.upsert({
      where: { userId }, 
      update: { ...data },
      create: { 
        userId, // Ici aussi c'est safe maintenant
        ...data 
      },
    });
    
    return actionResult.success("Paramètres mis à jour !");
  },
  { rolesAllowed: ["AGENCY", "OWNER"] }
);