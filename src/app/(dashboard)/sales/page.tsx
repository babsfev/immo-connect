"use client";
import React from "react";
import { FileCheck, Gavel, Handshake, Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";

const deals = [
  { id: 1, property: "Terrain Diamniadio", client: "M. Fall", price: 15000000, step: "Notaire", date: "Signé le 15 Nov" },
  { id: 2, property: "Villa Saly", client: "Mme. Diop", price: 85000000, step: "Offre", date: "Reçue hier" },
];

export default function SalesPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Transactions & Ventes</h1>
           <p className="text-slate-500">Suivi des ventes de terrains et immeubles.</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white"><Plus size={18} className="mr-2"/> Nouvelle Vente</Button>
      </div>

      {/* Pipeline Visuel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         
         {/* COLONNE 1 : OFFRES */}
         <div className="space-y-4">
            <div className="flex items-center justify-between text-sm font-bold text-slate-500 uppercase">
               <span>Offres & Négos</span> <Badge variant="secondary">1</Badge>
            </div>
            {deals.filter(d => d.step === "Offre").map(deal => (
               <Card key={deal.id} className="border-l-4 border-orange-400 p-4 cursor-pointer hover:shadow-md">
                  <div className="flex justify-between mb-2"><Badge variant="warning">Offre reçue</Badge><span className="text-xs text-slate-400">{deal.date}</span></div>
                  <h3 className="font-bold text-slate-900">{deal.property}</h3>
                  <p className="text-sm text-slate-500 mb-3">Client : {deal.client}</p>
                  <p className="font-bold text-blue-600">{formatCurrency(deal.price)}</p>
                  <div className="mt-3 pt-3 border-t border-slate-100 flex gap-2">
                     <Button size="sm" variant="outline" className="w-full h-7 text-xs">Refuser</Button>
                     <Button size="sm" className="w-full h-7 text-xs bg-green-600 text-white">Accepter</Button>
                  </div>
               </Card>
            ))}
         </div>

         {/* COLONNE 2 : NOTAIRE */}
         <div className="space-y-4">
            <div className="flex items-center justify-between text-sm font-bold text-slate-500 uppercase">
               <span>Chez le Notaire</span> <Badge variant="secondary">1</Badge>
            </div>
            {deals.filter(d => d.step === "Notaire").map(deal => (
               <Card key={deal.id} className="border-l-4 border-blue-500 p-4 cursor-pointer hover:shadow-md">
                  <div className="flex justify-between mb-2"><Badge className="bg-blue-100 text-blue-700 border-none"><Gavel size={12} className="mr-1"/> En cours</Badge></div>
                  <h3 className="font-bold text-slate-900">{deal.property}</h3>
                  <p className="text-sm text-slate-500 mb-3">Client : {deal.client}</p>
                  <p className="font-bold text-slate-900">{formatCurrency(deal.price)}</p>
                  <div className="mt-3 pt-3 border-t border-slate-100">
                     <p className="text-xs text-slate-400 italic">En attente acte de vente...</p>
                  </div>
               </Card>
            ))}
         </div>

         {/* COLONNE 3 : VENDU */}
         <div className="space-y-4">
            <div className="flex items-center justify-between text-sm font-bold text-slate-500 uppercase">
               <span>Acté / Vendu</span> <Badge variant="secondary">0</Badge>
            </div>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center text-slate-400 text-sm">
               Aucune vente finalisée ce mois-ci.
            </div>
         </div>

      </div>
    </div>
  );
}