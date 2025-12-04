"use client";
import React from "react";
import { Users, Search, Plus, Briefcase, Percent } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import { formatCurrency } from "@/lib/utils";

const landlords = [
  { id: 1, name: "Héritiers Famille Ndiaye", type: "Indivision", properties: 4, commission: "7%", balance: 2500000, status: "Actif" },
  { id: 2, name: "M. Patrick Martin", type: "Investisseur", properties: 12, commission: "6%", balance: 8400000, status: "Actif" },
  { id: 3, name: "Sci Les Almadies", type: "Société", properties: 1, commission: "8%", balance: 0, status: "Inactif" },
];

export default function LandlordsPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Propriétaires (Mandants)</h1>
           <p className="text-slate-500">Gestion des comptes propriétaires et des reversements.</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white"><Plus size={18} className="mr-2"/> Nouveau Mandat</Button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex gap-4">
         <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input placeholder="Rechercher un propriétaire..." className="pl-10" />
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {landlords.map((landlord) => (
            <Card key={landlord.id} className="group hover:border-blue-300 transition-all">
               <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                     <div className="flex items-center gap-3">
                        <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold">
                           {landlord.name.charAt(0)}
                        </div>
                        <div>
                           <h3 className="font-bold text-slate-900 truncate w-32">{landlord.name}</h3>
                           <Badge variant="secondary" className="text-[10px]">{landlord.type}</Badge>
                        </div>
                     </div>
                     <Badge variant={landlord.status === "Actif" ? "success" : "default"}>{landlord.status}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-slate-100 mb-4">
                     <div>
                        <p className="text-xs text-slate-500 flex items-center gap-1"><Briefcase size={12}/> Biens</p>
                        <p className="font-semibold text-slate-900">{landlord.properties}</p>
                     </div>
                     <div>
                        <p className="text-xs text-slate-500 flex items-center gap-1"><Percent size={12}/> Commission</p>
                        <p className="font-semibold text-blue-600">{landlord.commission}</p>
                     </div>
                  </div>

                  <div className="flex justify-between items-center">
                     <div>
                        <p className="text-xs text-slate-500">Solde à reverser</p>
                        <p className="font-bold text-slate-900">{formatCurrency(landlord.balance)}</p>
                     </div>
                     <Button variant="outline" size="sm">Gérer</Button>
                  </div>
               </CardContent>
            </Card>
         ))}
      </div>
    </div>
  );
}