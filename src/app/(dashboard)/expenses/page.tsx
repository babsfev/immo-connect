"use client";
import React, { useState } from "react";
import { 
  Plus, Search, Filter, TrendingDown, TrendingUp, 
  Receipt, Building, Wrench, Droplets, Zap, FileText 
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import { formatCurrency } from "@/lib/utils";
import { Modal } from "@/components/ui/Modal";

// Mock Data Dépenses
const expenses = [
  { id: 1, title: "Réparation Fuite", property: "Appartement T3", provider: "Plombier Express", date: "20 Nov 2024", amount: 45000, category: "Maintenance", recoverable: false },
  { id: 2, title: "Facture SENELEC Communs", property: "Immeuble Le Plateau", provider: "Senelec", date: "18 Nov 2024", amount: 125000, category: "Énergie", recoverable: true }, // Charge récupérable
  { id: 3, title: "Honoraire Agence", property: "Villa Corniche", provider: "Immo-Connect", date: "05 Nov 2024", amount: 84000, category: "Gestion", recoverable: false },
  { id: 4, title: "Taxe Foncière", property: "Appartement T3", provider: "Trésor Public", date: "01 Nov 2024", amount: 120000, category: "Impôts", recoverable: false },
];

export default function ExpensesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8 pb-10">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dépenses & Charges</h1>
          <p className="text-slate-500">Suivi des coûts, factures et charges récupérables.</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} className="mr-2" /> Enregistrer une dépense
        </Button>
      </div>

      {/* KPI FINANCIERS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-red-100 bg-red-50/30 p-4 flex items-center gap-4">
           <div className="h-12 w-12 rounded-full bg-white border border-red-200 flex items-center justify-center text-red-600"><TrendingDown size={24} /></div>
           <div><p className="text-sm text-slate-500">Total Dépenses (Mois)</p><p className="text-2xl font-bold text-red-700">{formatCurrency(374000)}</p></div>
        </Card>
        <Card className="border-blue-100 bg-blue-50/30 p-4 flex items-center gap-4">
           <div className="h-12 w-12 rounded-full bg-white border border-blue-200 flex items-center justify-center text-blue-600"><Receipt size={24} /></div>
           <div><p className="text-sm text-slate-500">Charges Récupérables</p><p className="text-2xl font-bold text-blue-700">{formatCurrency(125000)}</p></div>
        </Card>
        <Card className="border-slate-100 p-4 flex items-center gap-4">
           <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"><Building size={24} /></div>
           <div><p className="text-sm text-slate-500">Fournisseur Top 1</p><p className="text-lg font-bold text-slate-900">Senelec</p></div>
        </Card>
      </div>

      {/* GRAPHIQUE REPARTITION (Simulation Visuelle) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <Card className="lg:col-span-2">
            <CardHeader><CardTitle>Répartition des coûts</CardTitle></CardHeader>
            <CardContent>
               <div className="space-y-4">
                  {/* Barre Maintenance */}
                  <div>
                     <div className="flex justify-between text-sm mb-1"><span className="font-medium">Maintenance & Travaux</span><span>45%</span></div>
                     <div className="w-full bg-slate-100 h-2 rounded-full"><div className="bg-orange-500 h-2 rounded-full" style={{width: "45%"}}></div></div>
                  </div>
                  {/* Barre Energie */}
                  <div>
                     <div className="flex justify-between text-sm mb-1"><span className="font-medium">Énergie & Eau</span><span>30%</span></div>
                     <div className="w-full bg-slate-100 h-2 rounded-full"><div className="bg-blue-500 h-2 rounded-full" style={{width: "30%"}}></div></div>
                  </div>
                  {/* Barre Fiscalité */}
                  <div>
                     <div className="flex justify-between text-sm mb-1"><span className="font-medium">Impôts & Taxes</span><span>25%</span></div>
                     <div className="w-full bg-slate-100 h-2 rounded-full"><div className="bg-slate-600 h-2 rounded-full" style={{width: "25%"}}></div></div>
                  </div>
               </div>
            </CardContent>
         </Card>

         <Card className="bg-slate-900 text-white">
            <CardContent className="p-6 flex flex-col justify-between h-full">
               <div>
                  <h3 className="font-bold text-lg mb-2">Rentabilité Nette</h3>
                  <p className="text-slate-400 text-sm">Après déduction de toutes les charges.</p>
               </div>
               <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2"><span className="text-slate-400">Entrées</span><span className="text-green-400">+ 1.45M</span></div>
                  <div className="flex justify-between text-sm mb-4"><span className="text-slate-400">Sorties</span><span className="text-red-400">- 374k</span></div>
                  <div className="pt-4 border-t border-slate-700">
                     <span className="text-3xl font-bold">1.07M</span>
                     <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded ml-2">+12%</span>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>

      {/* LISTE DÉTAILLÉE */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
         <div className="p-4 border-b border-slate-100 flex gap-4">
            <div className="relative flex-1">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
               <Input placeholder="Rechercher une facture, un fournisseur..." className="pl-10" />
            </div>
            <Button variant="outline"><Filter size={16} className="mr-2"/> Filtrer</Button>
         </div>
         
         <div className="divide-y divide-slate-100">
            {expenses.map((exp) => {
               let Icon = FileText;
               if (exp.category === "Maintenance") Icon = Wrench;
               if (exp.category === "Énergie") Icon = Zap;
               if (exp.category === "Eau") Icon = Droplets;

               return (
                  <div key={exp.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                     <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                           <Icon size={18} />
                        </div>
                        <div>
                           <p className="font-bold text-slate-900 text-sm">{exp.title}</p>
                           <p className="text-xs text-slate-500">{exp.property} • {exp.provider}</p>
                        </div>
                     </div>
                     <div className="text-right flex flex-col items-end gap-1">
                        <span className="font-bold text-slate-900">- {formatCurrency(exp.amount)}</span>
                        {exp.recoverable && (
                           <Badge variant="secondary" className="text-[10px] bg-blue-50 text-blue-700">Récupérable</Badge>
                        )}
                     </div>
                  </div>
               );
            })}
         </div>
      </div>

      {/* MODALE AJOUT DÉPENSE */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Nouvelle Dépense">
         <form className="space-y-4">
            <div>
               <label className="text-sm font-medium">Intitulé</label>
               <Input placeholder="Ex: Réparation Serrure" />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div><label className="text-sm font-medium">Montant</label><Input type="number" placeholder="0" /></div>
               <div><label className="text-sm font-medium">Date</label><Input type="date" /></div>
            </div>
            <div>
               <label className="text-sm font-medium">Bien concerné</label>
               <select className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm"><option>Appartement T3</option><option>Villa Corniche</option></select>
            </div>
            <div>
               <label className="text-sm font-medium">Catégorie</label>
               <select className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm">
                  <option>Maintenance</option>
                  <option>Impôts & Taxes</option>
                  <option>Énergie / Eau</option>
                  <option>Frais de gestion</option>
                  <option>Remboursement Emprunt</option>
               </select>
            </div>
            <div className="flex items-center gap-2 mt-2">
               <input type="checkbox" id="recov" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
               <label htmlFor="recov" className="text-sm text-slate-700">Charge récupérable sur le locataire ?</label>
            </div>
            <div className="pt-4 flex justify-end gap-2 border-t border-slate-100 mt-4">
               <Button variant="outline" onClick={() => setIsModalOpen(false)}>Annuler</Button>
               <Button className="bg-red-600 hover:bg-red-700 text-white">Enregistrer</Button>
            </div>
         </form>
      </Modal>

    </div>
  );
}