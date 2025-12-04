import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { getUserMe } from "@/app/actions/user"; // <-- Import
import { PhoneModal } from "@/components/auth/PhoneModal"; // <-- Import

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Vérification Serveur à chaque chargement de page
  const user = await getUserMe();
  const showPhoneModal = user ? !user.phone : false; // Si user existe MAIS pas de téléphone

  return (
    <div className="flex min-h-screen w-full bg-[#F8FAFC]">
      <Sidebar />

      <div className="flex flex-1 flex-col lg:ml-72 w-full min-w-0">
        <div className="hidden lg:block sticky top-0 z-40">
           <Header />
        </div>
        {/* ... Header Mobile ... */}
        
        <main className="...">
          {children}
        </main>
      </div>

      <MobileNav />

      {/* LE FILET DE SÉCURITÉ */}
      <PhoneModal isOpen={showPhoneModal} />
      
    </div>
  );
}