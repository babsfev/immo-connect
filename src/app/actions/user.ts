"use server";

import { db } from "@/lib/prisma";
import { cache } from "react";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createSafeAction, actionResult } from "@/lib/safe-action"; // Ensure this import is correct
import { headers } from "next/headers";

// --- CONFIGURATION ---

const PHONE_REGEX = /^(?:221|\+221)?(?:70|71|75|76|77|78)\d{7}$/;

const PhoneSchema = z.object({
  phone: z.string().regex(PHONE_REGEX, "Numéro invalide. Opérateurs autorisés : 70, 71, 75, 76, 77, 78."),
});

// --- ACTIONS ---

/**
 * Récupération User (Direct read, cached)
 * This is the function causing the error - ensure it is exported!
 */
export const getUserMe = cache(async () => {
  const headerList = await headers();
  const userId = headerList.get("x-user-id");
  
  if (!userId) return null;

  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      roles: true,
      phone: true,
      isVerified: true,
    },
  });

  return user;
});

/**
 * Mise à jour téléphone
 */
export const updateUserPhone = createSafeAction(
  PhoneSchema,
  async ({ userId }, input) => {
    
    await db.user.update({
      where: { id: userId },
      data: { phone: input.phone },
    });

    revalidatePath("/dashboard");
    
    return actionResult.success("Profil mis à jour.", { phone: input.phone });
  },
  { rolesAllowed: ["AGENCY", "OWNER"] } // Optional RBAC
);