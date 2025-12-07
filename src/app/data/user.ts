import "server-only";
import { db } from "@/lib/prisma";
import { cache } from "react";
import { headers } from "next/headers";

/**
 * Récupère l'utilisateur courant depuis la base de données.
 * Utilise le cache React pour éviter les doubles requêtes.
 */
export const getUserMe = cache(async () => {
  const headerList = await headers();
  const userId = headerList.get("x-user-id");
  
  if (!userId) return null;

  try {
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
        avatar: true, // Important pour la Sidebar
      },
    });

    return user;
  } catch (error) {
    return null;
  }
});