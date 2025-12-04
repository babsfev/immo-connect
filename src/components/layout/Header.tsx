"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Bell, Search, Plus, Menu, X, LogOut, User, Settings, CreditCard, 
  CheckCircle2, AlertTriangle, Info 
} from "lucide-react";
import Button from "@/components/ui/Button"; 
import { cn } from "@/lib/utils";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // Pour fermer les menus si on clique ailleurs
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between lg:ml-64">
        
        {/* GAUCHE */}
        <div className="flex items-center gap-4 flex-1">
          <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-md">
            <Menu size={24} />
          </button>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full border border-transparent focus-within:border-blue-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all w-full max-w-sm">
            <Search size={16} className="text-slate-400" />
            <input type="text" placeholder="Rechercher..." className="bg-transparent border-none outline-none text-sm text-slate-600 w-full" />
          </div>
        </div>

        {/* DROITE */}
        <div className="flex items-center gap-3 sm:gap-4 ml-auto relative">
          <Button size="sm" className="hidden sm:flex bg-orange-500 hover:bg-orange-600 border-none text-white rounded-full shadow-md shadow-orange-100">
            <Plus size={16} className="mr-1" /> <span className="hidden md:inline">Nouveau</span>
          </Button>

          {/* 🔔 NOTIFICATIONS DROPDOWN */}
          <div className="relative" ref={notifRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border border-white animate-pulse"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <h4 className="font-semibold text-sm text-slate-900">Notifications</h4>
                  <span className="text-xs text-blue-600 cursor-pointer hover:underline">Tout marquer lu</span>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {[
                    { title: "Loyer reçu", desc: "Moussa Diop a payé 450k", time: "Il y a 2h", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
                    { title: "Alerte Fuite", desc: "Nouveau ticket: Villa Corniche", time: "Il y a 5h", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
                    { title: "Mise à jour", desc: "Nouvelles fonctionnalités IA", time: "Hier", icon: Info, color: "text-blue-600", bg: "bg-blue-50" },
                  ].map((notif, i) => (
                    <div key={i} className="p-3 hover:bg-slate-50 border-b border-slate-50 last:border-0 flex gap-3 cursor-pointer transition-colors">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${notif.bg} ${notif.color}`}>
                        <notif.icon size={14} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{notif.title}</p>
                        <p className="text-xs text-slate-500">{notif.desc}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{notif.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 text-center border-t border-slate-100">
                  <Link href="/notifications" className="text-xs font-medium text-slate-600 hover:text-blue-600">Voir tout</Link>
                </div>
              </div>
            )}
          </div>
          
          {/* 👤 USER DROPDOWN */}
          <div className="relative" ref={profileRef}>
            <div 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="h-9 w-9 rounded-full bg-blue-100 border border-blue-200 cursor-pointer flex items-center justify-center text-blue-700 font-bold text-sm hover:ring-2 hover:ring-blue-200 transition-all"
            >
               JD
            </div>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                  <p className="text-sm font-bold text-slate-900">Jean Dupont</p>
                  <p className="text-xs text-slate-500">jean@immo-connect.sn</p>
                </div>
                <div className="p-2 space-y-1">
                  <Link href="/settings" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                    <User size={16} /> Mon Profil
                  </Link>
                  <Link href="/settings" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                    <CreditCard size={16} /> Abonnement
                  </Link>
                  <Link href="/settings" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                    <Settings size={16} /> Paramètres
                  </Link>
                </div>
                <div className="p-2 border-t border-slate-100">
                  <Link href="/login" className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium">
                    <LogOut size={16} /> Déconnexion
                  </Link>
                </div>
              </div>
            )}
          </div>

        </div>
      </header>
      
      {/* ... (Garder le code du Menu Mobile ici sans changement) ... */}
    </>
  );
}