import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext"; // <--- IMPORT
import { getUserMe } from "@/app/actions/user"; // <--- IMPORT

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0F172A",
};

export const metadata: Metadata = {
  title: "Immo-Connect",
  description: "ERP Immobilier Nouvelle Génération",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 1. Récupération des données côté SERVEUR (Rapide & Sécurisé)
  // (Le Middleware a déjà validé le cookie, ici on récupère juste le profil)
  const user = await getUserMe();

  // 2. On prépare l'objet pour le client
  const userProfile = user ? {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.roles[0], // Rôle principal
    phone: user.phone,
    isVerified: user.isVerified
  } : null;

  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* 3. Injection dans le Contexte Client */}
          <AuthProvider user={userProfile}>
             {children}
          </AuthProvider>
          
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}