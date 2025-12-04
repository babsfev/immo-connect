import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Vérifie si l'utilisateur connecté a l'un des rôles requis.
 * Utilise les headers injectés par le Middleware (Ultra-rapide).
 */
export async function requireRole(allowedRoles: string[]) { // <-- Ajout de async
  const headerList = await headers(); // <-- Ajout de await
  
  const role = headerList.get("x-user-role");
  const userId = headerList.get("x-user-id");

  // 1. Si pas d'utilisateur, on éjecte
  if (!userId || !role) {
    redirect("/login");
  }

  // 2. Si le rôle n'est pas autorisé, on lance une erreur (que le client attrapera)
  if (!allowedRoles.includes(role)) {
    throw new Error("⛔ Accès interdit : Vous n'avez pas les droits nécessaires.");
  }

  // 3. On renvoie l'ID pour l'utiliser dans la requête BDD
  return { userId, role };
}

/**
 * Version pour récupérer l'utilisateur sans bloquer (optionnel)
 */
export async function getCurrentUser() { // <-- Ajout de async
  const headerList = await headers(); // <-- Ajout de await
  
  const userId = headerList.get("x-user-id");
  const role = headerList.get("x-user-role");
  
  if (!userId) return null;
  
  return { userId, role };
}