"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  Sparkles,
  Settings,
  LogOut,
  Wrench,
  Calendar,
  FileText,
  Briefcase,
  Wallet,
  UserPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    category: "Pilotage",
    items: [
      { label: "Tableau de bord", icon: LayoutDashboard, href: "/dashboard" },
      { label: "Agenda", icon: Calendar, href: "/calendar" },
    ],
  },
  {
    category: "Gestion",
    items: [
      { label: "Candidatures", icon: UserPlus, href: "/applications" }, // Nouveau CRM
      { label: "Mes Biens", icon: Building2, href: "/properties" },
      { label: "Locataires", icon: Users, href: "/tenants" },
    ],
  },
  {
    category: "Finances",
    items: [
      { label: "Paiements", icon: CreditCard, href: "/payments" },
      { label: "Dépenses", icon: Wallet, href: "/expenses" }, // Nouveau
    ],
  },
  {
    category: "Opérations",
    items: [
      { label: "Maintenance", icon: Wrench, href: "/maintenance" },
      { label: "Documents", icon: FileText, href: "/documents" }, // Nouveau
      {
        label: "Conseiller IA",
        icon: Sparkles,
        href: "/ai-advisor",
        highlight: true,
      },
    ],
  },
  {
    category: "Admin",
    items: [
      { label: "Propriétaires", icon: Briefcase, href: "/landlords" }, // Pour Agence
      { label: "Paramètres", icon: Settings, href: "/settings" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen bg-white border-r border-slate-200 fixed left-0 top-0 z-40 overflow-y-auto">
      {/* LOGO */}
      <div className="h-16 flex items-center px-6 border-b border-slate-100 shrink-0">
        <div className="relative flex items-center justify-center w-8 h-8 mr-3">
          <div className="absolute inset-0 bg-blue-600 rotate-45 rounded-md"></div>
          <div className="absolute inset-0 border-2 border-orange-500 rotate-45 rounded-md opacity-60 scale-90"></div>
          <span className="relative text-white font-bold text-sm rotate-0">
            I
          </span>
        </div>
        <span className="text-lg font-bold text-slate-900 tracking-tight">
          Immo<span className="text-orange-500">Connect</span>
        </span>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 py-6 px-3 space-y-6">
        {menuItems.map((group, idx) => (
          <div key={idx}>
            <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
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
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 relative group",
                      isActive
                        ? "text-blue-700 bg-blue-50/80 font-semibold"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50",
                      item.highlight &&
                        !isActive &&
                        "text-orange-600 bg-orange-50/50 hover:bg-orange-50"
                    )}
                  >
                    {/* Petite barre latérale active (Indicateur visuel subtil) */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-blue-600 rounded-r-full"></span>
                    )}

                    <Icon
                      size={18}
                      className={cn(
                        isActive
                          ? "text-blue-600"
                          : "text-slate-400 group-hover:text-slate-600",
                        item.highlight && "text-orange-500"
                      )}
                    />
                    <span
                      className={
                        isActive
                          ? "translate-x-1 transition-transform"
                          : "transition-transform"
                      }
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-slate-100 mt-auto">
        <button
          onClick={() => router.push("/login")}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-medium"
        >
          <LogOut size={18} /> Déconnexion
        </button>
      </div>
    </aside>
  );
}
