import { headers } from "next/headers";
import { z } from "zod";

// 1. Typage Renforcé (Status toujours présent)
export type ActionResult<T = any> =
  | { ok: true; data?: T; message?: string; status: number }
  | { ok: false; error: string; details?: any; status: number };

// 2. Helpers Sécurisés
export const actionResult = {
  success: <T>(message: string, data?: T): ActionResult<T> => ({
    ok: true,
    message,
    data,
    status: 200,
  }),

  error: (message: string, details?: any, status = 500): ActionResult<any> => ({
    ok: false,
    error: message,
    details,
    status,
  }),
};

// 3. Le Wrapper Blindé
export function createSafeAction<TInput, TOutput>(
  schema: z.Schema<TInput> | null,
  handler: (
    ctx: { userId: string | null; userRole: string }, 
    input: TInput
  ) => Promise<ActionResult<TOutput>>,
  options: { 
    rolesAllowed?: string[];
    isPublic?: boolean; // <--- NOUVELLE OPTION CRITIQUE
  } = {} // Par défaut : Pas public, pas de rôle spécifique
) {
  return async (rawData: TInput | FormData): Promise<ActionResult<TOutput>> => {
    try {
      const headerList = await headers();
      
      // CORRECTION CRITIQUE : userId propre (null si vide)
      const rawUserId = headerList.get("x-user-id");
      const userId = rawUserId && rawUserId.trim() !== "" ? rawUserId : null;

      const userRole = headerList.get("x-user-role") || "GUEST";

      // 1. Sécurité : Connexion Requise (Sauf si public)
      if (!options.isPublic && !userId) {
        return actionResult.error("Connexion requise.", null, 401);
      }

      // 2. Sécurité : RBAC (Seulement si connecté et rôle requis)
      if (userId && options.rolesAllowed && !options.rolesAllowed.includes(userRole)) {
        return actionResult.error("Accès refusé.", null, 403);
      }

      let parsedInput = rawData as TInput;

      // 3. Validation Zod Sécurisée
      if (schema) {
        const obj = rawData instanceof FormData
            ? Object.fromEntries(rawData.entries())
            : rawData;

        const validation = schema.safeParse(obj);

        if (!validation.success) {
          // CORRECTION CRITIQUE : On ne renvoie que le premier message, pas la stack technique complète
          const msg = validation.error.issues[0]?.message || "Données invalides";
          // On garde details pour l'affichage inline dans le formulaire (helperText)
          return actionResult.error(msg, validation.error.flatten().fieldErrors, 400);
        }

        parsedInput = validation.data;
      }

      // 4. Exécution
      return await handler({ userId, userRole }, parsedInput);

    } catch (err) {
      // CORRECTION CRITIQUE : Log serveur uniquement
      console.error("[SAFE ACTION ERROR]", err);
      return actionResult.error("Erreur serveur interne.", null, 500);
    }
  };
}