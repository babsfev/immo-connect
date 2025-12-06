// ⚠️ SÉCURITÉ CRITIQUE : Force le rendu dynamique par utilisateur
export const dynamic = "force-dynamic";

import React from "react";
import Link from "next/link";
import { Wallet, AlertTriangle, ArrowRight, Building2, Home, UserPlus, FileText } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, CURRENT_MONTH } from "@/lib/utils";
import { PerformanceMetrics } from "@/components/dashboard/PerformanceMetrics";
import { RentAdvisor } from "@/components/ai/RentAdvisor"; 
import { InboxWidget } from "@/components/dashboard/InboxWidget"; // <--- AJOUTÉ
import { getDashboardData } from "@/app/data/dashboard";
import { getUserMe } from "@/app/data/user"; 

// Typage explicite
interface DashboardData {
  kpi: {
    monthlyRevenue: number;
    monthlyExpected: number;
    occupancyRate: number;
    activeTickets: number;
    totalProperties: number;
  };
  chartData: any[];
  propertyToOptimize?: { title: string; id: string } | null;
  recentNotifications?: any[]; // <--- AJOUTÉ
  recentTenants?: any[];
}

export default async function DashboardPage() {
  const [dashboard, user] = await Promise.all([
    getDashboardData(),
    getUserMe()
  ]);

  const data = dashboard as DashboardData | null;

  const stats = data?.kpi || { 
    monthlyRevenue: 0, 
    monthlyExpected: 0, 
    occupancyRate: 0, 
    activeTickets: 0, 
    totalProperties: 0 
  };
  const chartData = data?.chartData || [];
  const propertyToOptimize = data?.propertyToOptimize;
  const recentNotifications = data?.recentNotifications || [];

  // --- MODE ONBOARDING ---
  const isNewUser = stats.totalProperties === 0;

  if (isNewUser) {
    return (
      <div className="space-y-8 pb-10 animate-in fade-in duration-700">
         <div className="text-center py-12 px-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
               Bienvenue, {user?.firstName} ! 👋
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
               Votre espace est prêt. Configurez votre agence en 3 étapes simples.
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
            <Link href="/properties/new" className="group block">
                <Card className="border-2 border-blue-100 shadow-xl shadow-blue-50 hover:border-blue-500 hover:shadow-blue-100 transition-all cursor-pointer h-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Home size={120} />
                    </div>
                    <CardContent className="p-8 flex flex-col items-center text-center h-full">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                            <Home size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">1. Ajoutez un bien</h3>
                        <p className="text-slate-500 text-sm mb-8 flex-1 leading-relaxed">
                            Enregistrez votre premier appartement, maison ou local commercial.
                        </p>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md group-hover:shadow-lg">
                            Commencer <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform"/>
                        </Button>
                    </CardContent>
                </Card>
            </Link>

            <Card className="border border-slate-200 bg-slate-50/50 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-not-allowed">
               <CardContent className="p-8 flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 bg-white border border-slate-200 text-slate-400 rounded-2xl flex items-center justify-center mb-6">
                     <UserPlus size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-700 mb-3">2. Installez un locataire</h3>
                  <p className="text-slate-500 text-sm mb-8 flex-1">
                     Créez un dossier locataire et générez le bail.
                  </p>
                  <Button variant="outline" disabled className="w-full bg-white">
                     En attente de bien
                  </Button>
               </CardContent>
            </Card>

            <Card className="border border-slate-200 bg-slate-50/50 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-not-allowed">
               <CardContent className="p-8 flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 bg-white border border-slate-200 text-slate-400 rounded-2xl flex items-center justify-center mb-6">
                     <Wallet size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-700 mb-3">3. Encaissez le loyer</h3>
                  <p className="text-slate-500 text-sm mb-8 flex-1">
                     Suivez les paiements et envoyez les quittances.
                  </p>
                  <Button variant="outline" disabled className="w-full bg-white">
                     En attente
                  </Button>
               </CardContent>
            </Card>
         </div>
      </div>
    );
  }

  // --- MODE DASHBOARD COMPLET ---
  const progress = stats.monthlyExpected > 0 
    ? Math.min(Math.round((stats.monthlyRevenue / stats.monthlyExpected) * 100), 100) 
    : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 px-4 sm:px-6 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-200/60 pb-8 pt-2">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Bonjour, {user?.firstName || "Gestionnaire"} 👋
          </h1>
          <p className="text-slate-500 mt-2 text-base">
            Voici la situation de votre parc immobilier aujourd'hui.
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
           <Link href="/properties/new" className="flex-1 md:flex-none">
             <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/10 px-6 h-12">
               + Nouveau Bien
             </Button>
           </Link>
        </div>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CARTE REVENUS */}
        <Card className="lg:col-span-2 border-slate-200 shadow-sm hover:shadow-lg transition-all relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/80 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
           
           <CardContent className="p-8 flex flex-col justify-between h-full min-h-[220px] relative z-10">
              <div className="flex justify-between items-start mb-6">
                 <div className="flex items-center gap-4">
                    <div className="p-3.5 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/30">
                       <Wallet size={28} strokeWidth={2.5}/>
                    </div>
                    <div>
                       <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Encaissements ({CURRENT_MONTH})</p>
                       <Badge variant={progress === 100 ? "success" : "info"} className="text-[10px] px-2 py-0.5">
                          {progress}% Recouvré
                       </Badge>
                    </div>
                 </div>
              </div>
              
              <div>
                 <div className="flex items-baseline gap-2">
                    <h2 className="text-5xl font-extrabold tracking-tight text-slate-900">
                        {formatCurrency(stats.monthlyRevenue)}
                    </h2>
                    <span className="text-slate-400 font-medium hidden sm:inline"> / {formatCurrency(stats.monthlyExpected)}</span>
                 </div>
                 
                 <div className="w-full bg-slate-100 h-3 rounded-full mt-5 overflow-hidden">
                    <div 
                        className={`h-full rounded-full transition-all duration-1500 ease-out ${progress === 100 ? "bg-green-500" : "bg-blue-600"}`} 
                        style={{ width: `${progress}%` }}
                    ></div>
                 </div>
                 
                 <p className="text-slate-400 text-xs mt-3 flex justify-between font-medium">
                    <span>Montant perçu</span>
                    <span>Objectif : {formatCurrency(stats.monthlyExpected)}</span>
                 </p>
              </div>
           </CardContent>
        </Card>

        {/* CARTE ALERTES */}
        <Card className={`flex flex-col border-l-4 bg-white shadow-sm hover:shadow-md transition-all min-h-[220px] ${stats.activeTickets > 0 ? "border-l-orange-500" : "border-l-green-500"}`}>
           <CardContent className="flex-1 flex flex-col justify-center items-center p-8 text-center">
              <div className={`p-4 rounded-full mb-4 ${stats.activeTickets > 0 ? "bg-orange-50 text-orange-500 animate-pulse" : "bg-green-50 text-green-500"}`}>
                 {stats.activeTickets > 0 ? <AlertTriangle size={32}/> : <FileText size={32}/>}
              </div>
              
              <span className="text-5xl font-extrabold text-slate-900 mb-1">{stats.activeTickets}</span>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                 {stats.activeTickets > 0 ? "Incidents en cours" : "Tout est calme"}
              </p>
              
              {stats.activeTickets > 0 && (
                  <Link href="/maintenance" className="mt-6 w-full">
                    <Button variant="ghost" size="sm" className="w-full text-orange-600 hover:bg-orange-50 text-xs font-bold uppercase tracking-wider">
                    Gérer les tickets <ArrowRight size={12} className="ml-1"/>
                    </Button>
                  </Link>
              )}
           </CardContent>
        </Card>
      </div>

      {/* SECTION ANALYSE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* GRAPHIQUE */}
        <div className="lg:col-span-2">
           <Card className="h-full border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-8">
                 <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <ArrowRight className="text-slate-400 -rotate-45" size={20}/> Flux de Trésorerie
                 </h3>
                 <div className="flex gap-6 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Entrées</div>
                    <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-orange-500 opacity-50"></span> Sorties</div>
                 </div>
              </div>
              <div className="h-[260px] w-full">
                 <PerformanceMetrics data={chartData} />
              </div>
           </Card>
        </div>

        {/* WIDGETS */}
        <div className="space-y-6">
           
           {/* 1. RENT ADVISOR (IA) */}
           <div className="h-auto min-h-[220px]">
              <RentAdvisor/>
           </div>

           {/* 2. NOTIFICATIONS (Activité) - Connecté au vrai flux */}
           <div className="h-[350px]">
               <InboxWidget notifications={recentNotifications} />
           </div>
           
           {/* 3. TAUX D'OCCUPATION (Optionnel ou en bas) */}
           {/* ... Code existant carte Occupation ... */}
        </div>
      </div>
    </div>
  );
}