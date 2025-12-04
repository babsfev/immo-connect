"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Building2, Wallet, Menu, Plus, X, Home, UserPlus, FilePlus 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/Modal";
import { MENU_ITEMS } from "@/lib/menu-config";

export function MobileNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isActionOpen, setIsActionOpen] = useState(false);

  const navItems = [
    { label: "Accueil", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Biens", icon: Building2, href: "/properties" },
    { label: "Finances", icon: Wallet, href: "/payments" },
  ];

  return (
    <>
      {/* BARRE DU BAS (Visible uniquement sur mobile) */}
      <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-slate-200 flex items-center justify-around px-2 lg:hidden safe-area-pb shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        
        {/* 1. Les liens de gauche */}
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-full space-y-1 transition-colors",
                isActive ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <item.icon size={isActive ? 24 : 22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}

        {/* 2. Le Bouton Central d'Action (+) */}
        <div className="relative -top-5">
           <button 
             onClick={() => setIsActionOpen(true)}
             className="w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-200 hover:scale-105 transition-transform border-4 border-slate-50"
           >
              <Plus size={28} />
           </button>
        </div>

        {/* 3. Le Bouton Menu (Plus) */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className={cn(
            "flex flex-col items-center justify-center w-16 h-full space-y-1 transition-colors",
            isMenuOpen ? "text-blue-600" : "text-slate-400"
          )}
        >
          <Menu size={22} />
          <span className="text-[10px] font-medium">Menu</span>
        </button>
      </div>

      {/* --- MODALE D'ACTIONS RAPIDES --- */}
      <Modal isOpen={isActionOpen} onClose={() => setIsActionOpen(false)} title="Action Rapide">
         <div className="grid grid-cols-2 gap-4 pt-2">
            <Link href="/properties/new" onClick={() => setIsActionOpen(false)} className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-xl border border-blue-100 text-blue-700 hover:bg-blue-100 transition-colors">
               <Home size={24} className="mb-2"/>
               <span className="text-sm font-bold">Nouveau Bien</span>
            </Link>
            <Link href="/payments" onClick={() => setIsActionOpen(false)} className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-xl border border-green-100 text-green-700 hover:bg-green-100 transition-colors">
               <Wallet size={24} className="mb-2"/>
               <span className="text-sm font-bold">Encaisser</span>
            </Link>
            <Link href="/maintenance" onClick={() => setIsActionOpen(false)} className="flex flex-col items-center justify-center p-4 bg-orange-50 rounded-xl border border-orange-100 text-orange-700 hover:bg-orange-100 transition-colors">
               <Plus size={24} className="mb-2"/>
               <span className="text-sm font-bold">Signalement</span>
            </Link>
            <Link href="/applications" onClick={() => setIsActionOpen(false)} className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-xl border border-purple-100 text-purple-700 hover:bg-purple-100 transition-colors">
               <UserPlus size={24} className="mb-2"/>
               <span className="text-sm font-bold">Candidature</span>
            </Link>
         </div>
      </Modal>

      {/* --- MENU LATÉRAL COMPLET --- */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm lg:hidden animate-fade" 
          onClick={() => setIsMenuOpen(false)}
        >
           <div 
             className="absolute right-0 top-0 h-full w-3/4 bg-white shadow-2xl p-6 flex flex-col animate-slide-in-right"
             onClick={(e) => e.stopPropagation()}
           >
              <div className="flex justify-between items-center mb-8">
                 <h2 className="text-xl font-bold text-slate-900">Menu</h2>
                 <button 
                   onClick={() => setIsMenuOpen(false)} 
                   className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                 >
                   <X size={20}/>
                 </button>
              </div>
              
              <div className="space-y-6 overflow-y-auto flex-1">
                 {MENU_ITEMS.map((group, idx) => (
                    <div key={idx}>
                       <p className="text-xs font-bold text-slate-400 uppercase mb-3">{group.category}</p>
                       <div className="space-y-3 pl-2">
                          {group.items.map((item) => (
                             <Link 
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-3 text-slate-700 font-medium hover:text-blue-600 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                             >
                                <item.icon size={18} className="text-slate-400" /> 
                                {item.label}
                             </Link>
                          ))}
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      )}
    </>
  );
}