"use server";

import { db } from "@/lib/prisma";
import { createClient } from "@/lib/supabase-server"; // Assure-toi que ce fichier existe bien
import { z } from "zod";
import { hash } from "bcryptjs"; // On garde le hash uniquement pour satisfaire la contrainte Prisma temporairement
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
    // 1. Vérification locale pour éviter les appels inutiles
    const existing = await db.user.findUnique({ where: { email: data.email } });
    if (existing) return actionResult.error("Cet email est déjà utilisé.");

    const supabase = await createClient();
    
    // 2. Création dans Supabase Auth (Source de vérité pour les credentials)
    const { data: sbData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { 
          first_name: data.firstName, 
          last_name: data.lastName, 
          role: data.role, 
          phone: data.phone 
        },
        // Important : Désactive l'auto-confirm si tu veux valider les emails
        // emailRedirectTo: ... 
      }
    });

    if (error) return actionResult.error(error.message);

    if (sbData.user) {
      try {
        // 3. Synchronisation dans Prisma (Pour les données métier)
        // Note: On stocke quand même un hash bidon ou réel pour satisfaire la contrainte "NOT NULL" de Prisma
        // Mais ce mot de passe ne sera PLUS JAMAIS vérifié lors du login.
        const hashedPassword = await hash(data.password, 10);
        const cleanPhone = data.phone.replace(/\s/g, '');
        
        await db.user.create({
          data: {
            id: sbData.user.id, // On force l'ID pour qu'il soit identique à Supabase (CRUCIAL)
            email: data.email,
            password: hashedPassword, // Champ legacy (ignoré au login)
            firstName: data.firstName,
            lastName: data.lastName,
            phone: cleanPhone,
            roles: [data.role],
            isVerified: false,
          },
        });
      } catch (e) { 
        // CAS CRITIQUE : "Dual Write Failure"
        // Si Prisma échoue, on devrait idéalement supprimer l'user Supabase pour éviter un compte fantôme.
        console.error("Erreur création Prisma:", e);
        // await supabase.auth.admin.deleteUser(sbData.user.id); // Nécessite la clé service_role
        return actionResult.error("Erreur lors de la création du profil. Veuillez contacter le support."); 
      }
    }
    return actionResult.success("Compte créé ! Vérifiez vos emails.");
  },
  { isPublic: true }
);

// --- ACTION 2 : CONNEXION (Publique) ---
// CORRECTION MAJEURE ICI
export const loginUser = createSafeAction(
  LoginSchema,
  async (_, data) => {
    const supabase = await createClient();

    // 1. Authentification via Supabase (Source de vérité)
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error || !authData.user) {
      return actionResult.error("Identifiants incorrects.");
    }

    // 2. Récupération du profil métier dans Prisma
    // On utilise l'ID renvoyé par Supabase pour trouver l'utilisateur Prisma
    const user = await db.user.findUnique({ 
      where: { id: authData.user.id } 
    });

    if (!user) {
      // C'est le cas du "compte fantôme" (existe dans Supabase mais pas dans Prisma)
      return actionResult.error("Erreur de compte : Profil introuvable.");
    }

    // 3. Création de la session (Ton système de cookie custom)
    // On continue d'utiliser ton système de session actuel pour ne pas tout casser
    await createSession(user.id, user.roles[0] || "PROSPECT");
    
    return actionResult.success("Connexion réussie");
  },
  { isPublic: true }
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
    
    return actionResult.success("Si un compte existe, un email a été envoyé.");
  },
  { isPublic: true }
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
    
    if (!userId) return actionResult.error("Non autorisé.");

    const supabase = await createClient();
    
    // 1. Update Supabase Auth (C'est le seul qui compte vraiment)
    const { error } = await supabase.auth.updateUser({ password: data.password });
    
    if (error) {
      return actionResult.error("Erreur Supabase: " + error.message);
    }

    // 2. Update Prisma (Optionnel mais recommandé pour garder la cohérence si tu utilises le champ ailleurs)
    try {
      const hashedPassword = await hash(data.password, 10);
      await db.user.update({
        where: { id: userId }, 
        data: { password: hashedPassword }
      });
    } catch (e) {
      // Si Prisma échoue ici, ce n'est pas grave car le login passe par Supabase
      console.warn("Sync password Prisma échoué", e);
    }

    return actionResult.success("Mot de passe mis à jour avec succès.");
  }
);