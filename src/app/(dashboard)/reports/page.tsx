"use client";

import React from "react";
import { 
  FileText, Download, BarChart3, TrendingUp, Calendar, ArrowRight, CheckCircle2, Lock 
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const reportTypes = [
  { 
    id: "financial", 
    title: "Bilan Financier (CRG)", 
    desc: "Compte rendu de gestion complet : Loyers encaissés, charges et solde net.", 
    icon: BarChart3, 
    color: "bg-blue-100 text-blue-700",
    isReady: true 
  },
  { 
    id: "tax", 
    title: "Relevé Fiscal Annuel", 
    desc: "Document préparatoire pour votre déclaration d'impôts sur le revenu.", 
    icon: FileText, 
    color: "bg-purple-100 text-purple-700",
    isReady: false // Sera dispo plus tard
  },
];

export default function ReportsPage() {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const crgLink = `/api/reports/crg?month=${currentMonth}&year=${currentYear}`;

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Rapports</h1>
           <p className="text-slate-500">Vos documents comptables officiels.</p>
        </div>
      </div>

      {/* LE RAPPORT PHARE (CRG) */}
      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
         {/* Déco fond */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
         
         <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
               <Badge className="bg-blue-500/20 text-blue-200 border-none px-3 py-1">
                  <CheckCircle2 size={14} className="mr-2"/> Disponible
               </Badge>
               <h2 className="text-3xl font-extrabold leading-tight">Le Bilan de {new Date().toLocaleString('fr-FR', { month: 'long' })} est prêt.</h2>
               <p className="text-slate-400 leading-relaxed">
                  Téléchargez votre Compte Rendu de Gestion (CRG) généré automatiquement à partir de vos encaissements et dépenses réels.
               </p>
               <ul className="grid grid-cols-2 gap-2 text-sm text-slate-300 mt-2">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"/> Total Encaissements</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"/> Liste des Dépenses</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500"/> Solde Net Propriétaire</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"/> Honoraires Agence</li>
               </ul>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-auto">
               <a href={crgLink} target="_blank" rel="noopener noreferrer">
                   <Button size="lg" className="w-full md:w-auto bg-white text-slate-900 hover:bg-blue-50 border-none font-bold shadow-lg h-14 px-8">
                      <Download size={20} className="mr-2 text-blue-600"/> Télécharger le PDF
                   </Button>
               </a>
               <p className="text-center text-xs text-slate-500">Généré instantanément</p>
            </div>
         </div>
      </div>

      {/* AUTRES RAPPORTS */}
      <h3 className="font-bold text-slate-900 mt-8">Autres documents</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {reportTypes.filter(r => !r.isReady).map((rep) => (
            <Card key={rep.id} className="opacity-70 border-slate-200 bg-slate-50/50">
               <CardContent className="p-6 flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-slate-100 text-slate-400 grayscale`}>
                     <rep.icon size={24} />
                  </div>
                  <div className="flex-1">
                     <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-700">{rep.title}</h4>
                        <Badge variant="secondary" className="text-[10px]"><Lock size={10} className="mr-1"/> Bientôt</Badge>
                     </div>
                     <p className="text-sm text-slate-500 mt-1">{rep.desc}</p>
                  </div>
               </CardContent>
            </Card>
         ))}
      </div>
    </div>
  );
}