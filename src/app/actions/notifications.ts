"use server";

import { db } from "@/lib/prisma";
import { createSafeAction, actionResult } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";

export const markAllAsRead = createSafeAction(
  null, // Pas de schéma d'entrée nécessaire
  async ({ userId }) => {
    
    // CORRECTION : Vérification de sécurité pour TypeScript
    if (!userId) return actionResult.error("Non autorisé.");

    try {
      await db.notification.updateMany({
        where: { 
          userId: userId, // Maintenant TypeScript sait que c'est un string
          read: false 
        },
        data: { read: true }
      });

      revalidatePath("/"); // On rafraîchit tout (pour mettre à jour la cloche du header)
      return actionResult.success("Notifications marquées comme lues.");
    } catch (e) {
      return actionResult.error("Erreur serveur.");
    }
  },
  // Pas de restriction de rôle stricte, tout utilisateur connecté peut lire ses notifs
);