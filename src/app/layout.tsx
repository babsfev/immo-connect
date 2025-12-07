import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/AuthContext";
// 👇 CORRECTION ICI
import { getUserMe } from "@/app/data/user"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Immo Connect",
  description: "Gestion immobilière simplifiée",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // On récupère l'utilisateur au niveau racine pour l'injecter dans toute l'app
  const user = await getUserMe();

  // On prépare l'objet pour le contexte (similaire au DashboardLayout)
  const contextUser = user ? {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.roles[0] || "PROSPECT",
    phone: user.phone,
    isVerified: user.isVerified
  } : null;

  return (
    <html lang="fr">
      <body className={inter.className}>
        <AuthProvider user={contextUser}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster position="top-center" richColors />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}