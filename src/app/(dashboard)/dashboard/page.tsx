import React from "react";
import { Wallet, Users, Building, AlertTriangle, ArrowUpRight, TrendingUp, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";
import { PerformanceMetrics } from "@/components/dashboard/PerformanceMetrics";

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-8 animate-fade-in-up">
      
      {/* HEADER FLOTTANT */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Bonjour, Jean 👋
          </h1>
          <p className="text-slate-500 mt-1">Voici ce qui se passe sur votre parc aujourd'hui.</p>
        </div>
        <div className="flex gap-3">
           <Button variant="outline" className="rounded-full border-slate-200">Exporter</Button>
           <Button className="rounded-full bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-200">
             + Ajouter un bien
           </Button>
        </div>
      </div>

      {/* SECTION 1 : KPIs (Style "Cartes de Crédit") */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Carte Principale (Gradient) */}
        <div className="col-span-1 md:col-span-2 rounded-2xl p-6 bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-200 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl group-hover:opacity-10 transition-opacity duration-700"></div>
           <div className="relative z-10 flex justify-between items-start h-full flex-col">
              <div className="flex justify-between w-full items-center">
                 <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm"><Wallet className="text-white" size={20}/></div>
                 <Badge className="bg-white/20 text-white border-none backdrop-blur-md hover:bg-white/30">+12% vs N-1</Badge>
              </div>
              <div>
                 <p className="text-blue-100 text-sm font-medium mb-1">Revenus Totaux (Novembre)</p>
                 <h2 className="text-4xl font-bold tracking-tight">{formatCurrency(2250000)}</h2>
              </div>
           </div>
        </div>

        {/* Carte Secondaire (Clean) */}
        <Card className="flex flex-col justify-center items-center text-center border-l-4 border-l-orange-500">
           <div className="h-12 w-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-3">
              <AlertTriangle size={24} />
           </div>
           <h3 className="text-3xl font-bold text-slate-900">3</h3>
           <p className="text-sm text-slate-500 font-medium">Incidents Critiques</p>
           <Button variant="ghost" size="sm" className="mt-2 text-orange-600 hover:bg-orange-50">Voir les tickets</Button>
        </Card>
      </div>

      {/* SECTION 2 : BENTO GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* GRAPHIQUE (Prend 2 colonnes) */}
        <Card className="lg:col-span-2 flex flex-col">
           <CardHeader>
              <CardTitle className="flex items-center gap-2">
                 <TrendingUp size={18} className="text-blue-600"/> Performance Financière
              </CardTitle>
           </CardHeader>
           <CardContent className="flex-1">
              <PerformanceMetrics />
           </CardContent>
        </Card>

        {/* COLONNE DROITE (Stack Verticale) */}
        <div className="space-y-6 flex flex-col">
           
           {/* Taux Occupation */}
           <Card className="flex-1 flex flex-col justify-center items-center p-6 bg-slate-900 text-white border-none">
              <div className="relative h-32 w-32 flex items-center justify-center">
                 {/* Cercle SVG simple pour le taux */}
                 <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"/>
                    <path className="text-blue-500" strokeDasharray="92, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                 </svg>
                 <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-bold">92%</span>
                    <span className="text-[10px] text-slate-400 uppercase">Occupé</span>
                 </div>
              </div>
           </Card>

           {/* Widget IA (Mini) */}
           <Card className="bg-gradient-to-r from-orange-50 to-white border-orange-100">
              <CardContent className="p-4 flex items-start gap-3">
                 <div className="p-2 bg-orange-100 text-orange-600 rounded-lg shrink-0"><Sparkles size={18}/></div>
                 <div>
                    <h4 className="font-bold text-slate-900 text-sm">Conseil du jour</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                       Les loyers à <strong>Mermoz</strong> ont augmenté. Vous devriez réviser le loyer de l'Appartement B2.
                    </p>
                 </div>
              </CardContent>
           </Card>

        </div>
      </div>
    </div>
  );
}