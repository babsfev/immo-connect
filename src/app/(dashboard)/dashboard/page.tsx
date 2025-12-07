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
import { InboxWidget } from "@/components/dashboard/InboxWidget";
import { getDashboardData } from "@/app/data/dashboard";
import { getUserMe } from "@/app/data/user"; 

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
  recentNotifications?: any[];
  recentTenants?: any[];
}

export default async function DashboardPage() {
  const [dashboard, user] = await Promise.all([ getDashboardData(), getUserMe() ]);
  const data = dashboard as DashboardData | null;

  const stats = data?.kpi || { monthlyRevenue: 0, monthlyExpected: 0, occupancyRate: 0, activeTickets: 0, totalProperties: 0 };
  const chartData = data?.chartData || [];
  const recentNotifications = data?.recentNotifications || [];
  const isNewUser = stats.totalProperties === 0;

  if (isNewUser) {
    // ... (Code Onboarding inchangé, voir version précédente pour gain de place)
    // Si vous avez besoin du bloc Onboarding complet, dites-le moi
    return <div className="p-8 text-center"><p>Bienvenue ! Ajoutez votre premier bien.</p><Link href="/properties/new"><Button>Commencer</Button></Link></div>;
  }

  const progress = stats.monthlyExpected > 0 ? Math.min(Math.round((stats.monthlyRevenue / stats.monthlyExpected) * 100), 100) : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 px-4 sm:px-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-200/60 pb-8 pt-2">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Bonjour, {user?.firstName || "Gestionnaire"} 👋</h1>
          <p className="text-slate-500 mt-2 text-base">Voici la situation de votre parc immobilier aujourd'hui.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
           <Link href="/properties/new" className="flex-1 md:flex-none">
             <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 shadow-xl px-6 h-12">+ Nouveau Bien</Button>
           </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-slate-200 shadow-sm hover:shadow-lg transition-all relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/80 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
           <CardContent className="p-8 flex flex-col justify-between h-full min-h-[220px] relative z-10">
              <div className="flex justify-between items-start mb-6">
                 <div className="flex items-center gap-4">
                    <div className="p-3.5 bg-blue-600 text-white rounded-2xl shadow-lg"><Wallet size={28} strokeWidth={2.5}/></div>
                    <div>
                       <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Encaissements ({CURRENT_MONTH})</p>
                       <Badge variant={progress === 100 ? "success" : "info"} className="text-[10px] px-2 py-0.5">{progress}% Recouvré</Badge>
                    </div>
                 </div>
              </div>
              <div>
                 <div className="flex items-baseline gap-2">
                    <h2 className="text-5xl font-extrabold tracking-tight text-slate-900">{formatCurrency(stats.monthlyRevenue)}</h2>
                    <span className="text-slate-400 font-medium hidden sm:inline"> / {formatCurrency(stats.monthlyExpected)}</span>
                 </div>
                 <div className="w-full bg-slate-100 h-3 rounded-full mt-5 overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-1500 ease-out ${progress === 100 ? "bg-green-500" : "bg-blue-600"}`} style={{ width: `${progress}%` }}></div>
                 </div>
              </div>
           </CardContent>
        </Card>

        <Card className={`flex flex-col border-l-4 bg-white shadow-sm hover:shadow-md transition-all min-h-[220px] ${stats.activeTickets > 0 ? "border-l-orange-500" : "border-l-green-500"}`}>
           <CardContent className="flex-1 flex flex-col justify-center items-center p-8 text-center">
              <div className={`p-4 rounded-full mb-4 ${stats.activeTickets > 0 ? "bg-orange-50 text-orange-500 animate-pulse" : "bg-green-50 text-green-500"}`}>
                 {stats.activeTickets > 0 ? <AlertTriangle size={32}/> : <FileText size={32}/>}
              </div>
              <span className="text-5xl font-extrabold text-slate-900 mb-1">{stats.activeTickets}</span>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">{stats.activeTickets > 0 ? "Incidents en cours" : "Tout est calme"}</p>
              {stats.activeTickets > 0 && (
                  <Link href="/maintenance" className="mt-6 w-full"><Button variant="ghost" size="sm" className="w-full text-orange-600 hover:bg-orange-50 text-xs font-bold uppercase tracking-wider">Gérer les tickets <ArrowRight size={12} className="ml-1"/></Button></Link>
              )}
           </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
           <Card className="h-full border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-8">
                 <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2"><ArrowRight className="text-slate-400 -rotate-45" size={20}/> Flux de Trésorerie</h3>
              </div>
              <div className="h-[260px] w-full"><PerformanceMetrics data={chartData} /></div>
           </Card>
        </div>
        <div className="space-y-6">
           <div className="h-auto min-h-[220px]"><RentAdvisor /></div>
           <div className="h-[350px]"><InboxWidget notifications={recentNotifications} /></div>
        </div>
      </div>
    </div>
  );
}