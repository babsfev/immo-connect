import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/session";
import { db } from "@/lib/prisma";
import { cache } from "react";

export const verifyUser = cache(async () => {
  const session = await verifySession();
  
  if (!session || !session.userId) {
    redirect("/login");
  }

  try {
    // On vérifie que l'utilisateur existe VRAIMENT en base (pas juste dans le cookie)
    const user = await db.user.findUnique({
      where: { id: session.userId },
      select: { 
        id: true, 
        email: true, 
        roles: true, // Important pour les permissions
        firstName: true 
      }
    });

    if (!user) {
      // Si le cookie est valide mais l'user supprimé -> Dehors
      redirect("/login");
    }

    return user;
  } catch (error) {
    redirect("/login");
  }
});