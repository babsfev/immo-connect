import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { getUserMe } from "@/app/data/user";
import { PhoneModal } from "@/components/auth/PhoneModal";
import { AuthProvider } from "@/contexts/AuthContext";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserMe();
  const showPhoneModal = user ? !user.phone : false;

  // Préparation pour la Sidebar (UI)
  const sidebarUser = user
    ? {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.roles && user.roles.length > 0 ? user.roles[0] : "PROSPECT",
        avatar: user.avatar,
      }
    : null;

  // Préparation pour le Context (Auth)
  const contextUser = user
    ? {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.roles[0] || "PROSPECT",
        phone: user.phone,
        isVerified: user.isVerified,
      }
    : null;

  return (
    <AuthProvider user={contextUser}>
      <div className="flex min-h-screen w-full bg-[#F8FAFC]">
        <Sidebar user={sidebarUser} />

        <div className="flex flex-1 flex-col lg:ml-72 w-full min-w-0">
          <div className="hidden lg:block sticky top-0 z-40">
            <Header />
          </div>

          <main className="flex-1">{children}</main>
        </div>

        <MobileNav />
        <PhoneModal isOpen={showPhoneModal} />
      </div>
    </AuthProvider>
  );
}
