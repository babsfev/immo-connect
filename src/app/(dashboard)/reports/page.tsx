"use client";
import React from "react";
import { FileBarChart, Calendar, Download, Printer, PieChart } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

const reports = [
  { id: 1, title: "Bilan Financier Mensuel", desc: "Entrées, sorties et cashflow net.", type: "Finance", color: "bg-green-100 text-green-700" },
  { id: 2, title: "État Locatif (Vacance)", desc: "Taux d'occupation et biens vacants.", type: "Occupation", color: "bg-blue-100 text-blue-700" },
  { id: 3, title: "Rapport des Impayés", desc: "Liste des locataires en retard + actions.", type: "Risque", color: "bg-red-100 text-red-700" },
  { id: 4, title: "Grand Livre Propriétaires", desc: "Détail des reversements par mandat.", type: "Compta", color: "bg-purple-100 text-purple-700" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Rapports & Analyses</h1>
           <p className="text-slate-500">Exportez vos données pour votre comptabilité.</p>
        </div>
        <div className="flex gap-2 bg-white p-1 rounded-lg border border-slate-200">
           <Button variant="ghost" size="sm" className="text-slate-600"><Calendar size={16} className="mr-2"/> Cette Année</Button>
        </div>
      </div>

      {/* Grille des Rapports Disponibles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {reports.map((rep) => (
            <Card key={rep.id} className="hover:shadow-md transition-all cursor-pointer border-l-4 border-l-transparent hover:border-l-blue-600">
               <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                     <div className={`p-3 rounded-xl ${rep.color}`}>
                        <FileBarChart size={24} />
                     </div>
                     <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600"><Printer size={16}/></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600"><Download size={16}/></Button>
                     </div>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">{rep.title}</h3>
                  <p className="text-slate-500 text-sm">{rep.desc}</p>
               </CardContent>
            </Card>
         ))}
      </div>

      {/* Zone Prévisualisation Graphique (Simulation) */}
      <Card className="bg-slate-50 border-slate-200">
         <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><PieChart size={18}/> Aperçu : Répartition des Charges</CardTitle>
         </CardHeader>
         <CardContent className="h-64 flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 m-6 rounded-xl bg-white">
            Graphique généré lors de l'export...
         </CardContent>
      </Card>
    </div>
  );
}