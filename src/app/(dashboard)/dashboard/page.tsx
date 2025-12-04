// ⚠️ SÉCURITÉ CRITIQUE : Force le rendu dynamique par utilisateur
// Empêche tout cache statique partagé accidentel.
export const dynamic = "force-dynamic";

import React from "react";
import Link from "next/link";
import { Wallet, AlertTriangle, ArrowRight, Building2, Home, UserPlus } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, CURRENT_MONTH } from "@/lib/utils";
import { PerformanceMetrics } from "@/components/dashboard/PerformanceMetrics";
import { RentAdvisor } from "@/components/ai/RentAdvisor"; 
import { getDashboardData } from "@/app/data/dashboard";
import { getUserMe } from "@/app/actions/user";

export default async function DashboardPage() {
  // 1. Chargement Parallèle (Rapide & Sécurisé par force-dynamic)
  const [dashboard, user] = await Promise.all([
    getDashboardData(),
    getUserMe()
  ]);

  const stats = dashboard?.kpi || { monthlyRevenue: 0, monthlyExpected: 0, occupancyRate: 0, activeTickets: 0, totalProperties: 0 };
  const chartData = dashboard?.chartData || [];

  // --- MODE ONBOARDING (Nouveau Client) ---
  const isNewUser = stats.totalProperties === 0;

  if (isNewUser) {
    return (
      <div className="space-y-8 pb-10 animate-in fade-in duration-700">
         {/* HEADER ACCUEILLANT */}
         <div className="text-center py-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
               Bienvenue, {user?.firstName} ! 👋
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
               Votre espace est prêt. Configurez votre agence en 3 étapes pour commencer à piloter votre patrimoine.
            </p>
         </div>

         {/* PARCOURS D'ACTIVATION */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            
            {/* Étape 1 : Créer un bien */}
            <Card className="border-2 border-blue-100 shadow-lg hover:border-blue-300 transition-all cursor-pointer group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Home size={80} />
               </div>
               <CardContent className="p-8 flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                     <Home size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">1. Ajoutez un bien</h3>
                  <p className="text-slate-500 text-sm mb-6 flex-1">
                     Enregistrez votre premier appartement, maison ou local commercial.
                  </p>
                  <Link href="/properties/new" className="w-full">
                     <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Commencer <ArrowRight size={16} className="ml-2"/>
                     </Button>
                  </Link>
               </CardContent>
            </Card>

            {/* Étape 2 : Ajouter un locataire */}
            <Card className="border border-slate-200 bg-slate-50/50 opacity-80 hover:opacity-100 transition-opacity">
               <CardContent className="p-8 flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 bg-white border border-slate-200 text-slate-400 rounded-full flex items-center justify-center mb-6">
                     <UserPlus size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-700 mb-2">2. Installez un locataire</h3>
                  <p className="text-slate-500 text-sm mb-6 flex-1">
                     Créez un dossier locataire et générez le bail automatiquement.
                  </p>
                  <Button variant="outline" disabled className="w-full">
                     En attente de bien
                  </Button>
               </CardContent>
            </Card>

            {/* Étape 3 : Encaisser */}
            <Card className="border border-slate-200 bg-slate-50/50 opacity-80 hover:opacity-100 transition-opacity">
               <CardContent className="p-8 flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 bg-white border border-slate-200 text-slate-400 rounded-full flex items-center justify-center mb-6">
                     <Wallet size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-700 mb-2">3. Encaissez le loyer</h3>
                  <p className="text-slate-500 text-sm mb-6 flex-1">
                     Suivez les paiements et envoyez les quittances en un clic.
                  </p>
                  <Button variant="outline" disabled className="w-full">
                     En attente
                  </Button>
               </CardContent>
            </Card>
         </div>
      </div>
    );
  }

  // --- MODE DASHBOARD COMPLET (Utilisateur Actif) ---
  const progress = stats.monthlyExpected > 0 
    ? Math.round((stats.monthlyRevenue / stats.monthlyExpected) * 100) 
    : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-10 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Bonjour, {user?.firstName || "Gestionnaire"} 👋
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Voici ce qui se passe sur votre parc aujourd'hui.
          </p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
           <Link href="/properties/new" className="flex-1 md:flex-none">
             <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 shadow-md">
               + Ajouter un bien
             </Button>
           </Link>
        </div>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CARTE REVENUS (VIVANTE) */}
        <Card className="lg:col-span-2 border-slate-200 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
           <CardContent className="p-6 md:p-8 flex flex-col justify-between h-full min-h-[200px] relative z-10">
              <div className="flex justify-between items-start mb-6">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200">
                       <Wallet size={28}/>
                    </div>
                    <div>
                       <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Encaissements ({CURRENT_MONTH})</p>
                       <Badge className="mt-1 bg-blue-50 text-blue-700 border-blue-100 px-2 py-0.5 text-[10px]">
                          {progress}% de l'objectif
                       </Badge>
                    </div>
                 </div>
              </div>
              
              <div>
                 <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                    {formatCurrency(stats.monthlyRevenue)}
                 </h2>
                 <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                 </div>
                 <p className="text-slate-400 text-xs mt-2 flex justify-between">
                    <span>Reçu</span>
                    <span>Sur {formatCurrency(stats.monthlyExpected)} attendus</span>
                 </p>
              </div>
           </CardContent>
        </Card>

        {/* CARTE URGENCES / ALERTES */}
        <Card className="flex flex-col border-l-4 border-l-orange-500 bg-white shadow-sm min-h-[200px]">
           <CardContent className="flex-1 flex flex-col justify-center items-center p-6 text-center">
              <div className="p-3 bg-orange-50 text-orange-500 rounded-full mb-2 animate-pulse">
                 <AlertTriangle size={24}/>
              </div>
              <span className="text-4xl font-extrabold text-slate-900">{stats.activeTickets}</span>
              <p className="text-xs font-bold text-slate-400 uppercase mt-1">Incidents en cours</p>
              <Link href="/maintenance" className="mt-4 w-full">
                <Button variant="ghost" size="sm" className="w-full text-orange-600 hover:bg-orange-50 text-xs">
                   Voir les tickets <ArrowRight size={12} className="ml-1"/>
                </Button>
              </Link>
           </CardContent>
        </Card>
      </div>

      {/* SECTION ANALYSE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* GRAPHIQUE FLUX */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-bold text-slate-900">Flux de Trésorerie</h3>
                 <div className="flex gap-4 text-xs font-medium text-slate-500">
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-600"></span> Entrées</div>
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-500"></span> Sorties</div>
                 </div>
              </div>
              <div className="h-[220px] w-full">
                 {/* Le graphique reçoit les vraies données ! */}
                 <PerformanceMetrics data={chartData} />
              </div>
           </div>
        </div>

        {/* WIDGETS DROITE */}
        <div className="space-y-6">
           <div className="h-auto min-h-[280px]">
              <RentAdvisor />
           </div>
           
           {/* CARTE OCCUPATION */}
           <Card className="bg-slate-900 text-white border-none overflow-hidden relative">
              <div className="absolute right-0 bottom-0 opacity-10">
                 <Building2 size={120} />
              </div>
              <CardContent className="p-6 flex items-center justify-between relative z-10">
                 <div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Taux d'Occupation</p>
                    <p className="text-3xl font-bold text-white">{stats.occupancyRate}%</p>
                    <p className="text-xs text-blue-200 mt-1">
                       Sur {stats.totalProperties} biens
                    </p>
                 </div>
                 {/* Mini Jauge Circulaire CSS */}
                 <div className="relative w-16 h-16">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                       <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#334155" strokeWidth="3" />
                       <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#2563EB" strokeWidth="3" strokeDasharray={`${stats.occupancyRate}, 100`} className="animate-[spin_1s_ease-out_reverse]" />
                    </svg>
                 </div>
              </CardContent>
           </Card>
        </div>

      </div>
    </div>
  );
}