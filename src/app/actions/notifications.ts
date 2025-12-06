"use server";

import { db } from "@/lib/prisma";
import { createSafeAction, actionResult } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Schéma pour une seule notification
const MarkSingleReadSchema = z.object({
  notificationId: z.string(),
});

// --- ACTION 1 : Marquer UNE notification comme lue ---
export const markAsRead = createSafeAction(
  MarkSingleReadSchema,
  async ({ userId }, { notificationId }) => {
    
    if (!userId) return actionResult.error("Non autorisé.");

    try {
      await db.notification.update({
        where: { 
          id: notificationId,
          userId: userId // Sécurité : on vérifie que c'est bien sa notif
        },
        data: { read: true }
      });

      revalidatePath("/"); 
      return actionResult.success("Notification lue.");
    } catch (e) {
      return actionResult.error("Erreur serveur.");
    }
  }
);

// --- ACTION 2 : Tout marquer comme lu ---
export const markAllAsRead = createSafeAction(
  z.object({}), // On met un objet vide explicite pour satisfaire TypeScript
  async ({ userId }) => {
    
    if (!userId) return actionResult.error("Non autorisé.");

    try {
      await db.notification.updateMany({
        where: { 
          userId: userId, 
          read: false 
        },
        data: { read: true }
      });

      revalidatePath("/");
      return actionResult.success("Tout est marqué comme lu.");
    } catch (e) {
      return actionResult.error("Erreur serveur.");
    }
  }
);