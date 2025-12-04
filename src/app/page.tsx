import React from "react";
import Link from "next/link";
import { 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  BarChart3, 
  ShieldCheck, 
  Users, 
  Zap, 
  LayoutDashboard 
} from "lucide-react";

import Button from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Input from "@/components/ui/Input";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-600 selection:bg-blue-100 selection:text-blue-700">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100 blur-3xl opacity-60"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-orange-100 blur-3xl opacity-40"></div>
        </div>

        <div className="container relative z-10 mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
            La solution n°1 pour les gestionnaires
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            Gérez vos biens <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-blue-400">
              en toute simplicité
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 mb-10 leading-relaxed">
            Immo-Connect centralise la gestion de votre parc immobilier. 
            Automatisez vos tâches, suivez vos loyers et communiquez avec vos locataires.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-200 border-none px-8 h-12 text-lg">
                Commencer maintenant
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="rounded-full border-slate-200 px-8 h-12 text-lg">
              Voir la démo
            </Button>
          </div>

          {/* Mockup visuel */}
          <div className="mt-20 relative mx-auto max-w-5xl p-4 bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 shadow-2xl shadow-slate-200/50">
             <div className="aspect-video bg-slate-50 rounded-xl border border-slate-100 overflow-hidden flex items-center justify-center relative">
                <div className="absolute inset-0 bg-linear-to-br from-slate-50 to-blue-50/30"></div>
                <div className="text-slate-300 flex flex-col items-center gap-4">
                  <LayoutDashboard size={64} className="text-blue-200" />
                  <span className="font-medium text-slate-400">Interface Dashboard Immo-Connect</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURES SECTION */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Une suite d'outils complète conçue pour optimiser chaque aspect de votre gestion locative.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <Card className="group border-slate-100 bg-white shadow-sm hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                  <Building2 className="text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-xl text-slate-900">Gestion Locative</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-500 leading-relaxed">Suivez vos baux, quittances et états des lieux.</p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="group border-slate-100 bg-white shadow-sm hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                  <BarChart3 className="text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-xl text-slate-900">Finances</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-500 leading-relaxed">Tableaux de bord automatisés pour la rentabilité.</p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="group border-slate-100 bg-white shadow-sm hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                  <Users className="text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-xl text-slate-900">Locataires</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-500 leading-relaxed">Portail dédié pour la communication et les paiements.</p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="group border-slate-100 bg-white shadow-sm hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                  <Zap className="text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-xl text-slate-900">IA Advisor</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-500 leading-relaxed">Conseils intelligents pour maximiser vos revenus.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. POURQUOI NOUS (Dark Section) */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Pourquoi choisir <span className="text-blue-400">Immo-Connect</span> ?
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Conçu par des experts de l'immobilier pour des exigences modernes.
              </p>
              
              <div className="space-y-4">
                {["Sécurité des données (AES-256)", "Support client 7j/7", "Mises à jour gratuites", "Compatible mobile"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <CheckCircle2 size={14} className="text-blue-400" />
                    </div>
                    <span className="text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-[100px] opacity-20"></div>
              <Card className="relative bg-slate-800/50 border-slate-700 backdrop-blur-sm p-6 text-white">
                <div className="flex items-center gap-4 mb-6">
                   <ShieldCheck className="text-blue-400 h-10 w-10" />
                   <div>
                     <h4 className="font-bold text-lg">Fiabilité Garantie</h4>
                     <p className="text-slate-400 text-sm">99.9% Uptime</p>
                   </div>
                </div>
                <div className="space-y-3">
                   <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full w-[90%] bg-blue-500 rounded-full"></div>
                   </div>
                   <div className="flex justify-between text-xs text-slate-400">
                      <span>Performance</span>
                      <span>Excellent</span>
                   </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="bg-slate-50 py-16 border-t border-slate-200">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">I</div>
                 <span className="text-xl font-bold text-slate-900">Immo-Connect</span>
              </div>
              <p className="text-slate-500 mb-6 max-w-sm">
                La plateforme moderne pour les propriétaires exigeants.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Produit</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="#" className="hover:text-blue-600">Fonctionnalités</Link></li>
                <li><Link href="#" className="hover:text-blue-600">Tarifs</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-4">Newsletter</h4>
              <div className="flex flex-col gap-2">
                <Input placeholder="Email" className="bg-white border-slate-200" />
                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">S'inscrire</Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}