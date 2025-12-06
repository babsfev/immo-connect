"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, User, Settings, ChevronRight } from "lucide-react"; // Icônes ajoutées
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { Modal } from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { MENU_ITEMS } from "@/lib/menu-config";
import { logoutUser } from "@/app/actions/auth";
import { toast } from "sonner";

// 👇 1. DÉFINITION DES PROPS (CRUCIAL)
type SidebarProps = {
  user: {
    firstName: string | null;
    lastName: string | null;
    email: string;
    role: string;
    avatar?: string | null;
  } | null;
};

// 👇 2. AJOUT DE { user } DANS LES PARAMÈTRES
export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logoutUser();
    toast.success("Déconnexion réussie");
    router.push("/login");
    router.refresh();
  };

  // Calcul des initiales
  const initials = user?.firstName && user?.lastName 
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : "U";

  return (
    <>
      <aside className="hidden lg:flex flex-col w-72 h-screen bg-slate-900 border-r border-slate-800 fixed left-0 top-0 z-40 text-slate-300">
        
        {/* HEADER */}
        <div className="h-24 flex items-center px-6 border-b border-slate-800 shrink-0 bg-slate-900">
          <Link href="/dashboard" className="block w-full">
             <Logo className="h-8 w-auto" variant="white" /> 
          </Link>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 py-8 px-4 space-y-8 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {MENU_ITEMS.map((group, idx) => (
            <div key={idx}>
              <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                {group.category}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  
                  // Cast 'any' pour éviter l'erreur de type sur highlight si le fichier config n'est pas parfait
                  const isHighlight = (item as any).highlight;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative group",
                        isActive 
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                          : "text-slate-400 hover:text-white hover:bg-white/5",
                        isHighlight && !isActive && "text-orange-400 hover:text-orange-300 hover:bg-orange-500/10"
                      )}
                    >
                      <Icon 
                        size={20} 
                        className={cn(
                          isActive ? "text-white" : "text-slate-500 group-hover:text-white",
                          isHighlight && !isActive && "text-orange-500 group-hover:text-orange-400"
                        )} 
                      />
                      <span>{item.label}</span>
                      {isActive && <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white shadow-glow"></span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* FOOTER PROFIL */}
        <div className="p-4 border-t border-slate-800 mt-auto bg-slate-900">
          <div className="flex items-center gap-3 mb-4 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-md border-2 border-slate-800">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate group-hover:text-blue-400 transition-colors">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-[10px] text-slate-500 truncate font-medium uppercase tracking-wider">
                {user?.role === "AGENCY" ? "Gestionnaire" : "Propriétaire"}
              </p>
            </div>
            <Link href="/settings">
               <Settings size={16} className="text-slate-500 hover:text-white transition-colors" />
            </Link>
          </div>

          <button 
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-slate-800/50 hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all text-xs font-semibold border border-slate-700 hover:border-red-500/20"
          >
             <LogOut size={14} /> 
             Se déconnecter
          </button>
        </div>
      </aside>

      {/* MODALE */}
      <Modal isOpen={showLogoutConfirm} onClose={() => setShowLogoutConfirm(false)} title="Se déconnecter ?">
         <p className="text-sm text-slate-500 mb-6">
           Êtes-vous sûr de vouloir quitter votre session ?
         </p>
         <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowLogoutConfirm(false)} disabled={isLoggingOut}>
              Annuler
            </Button>
            <Button variant="danger" onClick={handleLogout} disabled={isLoggingOut}>
              {isLoggingOut ? "Fermeture..." : "Oui, me déconnecter"}
            </Button>
         </div>
      </Modal>
    </>
  );
}