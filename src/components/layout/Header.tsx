"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { 
  Bell, Search, Plus, Menu, LogOut, User, Settings, CreditCard, 
  FilePlus, Home, UserPlus, Loader2, ChevronDown
} from "lucide-react";
import Button from "@/components/ui/Button"; 
import { GlobalSearch } from "./GlobalSearch";
import { Logo } from "@/components/ui/Logo";
import { toast } from "sonner"; 
import { logoutUser } from "@/app/actions/auth"; 
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname(); // Pour savoir où on est
  const { user } = useAuth();

  // Initiales & Nom
  const initials = user 
    ? `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}`.toUpperCase()
    : "";
  const fullName = user ? `${user.firstName} ${user.lastName}` : "Utilisateur";
  const email = user?.email || "";

  // États UI
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<"notifications" | "profile" | "new" | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);

  // Fermeture au clic dehors
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    try {
      setIsLoggingOut(true);
      setActiveMenu(null);
      await logoutUser();
      toast.success("À bientôt !");
      router.push("/login");
      router.refresh();
    } catch {
      toast.error("Erreur lors de la déconnexion.");
      setIsLoggingOut(false);
    }
  };

  // Titre de page dynamique (Optionnel, pour mobile)
  const getPageTitle = () => {
    if (pathname.includes("/dashboard")) return "Tableau de bord";
    if (pathname.includes("/properties")) return "Mes Biens";
    if (pathname.includes("/tenants")) return "Locataires";
    return "ImmoConnect";
  };

  return (
    <>
      <header 
        ref={headerRef} 
        className="h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between transition-all duration-300"
      >
        
        {/* GAUCHE : Mobile Menu & Logo & Recherche */}
        <div className="flex items-center gap-4 flex-1">
          {/* Mobile Only : Menu Burger & Titre */}
          <div className="lg:hidden flex items-center gap-3">
             <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
               <Menu size={24} />
             </button>
             <span className="font-bold text-slate-900 text-lg">{getPageTitle()}</span>
          </div>

          {/* Desktop : Recherche Globale */}
          <div 
            onClick={() => setIsSearchOpen(true)} 
            className="hidden sm:flex items-center gap-3 px-4 py-2 bg-slate-100/50 rounded-xl border border-transparent hover:border-slate-300 hover:bg-white cursor-pointer transition-all w-full max-w-sm group shadow-sm hover:shadow-md"
          >
            <Search size={18} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
            <span className="text-sm text-slate-500 group-hover:text-slate-800 font-medium">Rechercher... (Ctrl+K)</span>
            <div className="ml-auto hidden lg:block">
               <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-500 font-bold">⌘K</span>
            </div>
          </div>
        </div>

        {/* DROITE : Actions & Profil */}
        <div className="flex items-center gap-2 sm:gap-4 ml-auto">
          
          {/* Bouton "Nouveau" (Dropdown) */}
          <div className="relative hidden sm:block">
            <Button 
              size="sm" 
              onClick={() => setActiveMenu(activeMenu === "new" ? null : "new")} 
              className={`bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20 rounded-xl transition-transform active:scale-95 ${activeMenu === "new" ? "ring-2 ring-offset-2 ring-slate-900" : ""}`}
            >
              <Plus size={18} className="mr-1.5" /> 
              <span>Créer</span>
              <ChevronDown size={14} className={`ml-1 transition-transform ${activeMenu === "new" ? "rotate-180" : ""}`}/>
            </Button>

            {/* Dropdown Menu */}
            {activeMenu === "new" && (
               <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50 p-1.5 origin-top-right">
                  <div className="space-y-0.5">
                     <Link href="/properties/new" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-colors group">
                        <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-200"><Home size={16}/></div>
                        Nouveau Bien
                     </Link>
                     <Link href="/tenants" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-700 rounded-xl transition-colors group">
                        <div className="p-1.5 bg-orange-100 text-orange-600 rounded-lg group-hover:bg-orange-200"><UserPlus size={16}/></div>
                        Nouveau Locataire
                     </Link>
                     <Link href="/documents" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-green-50 hover:text-green-700 rounded-xl transition-colors group">
                        <div className="p-1.5 bg-green-100 text-green-600 rounded-lg group-hover:bg-green-200"><FilePlus size={16}/></div>
                        Nouveau Document
                     </Link>
                  </div>
               </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setActiveMenu(activeMenu === "notifications" ? null : "notifications")} 
              className={`relative p-2.5 rounded-full transition-all ${activeMenu === "notifications" ? "bg-blue-50 text-blue-600" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"}`}
            >
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white animate-pulse shadow-sm"></span>
            </button>
            {activeMenu === "notifications" && (
               <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50 origin-top-right">
                 <div className="p-4 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                    <h4 className="font-bold text-sm text-slate-900">Notifications</h4>
                    <span className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded-full text-slate-500 font-medium">0 nouvelles</span>
                 </div>
                 <div className="p-8 text-center text-sm text-slate-400 flex flex-col items-center gap-2">
                    <Bell size={32} className="opacity-20 mb-2"/>
                    Tout est calme pour le moment.
                 </div>
               </div>
            )}
          </div>
          
          {/* PROFIL AVATAR */}
          <div className="relative pl-2 border-l border-slate-200 ml-2">
            <div 
              onClick={() => setActiveMenu(activeMenu === "profile" ? null : "profile")} 
              className={`flex items-center gap-2 cursor-pointer p-1 pr-3 rounded-full border transition-all duration-200 ${activeMenu === "profile" ? "bg-slate-50 border-blue-200 ring-2 ring-blue-100" : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"}`}
            >
              <div className="h-8 w-8 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                {initials || <User size={14}/>}
              </div>
              <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
            </div>
            
            {activeMenu === "profile" && (
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50 origin-top-right">
                <div className="p-5 border-b border-slate-50 bg-slate-50/50">
                    <p className="text-sm font-bold text-slate-900 truncate">{fullName}</p>
                    <p className="text-xs text-slate-500 truncate font-medium">{email}</p>
                </div>
                <div className="p-2 space-y-0.5">
                  <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors">
                    <User size={16} /> Mon Profil
                  </Link>
                  <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors">
                    <CreditCard size={16} /> Abonnement
                  </Link>
                  <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors">
                    <Settings size={16} /> Paramètres
                  </Link>
                </div>
                <div className="p-2 border-t border-slate-100">
                  <button 
                    onClick={handleLogout} 
                    disabled={isLoggingOut} 
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors font-semibold text-left disabled:opacity-50"
                  >
                      {isLoggingOut ? <Loader2 size={16} className="animate-spin"/> : <LogOut size={16} />} 
                      {isLoggingOut ? "Déconnexion..." : "Se déconnecter"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Le composant de recherche globale reste le même */}
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}