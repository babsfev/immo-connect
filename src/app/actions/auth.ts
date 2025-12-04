"use server";

import { db } from "@/lib/prisma";
import { createClient } from "@/lib/supabase-server";
import { z } from "zod";
import { hash, compare } from "bcryptjs";
import { createSession, deleteSession } from "@/lib/session";
import { createSafeAction, actionResult } from "@/lib/safe-action";

// --- SCHÉMAS ---
const LoginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});

const ResetSchema = z.object({
  email: z.string().email("Email invalide"),
});

const RegisterSchema = z.object({
  firstName: z.string().min(2, "2 caractères minimum"),
  lastName: z.string().min(2, "2 caractères minimum"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(9, "Numéro invalide"),
  password: z.string().min(8, "8 caractères minimum"),
  role: z.enum(["AGENCY", "OWNER"]),
});

const UpdatePasswordSchema = z.object({
  password: z.string().min(8, "Le mot de passe doit faire 8 caractères min."),
});

// --- ACTION 1 : INSCRIPTION (Publique) ---
export const registerUser = createSafeAction(
  RegisterSchema,
  async (_, data) => {
    const existing = await db.user.findUnique({ where: { email: data.email } });
    if (existing) return actionResult.error("Cet email est déjà utilisé.");

    const supabase = await createClient();
    const { data: sbData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { first_name: data.firstName, last_name: data.lastName, role: data.role, phone: data.phone },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/auth/callback`,
      }
    });

    if (error) return actionResult.error(error.message);

    if (sbData.user) {
      try {
        const hashedPassword = await hash(data.password, 10);
        // Nettoyage du téléphone avant insertion
        const cleanPhone = data.phone.replace(/\s/g, '');
        
        await db.user.create({
          data: {
            id: sbData.user.id,
            email: data.email,
            password: hashedPassword,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: cleanPhone,
            roles: [data.role],
            isVerified: false,
          },
        });
      } catch (e) { 
        return actionResult.error("Erreur lors de la création du compte en base de données."); 
      }
    }
    return actionResult.success("Compte créé ! Vérifiez vos emails.");
  },
  { isPublic: true } // IMPORTANT : Accessible sans être connecté
);

// --- ACTION 2 : CONNEXION (Publique) ---
export const loginUser = createSafeAction(
  LoginSchema,
  async (_, data) => {
    const user = await db.user.findUnique({ where: { email: data.email } });
    if (!user) return actionResult.error("Identifiants incorrects.");

    const isValid = await compare(data.password, user.password);
    if (!isValid) return actionResult.error("Identifiants incorrects.");

    // Création de la session HTTP-only
    await createSession(user.id, user.roles[0] || "PROSPECT");
    
    return actionResult.success("Connexion réussie");
  },
  { isPublic: true } // IMPORTANT : Accessible sans être connecté
);

// --- ACTION 3 : RESET PASSWORD (Publique) ---
export const resetPassword = createSafeAction(
  ResetSchema,
  async (_, data) => {
    const supabase = await createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/auth/update-password`,
    });

    if (error) return actionResult.error("Impossible d'envoyer l'email.");
    
    return actionResult.success("Email envoyé !");
  },
  { isPublic: true } // IMPORTANT
);

// --- ACTION 4 : DÉCONNEXION ---
export async function logoutUser() {
  const supabase = await createClient();
  await supabase.auth.signOut(); // Déconnexion Supabase
  await deleteSession();         // Suppression cookie
  return { success: true };
}

// --- ACTION 5 : MISE À JOUR MOT DE PASSE (Protégée) ---
export const updateUserPassword = createSafeAction(
  UpdatePasswordSchema,
  async ({ userId }, data) => {
    
    // CORRECTION ICI : On rassure TypeScript
    if (!userId) return actionResult.error("Non autorisé.");

    const supabase = await createClient();
    
    // 1. Update Supabase Auth
    const { error } = await supabase.auth.updateUser({ password: data.password });
    
    if (error) {
      return actionResult.error("Erreur Supabase: " + error.message);
    }

    // 2. Update Prisma
    try {
      const hashedPassword = await hash(data.password, 10);
      await db.user.update({
        where: { id: userId }, // Maintenant TypeScript sait que userId est un string !
        data: { password: hashedPassword }
      });
    } catch (e) {
      return actionResult.error("Erreur de synchronisation.");
    }

    return actionResult.success("Mot de passe mis à jour avec succès.");
  }
);