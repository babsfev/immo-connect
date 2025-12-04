"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Bell, Search, Plus, Menu, LogOut, User, Settings, CreditCard, 
  FilePlus, Home, UserPlus, Loader2
} from "lucide-react";
import Button from "@/components/ui/Button"; 
import { GlobalSearch } from "./GlobalSearch";
import { Logo } from "@/components/ui/Logo";
import { toast } from "sonner"; 
import { logoutUser } from "@/app/actions/auth"; 
import { useAuth } from "@/contexts/AuthContext"; // <--- IMPORT DU HOOK

export default function Header() {
  const router = useRouter();
  const { user } = useAuth(); // <--- RÉCUPÉRATION USER

  // Calcul des valeurs d'affichage
  const initials = user 
    ? `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}`.toUpperCase()
    : "IM"; // Par défaut si pas chargé

  const fullName = user 
    ? `${user.firstName} ${user.lastName}` 
    : "Utilisateur";

  const email = user?.email || "";

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<"notifications" | "profile" | "new" | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    try {
      setIsLoggingOut(true);
      setActiveMenu(null);
      await new Promise(r => setTimeout(r, 500));
      await logoutUser();
      toast.success("Déconnexion réussie");
      router.replace("/login");
      router.refresh();
    } catch (error) {
      toast.error("Erreur lors de la déconnexion.");
      setIsLoggingOut(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header 
        ref={headerRef} 
        className="h-16 bg-white backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
      >
        
        {/* GAUCHE (Logo & Recherche) */}
        <div className="flex items-center gap-4 flex-1">
          <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-md">
            <Menu size={24} />
          </button>
          <div className="lg:hidden">
             <Link href="/dashboard"><Logo className="h-8" showText={false} /></Link>
          </div>
          <div onClick={() => setIsSearchOpen(true)} className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full border border-transparent hover:border-blue-300 hover:bg-white cursor-pointer transition-all w-full max-w-sm group">
            <Search size={16} className="text-slate-400 group-hover:text-blue-500" />
            <span className="text-sm text-slate-500 group-hover:text-slate-800">Rechercher... (Ctrl+K)</span>
          </div>
        </div>

        {/* DROITE (Actions & Profil) */}
        <div className="hidden lg:flex items-center gap-2 sm:gap-4 ml-auto relative">
          
          {/* Bouton Nouveau */}
          <div className="relative">
            <Button size="sm" onClick={() => setActiveMenu(activeMenu === "new" ? null : "new")} className="hidden sm:flex bg-orange-500 hover:bg-orange-600 border-none text-white rounded-full shadow-md">
              <Plus size={16} className="mr-1" /> <span className="hidden md:inline">Nouveau</span>
            </Button>
            {activeMenu === "new" && (
               <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden animate-fade z-50">
                  <div className="p-1">
                     <Link href="/properties/new" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"><Home size={16} className="text-blue-500"/> Bien Immobilier</Link>
                     <Link href="/tenants" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-700 rounded-lg transition-colors"><UserPlus size={16} className="text-orange-500"/> Locataire</Link>
                     <Link href="/documents" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors"><FilePlus size={16} className="text-green-500"/> Document</Link>
                  </div>
               </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button onClick={() => setActiveMenu(activeMenu === "notifications" ? null : "notifications")} className={`relative p-2 rounded-full transition-colors ${activeMenu === "notifications" ? "bg-blue-50 text-blue-600" : "text-slate-500 hover:bg-slate-100"}`}>
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white animate-pulse"></span>
            </button>
            {activeMenu === "notifications" && (
               <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden animate-fade z-50">
                 <div className="p-3 border-b border-slate-100 bg-slate-50"><h4 className="font-semibold text-sm text-slate-900">Notifications</h4></div>
                 <div className="p-4 text-center text-sm text-slate-500">Aucune nouvelle notification</div>
               </div>
            )}
          </div>
          
          {/* PROFIL DYNAMIQUE */}
          <div className="relative">
            <div onClick={() => setActiveMenu(activeMenu === "profile" ? null : "profile")} className="h-9 w-9 rounded-full bg-blue-100 border border-blue-200 cursor-pointer flex items-center justify-center text-blue-700 font-bold text-sm hover:ring-2 hover:ring-blue-200 transition-all">
              {initials}
            </div>
            
            {activeMenu === "profile" && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden animate-fade z-50">
                <div className="p-4 border-b border-slate-100 bg-slate-50">
                    <p className="text-sm font-bold text-slate-900 truncate">{fullName}</p>
                    <p className="text-xs text-slate-500 truncate">{email}</p>
                </div>
                <div className="p-2 space-y-1">
                  <Link href="/settings" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"><User size={16} /> Mon Profil</Link>
                  <Link href="/settings" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"><CreditCard size={16} /> Abonnement</Link>
                  <Link href="/settings" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"><Settings size={16} /> Paramètres</Link>
                </div>
                <div className="p-2 border-t border-slate-100">
                  <button onClick={handleLogout} disabled={isLoggingOut} aria-busy={isLoggingOut} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium text-left disabled:opacity-50">
                      {isLoggingOut ? <Loader2 size={16} className="animate-spin"/> : <LogOut size={16} />} 
                      {isLoggingOut ? "Déconnexion..." : "Déconnexion"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}