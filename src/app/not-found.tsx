"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Pour le bouton retour
import {
  MapPinOff,
  Search,
  Home,
  FileText,
  HelpCircle,
  LayoutDashboard,
  ArrowLeft
} from "lucide-react";
import Button from "@/components/ui/Button";
// 👇 CORRECTION CRITIQUE : Import nommé avec { }
import { Input } from "@/components/ui/form/Input"; 
import { Card } from "@/components/ui/Card";
import { Logo } from "@/components/ui/Logo";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] p-4 font-sans text-slate-900 relative overflow-hidden">
      
      {/* 1. FOND DYNAMIQUE (Subtil) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-100/50 rounded-full blur-[120px] opacity-60"></div>
      </div>

      {/* 2. BOUTON RETOUR RAPIDE */}
      <button 
        onClick={() => router.back()}
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium z-10"
      >
        <div className="p-2 bg-white rounded-full shadow-sm border border-slate-200">
           <ArrowLeft size={16} />
        </div>
        Retour
      </button>

      {/* Logo centré */}
      <div className="mb-8 relative z-10">
        <Logo className="h-10 w-auto" />
      </div>

      <div className="max-w-md w-full text-center space-y-8 relative z-10 animate-in fade-in zoom-in-95 duration-500">
        
        {/* 3. VISUEL 404 ANIMÉ */}
        <div className="relative inline-block">
          {/* Cercles décoratifs */}
          <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <div className="absolute -inset-4 border border-dashed border-slate-200 rounded-full animate-[spin_10s_linear_infinite]"></div>
          
          <div className="relative bg-white p-8 rounded-full shadow-2xl shadow-slate-200/50 border border-slate-100">
            <MapPinOff size={56} className="text-orange-500 animate-[bounce_3s_infinite]" />
          </div>
          
          {/* Badge 404 */}
          <div className="absolute -bottom-2 -right-2 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white">
            404
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Destination inconnue
          </h1>
          <p className="text-slate-500 text-base leading-relaxed">
            Il semble que ce bien a été retiré du marché...<br/>ou que vous ayez pris un mauvais tournant.
          </p>
        </div>

        {/* 4. BARRE DE RECHERCHE INTELLIGENTE */}
        <div className="relative group mx-auto max-w-sm">
          <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-orange-500 rounded-2xl blur opacity-10 group-hover:opacity-30 transition-opacity duration-500"></div>
          <div className="relative bg-white rounded-2xl p-1.5 flex items-center shadow-lg shadow-slate-200/50 border border-slate-100">
            <div className="flex-1">
              <Input
                placeholder="Essayer de rechercher un bien..."
                className="border-none shadow-none focus:ring-0 bg-transparent h-10 text-base"
                icon={<Search size={18} />}
              />
            </div>
          </div>
        </div>

        {/* 5. RACCOURCIS RAPIDES */}
        <div className="grid grid-cols-2 gap-4 text-left pt-2">
          <Link href="/dashboard" className="block">
            <Card className="p-4 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group h-full">
              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <LayoutDashboard size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900">Dashboard</p>
                  <p className="text-[11px] text-slate-400">Vue d'ensemble</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/market" className="block">
            <Card className="p-4 hover:border-orange-300 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group h-full">
              <div className="flex flex-col gap-3">
                <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                  <Home size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900">Marketplace</p>
                  <p className="text-[11px] text-slate-400">Voir les annonces</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Footer Links */}
        <div className="flex items-center justify-center gap-8 text-xs font-medium text-slate-400 pt-6">
          <Link href="/help" className="hover:text-blue-600 flex items-center gap-1.5 transition-colors">
            <HelpCircle size={14} /> Centre d'aide
          </Link>
          <div className="w-1 h-1 rounded-full bg-slate-300"></div>
          <Link href="/contact" className="hover:text-orange-500 flex items-center gap-1.5 transition-colors">
            <FileText size={14} /> Signaler un problème
          </Link>
        </div>
      </div>
    </div>
  );
}