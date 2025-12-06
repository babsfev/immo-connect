"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, Check, Shield, Zap, Globe, 
  Smartphone, LayoutDashboard, Menu, X, BarChart3, Users, Key
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Badge } from "@/components/ui/Badge";
import { CURRENT_YEAR } from "@/lib/utils";

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">
      
      {/* --- 1. NAVBAR (Glassmorphism) --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 transition-all">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="shrink-0 scale-90 sm:scale-100 transition-transform">
            <Logo className="h-10" />
          </div>
          
          {/* Menu Bureau */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 absolute left-1/2 -translate-x-1/2">
            <Link href="#features" className="hover:text-blue-600 transition-colors">Fonctionnalités</Link>
            <Link href="/market" className="hover:text-blue-600 transition-colors">Marketplace</Link>
            <Link href="#pricing" className="hover:text-blue-600 transition-colors">Tarifs</Link>
          </div>

          <div className="hidden md:flex gap-4 items-center">
            <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-blue-600 px-2 transition-colors">
              Se connecter
            </Link>
            <Link href="/register">
              <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl px-6 shadow-lg shadow-slate-900/20 hover:-translate-y-0.5 transition-all">
                Essayer Gratuitement
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
             <button 
               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
               className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
             >
               {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-2xl animate-in slide-in-from-top-5 duration-200">
             <div className="flex flex-col p-6 space-y-4">
                <Link href="#features" className="text-lg font-bold text-slate-700 py-3 border-b border-slate-100" onClick={() => setIsMobileMenuOpen(false)}>Fonctionnalités</Link>
                <Link href="/market" className="text-lg font-bold text-slate-700 py-3 border-b border-slate-100" onClick={() => setIsMobileMenuOpen(false)}>Marketplace</Link>
                <Link href="#pricing" className="text-lg font-bold text-slate-700 py-3 border-b border-slate-100" onClick={() => setIsMobileMenuOpen(false)}>Tarifs</Link>
                <div className="pt-4 flex flex-col gap-3">
                   <Link href="/login"><Button variant="outline" className="w-full justify-center h-12 text-base rounded-xl">Se connecter</Button></Link>
                   <Link href="/register"><Button className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white h-12 text-base rounded-xl">Commencer</Button></Link>
                </div>
             </div>
          </div>
        )}
      </nav>

      {/* --- 2. HERO SECTION --- */}
      <section className="relative pt-44 pb-32 overflow-hidden">
        {/* Fond décoratif */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-100/40 via-white to-transparent -z-10 pointer-events-none"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="container mx-auto px-6 text-center max-w-5xl relative z-10">
          <Badge variant="brand" className="mb-8 px-4 py-1.5 text-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="flex h-2 w-2 rounded-full bg-white animate-pulse mr-2"></span>
            La V2.0 est disponible
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
            Gérez vos biens.<br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600">
              Encaissez vos loyers.
            </span>
          </h1>
          
          <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            ImmoConnect est la plateforme tout-en-un pour les propriétaires modernes. 
            Automatisez vos quittances, suivez vos finances et trouvez vos locataires.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg rounded-2xl bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/20 hover:-translate-y-1 transition-all">
                Commencer maintenant <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/market" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg rounded-2xl bg-white/50 backdrop-blur border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300">
                Explorer le marché
              </Button>
            </Link>
          </div>

          {/* Mockup Dashboard Flottant */}
          <div className="mt-20 relative mx-auto max-w-4xl animate-in fade-in zoom-in-95 duration-1000 delay-500 group">
             <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-purple-600 rounded-4xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
             <div className="relative rounded-[1.7rem] bg-slate-900 p-2 shadow-2xl">
                <div className="aspect-video rounded-3xl bg-slate-950 overflow-hidden relative border border-slate-800 flex items-center justify-center">
                   {/* Simulation d'interface */}
                   <div className="absolute inset-0 bg-linear-to-br from-slate-900 to-slate-950"></div>
                   <div className="relative z-10 text-center space-y-4 transform transition-transform duration-700 group-hover:scale-105">
                      <LayoutDashboard size={64} className="text-blue-500 mx-auto opacity-80"/>
                      <div>
                        <p className="text-white font-bold text-xl">Tableau de Bord Intelligent</p>
                        <p className="text-slate-400 text-sm">Vue en temps réel de vos performances</p>
                      </div>
                   </div>
                   
                   {/* Elements flottants décoratifs */}
                   <div className="absolute top-10 left-10 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 transform -rotate-6 animate-float">
                      <div className="h-2 w-20 bg-white/20 rounded mb-2"></div>
                      <div className="h-2 w-12 bg-white/20 rounded"></div>
                   </div>
                   <div className="absolute bottom-10 right-10 bg-blue-600/20 backdrop-blur-md p-4 rounded-xl border border-blue-500/30 transform rotate-3 animate-float animation-delay-2000">
                      <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                         <Check size={16} className="text-white"/>
                      </div>
                      <div className="h-2 w-16 bg-white/20 rounded"></div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- 3. PREUVE SOCIALE --- */}
      <section className="py-10 border-y border-slate-100 bg-white/50">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Ils nous font confiance</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Logos simulés avec du texte stylisé */}
             {['SenImmo', 'Dakar Homes', 'Teranga Real Estate', 'SeneBail', 'West Africa Prop'].map((name, i) => (
                <span key={i} className="text-lg md:text-xl font-black text-slate-800">{name}</span>
             ))}
          </div>
        </div>
      </section>

      {/* --- 4. BENTO GRID (Fonctionnalités) --- */}
      <section id="features" className="py-32 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Tout ce dont vous avez besoin.</h2>
            <p className="text-slate-500 text-lg md:text-xl leading-relaxed">
              Une suite d'outils complète conçue pour remplacer Excel, WhatsApp et les fichiers papier. Centralisez tout au même endroit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[380px]">
             
             {/* Carte 1 : Marketplace */}
             <div className="md:col-span-2 rounded-4xl bg-blue-50 border border-blue-100 p-10 relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                <div className="relative z-10 max-w-md">
                   <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform"><Globe size={28} /></div>
                   <h3 className="text-3xl font-bold text-slate-900 mb-4">Marketplace Intégrée</h3>
                   <p className="text-slate-600 text-lg leading-relaxed">Publiez vos biens vacants directement sur notre réseau. Recevez des dossiers qualifiés sans effort marketing.</p>
                </div>
                <div className="absolute right-0 bottom-0 w-80 h-80 bg-linear-to-tl from-blue-200 to-transparent rounded-tl-full opacity-60 group-hover:scale-110 transition-transform duration-700"></div>
                {/* Image décorative abstraite */}
                <div className="absolute -right-10 top-1/2 -translate-y-1/2 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                   <LayoutDashboard size={300} />
                </div>
             </div>

             {/* Carte 2 : Mobile First */}
             <div className="md:col-span-1 rounded-4xl bg-slate-900 text-white p-10 flex flex-col justify-between relative overflow-hidden shadow-2xl group">
                <div>
                   <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-6 backdrop-blur-md border border-white/10 group-hover:bg-white/20 transition-colors"><Smartphone size={28} /></div>
                   <h3 className="text-2xl font-bold mb-2">100% Mobile</h3>
                   <p className="text-slate-400 text-base">Gérez votre parc depuis votre poche, où que vous soyez à Dakar ou ailleurs.</p>
                </div>
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500 rounded-full blur-[80px] opacity-40 group-hover:opacity-60 transition-opacity"></div>
             </div>

             {/* Carte 3 : Finances Auto */}
             <div className="md:col-span-1 rounded-4xl bg-white border border-slate-200 p-10 group hover:border-orange-200 hover:shadow-xl transition-all duration-500">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform"><Zap size={28} /></div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Finances Auto</h3>
                <p className="text-slate-500 text-base leading-relaxed">Quittances, relances et rapports fiscaux automatisés. Ne courez plus après les paiements.</p>
             </div>

             {/* Carte 4 : Liste fonctionnalités */}
             <div className="md:col-span-2 rounded-4xl bg-white border border-slate-200 p-10 flex flex-col justify-center hover:shadow-xl transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-1 bg-linear-to-r from-green-400 to-blue-500"></div>
                <h3 className="text-2xl font-bold text-slate-900 mb-8">Un écosystème complet pour le bailleur.</h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                   {[
                      { icon: Key, label: "Gestion des clés" },
                      { icon: Users, label: "Espace Locataire" },
                      { icon: Check, label: "Signature élec." },
                      { icon: BarChart3, label: "Rapports Fiscaux" },
                      { icon: Shield, label: "État des lieux" },
                      { icon: Globe, label: "Site Vitrine" }
                   ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 text-slate-700 group/item">
                         <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center shrink-0 group-hover/item:bg-blue-100 group-hover/item:text-blue-600 transition-colors">
                            <item.icon size={14}/>
                         </div>
                         <span className="font-semibold text-base">{item.label}</span>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- 5. CTA FINAL --- */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[150px] opacity-20"></div>
         
         <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Prêt à moderniser votre gestion ?</h2>
            <p className="text-blue-200 text-xl mb-10 max-w-2xl mx-auto">Rejoignez plus de 500 propriétaires qui gagnent du temps chaque jour avec ImmoConnect.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <Link href="/register">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-12 bg-white text-slate-900 hover:bg-blue-50 font-bold text-lg rounded-2xl shadow-xl hover:-translate-y-1 transition-all">
                     Créer un compte gratuit
                  </Button>
               </Link>
               <Link href="/contact">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-12 border-slate-700 text-white hover:bg-slate-800 hover:text-white rounded-2xl">
                     Contacter l'équipe
                  </Button>
               </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Aucune carte bancaire requise. 14 jours d'essai gratuit.</p>
         </div>
      </section>

      {/* --- 6. FOOTER --- */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-2">
              <Logo className="h-6" />
              <span className="text-sm text-slate-500">© {CURRENT_YEAR}</span>
           </div>
           <div className="flex gap-8 text-sm font-medium text-slate-500">
              <Link href="#" className="hover:text-blue-600 transition-colors">Confidentialité</Link>
              <Link href="#" className="hover:text-blue-600 transition-colors">Conditions</Link>
              <Link href="#" className="hover:text-blue-600 transition-colors">Support</Link>
           </div>
        </div>
      </footer>
    </main>
  );
}