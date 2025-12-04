"use client"; // Indispensable pour le menu mobile

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, Check, Shield, Zap, Globe, 
  Smartphone, LayoutDashboard, Menu, X 
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { CURRENT_YEAR } from "@/lib/utils";

export default function LandingPage() {
  // État pour gérer l'ouverture du menu mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-x-hidden">
      
      {/* --- NAVBAR RESPONSIVE --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 transition-all">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* 1. LOGO (Toujours visible) */}
          <div className="shrink-0">
            <Logo className="h-10" />
          </div>
          
          {/* 2. LIENS BUREAU (Cachés sur mobile) */}
          {/* hidden md:flex = Invisible sur mobile, Visible sur écran moyen+ */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 absolute left-1/2 -translate-x-1/2">
            <Link href="#features" className="hover:text-blue-600 transition-colors">Fonctionnalités</Link>
            <Link href="/market" className="hover:text-blue-600 transition-colors">Marketplace</Link>
            <Link href="#pricing" className="hover:text-blue-600 transition-colors">Tarifs</Link>
          </div>

          {/* 3. ACTIONS BUREAU (Cachées sur mobile) */}
          <div className="hidden md:flex gap-4 items-center">
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-blue-600 px-2">
              Se connecter
            </Link>
            <Link href="/register">
              <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-full px-6 shadow-lg shadow-slate-200">
                Essayer Gratuitement
              </Button>
            </Link>
          </div>

          {/* 4. BOUTON MENU MOBILE (Visible uniquement sur mobile) */}
          <div className="md:hidden">
             <button 
               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
               className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
             >
               {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
          </div>
        </div>

        {/* --- MENU DÉROULANT MOBILE --- */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 shadow-xl animate-in slide-in-from-top-5 duration-200">
             <div className="flex flex-col p-6 space-y-4">
                <Link href="#features" className="text-lg font-medium text-slate-700 py-2 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>
                   Fonctionnalités
                </Link>
                <Link href="/market" className="text-lg font-medium text-slate-700 py-2 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>
                   Marketplace
                </Link>
                <Link href="#pricing" className="text-lg font-medium text-slate-700 py-2 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>
                   Tarifs
                </Link>
                
                <div className="pt-4 flex flex-col gap-3">
                   <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-center h-12 text-base">Se connecter</Button>
                   </Link>
                   <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full justify-center bg-orange-500 hover:bg-orange-600 text-white h-12 text-base">
                         Essayer Gratuitement
                      </Button>
                   </Link>
                </div>
             </div>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-44 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-50 via-white to-transparent -z-10"></div>
        
        <div className="container mx-auto px-6 text-center max-w-5xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            V2.0 Disponible
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
            L'immobilier,<br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-blue-400">
              en pilotage automatique.
            </span>
          </h1>
          
          <p className="text-xl text-slate-500 mb-12 leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Centralisez vos biens, vos locataires et vos finances. 
            Une plateforme unique pour les propriétaires qui veulent gagner du temps.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-lg rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-xl shadow-orange-200 hover:-translate-y-1 transition-all">
                Commencer maintenant <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link href="/market" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-10 text-lg rounded-full bg-white hover:bg-slate-50 border-slate-200 text-slate-700">
                Voir le Market
              </Button>
            </Link>
          </div>

          {/* Mockup Dashboard */}
          <div className="mt-20 relative mx-auto p-3 bg-white/40 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl shadow-slate-200/50 animate-in fade-in zoom-in-95 duration-1000 delay-500">
             <div className="aspect-video rounded-2xl bg-slate-100 overflow-hidden relative border border-slate-200 flex items-center justify-center group">
                <div className="absolute inset-0 bg-linear-to-br from-slate-50 to-blue-50/30"></div>
                <div className="text-center relative z-10 transform group-hover:scale-105 transition-transform duration-500">
                   <LayoutDashboard size={80} className="text-blue-200 mx-auto mb-4"/>
                   <p className="text-slate-400 font-medium text-lg">Interface Dashboard Interactive</p>
                   <p className="text-slate-300 text-sm">Données financières en temps réel</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- BENTO GRID --- */}
      <section id="features" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Tout ce dont vous avez besoin</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Une suite d'outils complète conçue pour optimiser chaque aspect de votre gestion.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[340px]">
             <div className="md:col-span-2 rounded-3xl bg-slate-50 border border-slate-100 p-10 relative overflow-hidden group hover:border-blue-200 transition-all">
                <div className="relative z-10">
                   <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-200"><Globe size={28} /></div>
                   <h3 className="text-2xl font-bold text-slate-900 mb-3">Marketplace Intégrée</h3>
                   <p className="text-slate-500 max-w-md text-lg leading-relaxed">Publiez vos biens vacants directement sur notre réseau public. Recevez des dossiers qualifiés sans effort marketing.</p>
                </div>
                <div className="absolute right-0 bottom-0 w-72 h-72 bg-linear-to-tl from-blue-100 to-transparent rounded-tl-full opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
             </div>

             <div className="md:col-span-1 rounded-3xl bg-slate-900 text-white p-10 flex flex-col justify-between relative overflow-hidden shadow-xl">
                <div>
                   <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-6 backdrop-blur-md border border-white/10"><Smartphone size={28} /></div>
                   <h3 className="text-xl font-bold">100% Mobile</h3>
                   <p className="text-slate-400 mt-3 text-base">Gérez tout depuis votre poche, où que vous soyez.</p>
                </div>
                <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-orange-500 rounded-full blur-[80px] opacity-40 animate-pulse-slow"></div>
             </div>

             <div className="md:col-span-1 rounded-3xl bg-orange-50 border border-orange-100 p-10 group hover:bg-orange-100/50 transition-colors">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-orange-600 mb-6 shadow-sm"><Zap size={28} /></div>
                <h3 className="text-xl font-bold text-slate-900">Finances Auto</h3>
                <p className="text-slate-600 mt-3 text-base">Quittances, relances et rapports fiscaux automatisés par l'IA.</p>
             </div>

             <div className="md:col-span-2 rounded-3xl bg-white border border-slate-200 p-10 flex flex-col justify-center hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold text-slate-900 mb-8">Un écosystème complet.</h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                   {["Gestion des travaux", "Espace Locataire", "Signature électronique", "Rapports Fiscaux", "État des lieux numérique", "Messagerie intégrée"].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 text-slate-600">
                         <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0"><Check size={14}/></div>
                         <span className="font-medium text-lg">{item}</span>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-12 text-center text-slate-500 text-sm">
        <div className="container mx-auto px-6 flex flex-col items-center">
           <div className="mb-6"><Logo className="h-8 opacity-80" /></div>
           <p>&copy; {CURRENT_YEAR} Immo-Connect. Fait avec passion pour l'immobilier.</p>
        </div>
      </footer>
    </main>
  );
}