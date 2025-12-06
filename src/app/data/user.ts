import "server-only"; // Sécurité : Empêche l'import côté client
import { db } from "@/lib/prisma";
import { cache } from "react";
import { headers } from "next/headers";
import { verifySession } from "@/lib/session";

/**
 * Récupère l'utilisateur courant.
 * Fonction optimisée pour le rendu serveur (RSC).
 * Utilise 'cache' pour dédupliquer les appels dans une même requête.
 */
export const getUserMe = cache(async () => {
  // 1. Vérification session (Plus robuste que juste les headers)
  const session = await verifySession();
  if (!session?.userId) return null;

  // 2. Requête BDD optimisée
  try {
    const user = await db.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        roles: true,
        phone: true,
        isVerified: true,
        avatar: true, // Ajout utile pour l'UI
        agencySettings: { // On récupère aussi les settings si c'est une agence
            select: {
                companyName: true,
                logoUrl: true
            }
        }
      },
    });

    return user;
  } catch (error) {
    console.error("Erreur récupération user:", error);
    return null;
  }
});