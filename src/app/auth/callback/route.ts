import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import { db } from '@/lib/prisma'
import { createSession } from '@/lib/session' // Notre gestionnaire de cookie

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    const { error, data } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && data.user) {
      
      // 1. On vérifie si l'user existe dans NOTRE base Prisma
      const existingUser = await db.user.findUnique({
        where: { id: data.user.id } // On utilise l'ID Supabase
      });

      // 2. Si c'est une première connexion Google, on le crée !
      if (!existingUser) {
        await db.user.create({
          data: {
            id: data.user.id,
            email: data.user.email!,
            password: "GOOGLE_AUTH", // Pas de mot de passe
            firstName: data.user.user_metadata.full_name?.split(' ')[0] || "Utilisateur",
            lastName: data.user.user_metadata.full_name?.split(' ')[1] || "",
            avatar: data.user.user_metadata.avatar_url,
            roles: ["OWNER"], // Rôle par défaut (modifiable)
            isVerified: true,
          }
        });
      } else {
        // Si c'est une confirmation email, on valide
        await db.user.update({
           where: { id: data.user.id },
           data: { isVerified: true }
        });
      }

      // 3. CRUCIAL : On crée notre Cookie de Session personnalisé
      const role = existingUser?.roles[0] || "OWNER";
      await createSession(data.user.id, role);

      // AVANT : return NextResponse.redirect(`${origin}/dashboard`)
      // APRÈS : Redirection vers la page de confirmation
      return NextResponse.redirect(`${origin}/auth/verified`)
    }
  }

 return NextResponse.redirect(`${origin}/auth/expired`)
}