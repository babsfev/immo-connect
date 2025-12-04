"use client";
import React from "react";
import { 
  Search, Filter, Plus, Phone, Calendar, FileText, 
  Check, X, User, Briefcase, MoreHorizontal 
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import { formatCurrency } from "@/lib/utils";

// Mock Data : Le Pipeline
const columns = [
  {
    id: "new",
    title: "Nouveaux Contacts",
    color: "border-l-4 border-blue-500",
    candidates: [
      { id: 1, name: "Aminata Fall", job: "Commerçante", income: 800000, property: "Appartement T3", date: "Auj. 10:00", score: 65, docs: undefined },
      { id: 2, name: "Paul Mendy", job: "Enseignant", income: 450000, property: "Studio Almadies", date: "Hier", score: 80, docs: undefined },
    ]
  },
  {
    id: "visit",
    title: "Visites Programmées",
    color: "border-l-4 border-orange-500",
    candidates: [
      { id: 3, name: "Couple Diop", job: "Fonctionnaires", income: 1200000, property: "Villa Corniche", date: "Demain 15h00", score: 95, visitConfirmed: true, docs: undefined },
    ]
  },
  {
    id: "review",
    title: "Dossiers à Analyser",
    color: "border-l-4 border-purple-500",
    candidates: [
      { id: 4, name: "Jean-Marc Ndiaye", job: "Consultant", income: 2000000, property: "Villa Corniche", date: "Dossier complet", score: 90, docs: 4 },
    ]
  }
];

export default function ApplicationsPage() {
  return (
    <div className="space-y-6 pb-10 h-[calc(100vh-100px)] flex flex-col">
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Candidatures</h1>
           <p className="text-slate-500">Gérez vos prospects de la prise de contact à la signature.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
           <Plus size={18} className="mr-2"/> Ajouter un prospect
        </Button>
      </div>

      {/* FILTRES */}
      <div className="flex gap-4 bg-white p-2 rounded-xl border border-slate-100 shadow-sm">
         <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input placeholder="Rechercher par nom ou bien..." className="pl-10 border-none bg-transparent focus:ring-0" />
         </div>
         <div className="w-px bg-slate-200 my-1"></div>
         <Button variant="ghost" className="text-slate-600"><Filter size={16} className="mr-2"/> Filtrer par bien</Button>
      </div>

      {/* KANBAN BOARD */}
      <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
         {columns.map((col) => (
            <div key={col.id} className="flex-1 min-w-[320px] flex flex-col gap-4">
               
               {/* Colonne Header */}
               <div className="flex justify-between items-center font-bold text-slate-700 px-1">
                  <div className="flex items-center gap-2">
                     <div className={`w-3 h-3 rounded-full ${col.id === "new" ? "bg-blue-500" : col.id === "visit" ? "bg-orange-500" : "bg-purple-500"}`}></div>
                     {col.title}
                  </div>
                  <Badge variant="secondary" className="bg-slate-100 text-slate-600">{col.candidates.length}</Badge>
               </div>
               
               {/* Liste des cartes */}
               <div className="flex-1 space-y-3">
                  {col.candidates.map((candidate) => (
                     <Card key={candidate.id} className={`cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 border-l-4 border-t-0 border-r-0 border-b-0 ${col.color}`}>
                        <CardContent className="p-4">
                           
                           {/* Header Carte */}
                           <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center gap-3">
                                 <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold text-sm">
                                    {candidate.name.charAt(0)}
                                 </div>
                                 <div>
                                    <h4 className="font-bold text-slate-900 text-sm">{candidate.name}</h4>
                                    <p className="text-xs text-slate-500 flex items-center gap-1">
                                       <Briefcase size={10}/> {candidate.job}
                                    </p>
                                 </div>
                              </div>
                              <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={16}/></button>
                           </div>

                           {/* Info Bien */}
                           <div className="bg-slate-50 p-2 rounded-lg mb-3 border border-slate-100">
                              <p className="text-xs text-slate-500 mb-1">Intéressé par</p>
                              <div className="flex justify-between items-center">
                                 <span className="text-xs font-semibold text-blue-700 truncate max-w-[120px]">{candidate.property}</span>
                                 <span className="text-xs font-bold text-slate-700">{formatCurrency(candidate.income)}/mois</span>
                              </div>
                           </div>

                           {/* Footer Actions */}
                           <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                              <div className="flex gap-2">
                                 <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Appeler">
                                    <Phone size={14}/>
                                 </button>
                                 <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Planifier">
                                    <Calendar size={14}/>
                                 </button>
                                 {candidate.docs && (
                                    <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors flex items-center gap-1" title="Dossier">
                                       <FileText size={14}/> <span className="text-[10px] font-bold">{candidate.docs}</span>
                                    </button>
                                 )}
                              </div>
                              
                              {/* Score Solvabilité */}
                              <div className={`text-xs font-bold px-2 py-1 rounded flex items-center gap-1 ${
                                 candidate.score >= 80 ? "bg-green-50 text-green-700" : 
                                 candidate.score >= 60 ? "bg-orange-50 text-orange-700" : "bg-red-50 text-red-700"
                              }`}>
                                 {candidate.score}% Match
                              </div>
                           </div>

                           {/* Boutons Décision (Uniquement pour dossier complet) */}
                           {col.id === "review" && (
                              <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100">
                                 <Button size="sm" variant="outline" className="w-1/2 text-red-600 hover:bg-red-50 border-red-100 h-7 text-xs">
                                    <X size={14} className="mr-1"/> Refuser
                                 </Button>
                                 <Button size="sm" className="w-1/2 bg-green-600 hover:bg-green-700 text-white h-7 text-xs border-none">
                                    <Check size={14} className="mr-1"/> Accepter
                                 </Button>
                              </div>
                           )}

                        </CardContent>
                     </Card>
                  ))}
               </div>
               
               <button className="w-full py-3 text-sm font-medium text-slate-400 hover:text-slate-600 border-2 border-dashed border-slate-200 rounded-xl hover:border-slate-300 transition-all">
                  + Ajouter un prospect
               </button>
            </div>
         ))}
      </div>
    </div>
  );
}