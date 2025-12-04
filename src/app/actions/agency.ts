"use server";

import { z } from "zod";
import { createSafeAction, actionResult } from "@/lib/safe-action";
import { db } from "@/lib/prisma";

const SettingsSchema = z.object({
  companyName: z.string().optional(),
  ninea: z.string().optional(),
  // ... autres champs textuels
  logoUrl: z.string().optional().nullable(),      // <-- URL String
  signatureUrl: z.string().optional().nullable(), // <-- URL String
});

export const updateAgencySettings = createSafeAction(
  SettingsSchema,
  async ({ userId }, data) => {
    await db.agencySettings.upsert({
      where: { userId },
      update: { ...data },
      create: { userId, ...data },
    });
    return actionResult.success("Paramètres mis à jour !");
  },
  { rolesAllowed: ["AGENCY", "OWNER"] }
);