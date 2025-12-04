"use client";

import React, { useState } from "react";
import { 
  FileText, Download, Printer, PieChart, BarChart3, 
  TrendingUp, Sparkles, Calendar, ArrowRight, Lock 
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { toast } from "sonner";

const reportTypes = [
  { 
    id: "financial", 
    title: "Bilan Financier Mensuel (CRG)", 
    desc: "Entrées, sorties et cashflow net pour le mois en cours.", 
    icon: BarChart3, 
    color: "bg-blue-100 text-blue-700",
    stats: "Disponible",
    isReady: true // C'est le seul module prêt
  },
  { 
    id: "occupancy", 
    title: "État Locatif & Vacance", 
    desc: "Taux d'occupation et liste des biens vacants.", 
    icon: PieChart, 
    color: "bg-orange-100 text-orange-700",
    stats: "Bientôt",
    isReady: false 
  },
  { 
    id: "tax", 
    title: "Préparatoire Fiscal", 
    desc: "Déductions, revenus fonciers et amortissements annuels.", 
    icon: FileText, 
    color: "bg-purple-100 text-purple-700",
    stats: "Premium",
    isReady: false 
  },
  { 
    id: "arrears", 
    title: "Rapport des Impayés", 
    desc: "Liste des retards et historique des relances.", 
    icon: TrendingUp, 
    color: "bg-red-100 text-red-700",
    stats: "Bientôt",
    isReady: false 
  },
];

export default function ReportsPage() {
  const [isGenerating, setIsGenerating] = useState<string | null>(null);
  
  // Date actuelle pour le CRG par défaut
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const crgLink = `/api/reports/crg?month=${currentMonth}&year=${currentYear}`;

  const handleDownloadSimulation = (id: string) => {
    setIsGenerating(id);
    setTimeout(() => {
      setIsGenerating(null);
      toast.info("Ce rapport sera disponible dans la version 2.0", {
        description: "Seul le Bilan Financier (CRG) est actif pour le moment."
      });
    }, 1000);
  };

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Rapports & Analyses</h1>
           <p className="text-slate-500">Générez vos documents comptables officiels.</p>
        </div>
        <div className="flex gap-2 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
           <Button variant="ghost" size="sm" className="text-slate-600 bg-slate-100"><Calendar size={16} className="mr-2"/> Ce Mois</Button>
           <Button variant="ghost" size="sm" className="text-slate-600">Cette Année</Button>
        </div>
      </div>

      {/* IA INSIGHT */}
      <Card className="bg-linear-to-r from-slate-900 to-blue-900 text-white border-none relative overflow-hidden shadow-xl">
         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20"></div>
         <CardContent className="p-8 relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
               <div className="flex items-center gap-2 text-orange-400 mb-3">
                  <Sparkles size={20} />
                  <span className="text-xs font-bold uppercase tracking-wider">Audit Flash IA</span>
               </div>
               <h3 className="text-2xl font-bold mb-2">Vos finances sont saines.</h3>
               <p className="text-blue-100 leading-relaxed max-w-xl">
                  Votre <strong>Compte Rendu de Gestion (CRG)</strong> de ce mois est prêt. 
                  Vous avez encaissé 92% des loyers attendus.
               </p>
            </div>
            <div className="shrink-0">
                {/* Lien direct vers le VRAI PDF */}
               <a href={crgLink} target="_blank" rel="noopener noreferrer">
                   <Button className="bg-white text-slate-900 hover:bg-blue-50 border-none h-12 px-6 font-bold shadow-lg">
                      Télécharger le CRG <ArrowRight size={18} className="ml-2"/>
                   </Button>
               </a>
            </div>
         </CardContent>
      </Card>

      {/* GRILLE DES RAPPORTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {reportTypes.map((rep) => (
            <Card key={rep.id} className={`group transition-all cursor-pointer shadow-sm hover:shadow-md ${rep.isReady ? "hover:border-blue-300" : "opacity-80 grayscale-[0.5]"}`}>
               <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-6">
                     <div className={`p-3 rounded-xl ${rep.color}`}>
                        <rep.icon size={28} />
                     </div>
                     <Badge variant={rep.isReady ? "success" : "secondary"} className="font-mono">
                        {rep.stats}
                     </Badge>
                  </div>
                  
                  <h3 className="font-bold text-slate-900 text-xl mb-2">{rep.title}</h3>
                  <p className="text-slate-500 text-sm mb-6 h-10">{rep.desc}</p>

                  <div className="flex gap-3 pt-4 border-t border-slate-100">
                     {rep.isReady ? (
                        // VRAI BOUTON POUR CRG
                        <a href={crgLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                            <Button className="w-full bg-slate-900 text-white hover:bg-slate-800">
                                <Download size={18} className="mr-2"/> Télécharger PDF
                            </Button>
                        </a>
                     ) : (
                        // BOUTON SIMULÉ POUR LES AUTRES
                        <Button 
                            className="flex-1 bg-slate-100 text-slate-400 cursor-not-allowed"
                            onClick={() => handleDownloadSimulation(rep.id)}
                            disabled={isGenerating === rep.id}
                        >
                            {rep.id === "tax" ? <Lock size={16} className="mr-2"/> : <Download size={18} className="mr-2"/>} 
                            {rep.id === "tax" ? "Verrouillé" : "Bientôt disponible"}
                        </Button>
                     )}
                     
                     <Button variant="outline" size="icon" title="Imprimer" disabled={!rep.isReady}>
                        <Printer size={18}/>
                     </Button>
                  </div>
               </CardContent>
            </Card>
         ))}
      </div>

      {/* HISTORIQUE (Statique pour l'instant, à connecter à une table 'ReportHistory' plus tard) */}
      <Card className="bg-slate-50 border-slate-200">
         <CardHeader>
            <CardTitle className="text-base font-bold text-slate-700">Derniers exports</CardTitle>
         </CardHeader>
         <CardContent>
            <div className="space-y-1">
               <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 text-sm">
                  <div className="flex items-center gap-3">
                     <FileText className="text-slate-400" size={20}/>
                     <span className="font-medium text-slate-900">Aucun historique disponible.</span>
                  </div>
               </div>
            </div>
         </CardContent>
      </Card>
    </div>
  );
}