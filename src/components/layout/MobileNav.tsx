"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Wallet,
  Menu,
  Plus,
  X,
  Home,
  UserPlus,
  FilePlus,
  Wrench,
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
      {/* BARRE DU BAS (Mobile Only) */}
      <div className="fixed bottom-0 left-0 z-40 w-full h-16 bg-white/90 backdrop-blur-lg border-t border-slate-200 flex items-center justify-between px-6 lg:hidden safe-area-pb shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
        {/* Gauche : Accueil & Biens */}
        <Link
          href="/dashboard"
          className={cn(
            "flex flex-col items-center gap-1 transition-colors",
            pathname === "/dashboard" ? "text-blue-600" : "text-slate-400"
          )}
        >
          <LayoutDashboard
            size={20}
            strokeWidth={pathname === "/dashboard" ? 2.5 : 2}
          />
          <span className="text-[9px] font-bold">Accueil</span>
        </Link>

        <Link
          href="/properties"
          className={cn(
            "flex flex-col items-center gap-1 transition-colors",
            pathname.startsWith("/properties")
              ? "text-blue-600"
              : "text-slate-400"
          )}
        >
          <Building2
            size={20}
            strokeWidth={pathname.startsWith("/properties") ? 2.5 : 2}
          />
          <span className="text-[9px] font-bold">Biens</span>
        </Link>

        {/* CENTRE : ACTION (+) Flottant */}
        <div className="relative -top-5">
          <button
            onClick={() => setIsActionOpen(true)}
            className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-xl shadow-slate-900/40 hover:scale-105 active:scale-95 transition-transform border-4 border-slate-50 ring-2 ring-slate-100"
          >
            <Plus size={28} />
          </button>
        </div>

        {/* Droite : Finances & Menu */}
        <Link
          href="/payments"
          className={cn(
            "flex flex-col items-center gap-1 transition-colors",
            pathname.startsWith("/payments")
              ? "text-blue-600"
              : "text-slate-400"
          )}
        >
          <Wallet
            size={20}
            strokeWidth={pathname.startsWith("/payments") ? 2.5 : 2}
          />
          <span className="text-[9px] font-bold">Finances</span>
        </Link>

        <button
          onClick={() => setIsMenuOpen(true)}
          className={cn(
            "flex flex-col items-center gap-1 transition-colors text-slate-400"
          )}
        >
          <Menu size={20} />
          <span className="text-[9px] font-bold">Menu</span>
        </button>
      </div>

      {/* --- MODALE D'ACTIONS RAPIDES --- */}
      <Modal
        isOpen={isActionOpen}
        onClose={() => setIsActionOpen(false)}
        title="Que voulez-vous faire ?"
      >
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Link
            href="/properties/new"
            onClick={() => setIsActionOpen(false)}
            className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-2xl border border-blue-100 text-blue-700 active:scale-95 transition-transform"
          >
            <div className="bg-white p-2 rounded-full mb-2 shadow-sm">
              <Home size={20} />
            </div>
            <span className="text-xs font-bold">Nouveau Bien</span>
          </Link>
          <Link
            href="/payments"
            onClick={() => setIsActionOpen(false)}
            className="flex flex-col items-center justify-center p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-700 active:scale-95 transition-transform"
          >
            <div className="bg-white p-2 rounded-full mb-2 shadow-sm">
              <Wallet size={20} />
            </div>
            <span className="text-xs font-bold">Encaisser</span>
          </Link>
          <Link
            href="/maintenance"
            onClick={() => setIsActionOpen(false)}
            className="flex flex-col items-center justify-center p-4 bg-orange-50 rounded-2xl border border-orange-100 text-orange-700 active:scale-95 transition-transform"
          >
            <div className="bg-white p-2 rounded-full mb-2 shadow-sm">
              <Wrench size={20} />
            </div>
            <span className="text-xs font-bold">Signalement</span>
          </Link>
          <Link
            href="/tenants"
            onClick={() => setIsActionOpen(false)}
            className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-2xl border border-purple-100 text-purple-700 active:scale-95 transition-transform"
          >
            <div className="bg-white p-2 rounded-full mb-2 shadow-sm">
              <UserPlus size={20} />
            </div>
            <span className="text-xs font-bold">Nouveau Locataire</span>
          </Link>
        </div>
      </Modal>

      {/* --- MENU LATÉRAL COMPLET (Slide-in) --- */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-4/5 max-w-xs bg-white shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">
                Menu Principal
              </h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="space-y-8 overflow-y-auto flex-1 custom-scrollbar">
              {MENU_ITEMS.map((group, idx) => (
                <div key={idx}>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 pl-2">
                    {group.category}
                  </p>
                  <div className="space-y-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors"
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
