import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { getUserMe } from "@/app/data/user"; 
import { PhoneModal } from "@/components/auth/PhoneModal";
import { AuthProvider } from "@/contexts/AuthContext"; // Import du Context

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserMe();
  const showPhoneModal = user ? !user.phone : false;

  // Préparation de l'objet user pour la Sidebar
  const sidebarUser = user ? {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.roles && user.roles.length > 0 ? user.roles[0] : "PROSPECT",
    avatar: user.avatar
  } : null;

  // Préparation de l'objet user complet pour le Context (Header)
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
    // On enveloppe tout dans AuthProvider pour que le Header puisse utiliser useAuth()
    <AuthProvider user={contextUser}>
      <div className="flex min-h-screen w-full bg-[#F8FAFC]">
        
        {/* Sidebar Desktop */}
        <Sidebar user={sidebarUser} />

        <div className="flex flex-1 flex-col lg:ml-72 w-full min-w-0">
          <div className="hidden lg:block sticky top-0 z-40">
             <Header />
          </div>
          
          {/* Header Mobile et Contenu */}
          <main className="flex-1">
            {children}
          </main>
        </div>

        {/* Navigation Mobile (Barre du bas) */}
        <MobileNav />

        {/* Modales Globales */}
        <PhoneModal isOpen={showPhoneModal} />
        
      </div>
    </AuthProvider>
  );
}