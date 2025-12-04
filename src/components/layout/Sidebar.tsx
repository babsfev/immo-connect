"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { Modal } from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { MENU_ITEMS } from "@/lib/menu-config";
import { logoutUser } from "@/app/actions/auth";
import { toast } from "sonner";

export default function Sidebar() {
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

  return (
    <>
      {/* CONTENEUR PRINCIPAL : Fixe (h-screen), pas de scroll global */}
      <aside className="hidden lg:flex flex-col w-72 h-screen bg-slate-900 border-r border-slate-800 fixed left-0 top-0 z-40 text-slate-300">
        
        {/* 1. HEADER (Fixe en haut) */}
        <div className="h-24 flex items-center px-6 border-b border-slate-800 shrink-0 bg-slate-900">
          {/* Ce Link est valide car Logo (ci-dessous) est un DIV */}
          <Link href="/dashboard" className="block h-10 w-full">
             <Logo className="h-full w-auto" variant="white" /> 
          </Link>
        </div>

        {/* 2. NAVIGATION (Zone qui scrolle toute seule) */}
        {/* flex-1 prend tout l'espace restant. overflow-y-auto active le scroll ici. */}
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
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative group",
                        isActive 
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                          : "text-slate-400 hover:text-white hover:bg-white/5",
                        item.highlight && !isActive && "text-orange-400 hover:text-orange-300 hover:bg-orange-500/10"
                      )}
                    >
                      <Icon 
                        size={20} 
                        className={cn(
                          isActive ? "text-white" : "text-slate-500 group-hover:text-white",
                          item.highlight && !isActive && "text-orange-500 group-hover:text-orange-400"
                        )} 
                      />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* 3. FOOTER (Fixe en bas) */}
        <div className="p-4 border-t border-slate-800 shrink-0 bg-slate-900">
          <button 
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors text-sm font-medium group"
          >
             <LogOut size={20} className="group-hover:text-red-400 transition-colors" /> 
             Déconnexion
          </button>
        </div>
      </aside>

      {/* MODALE DE DÉCONNEXION */}
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