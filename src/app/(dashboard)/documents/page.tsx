"use client";
import React, { useState } from "react";
import { FileText, Download, Upload, Search, Plus, FileCheck, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";

const templates = [
  { id: 1, name: "Contrat de Bail Résidentiel", type: "Contrat", updated: "10 Nov 2024" },
  { id: 2, name: "Quittance de Loyer", type: "Finance", updated: "01 Jan 2024" },
  { id: 3, name: "État des Lieux Entrée", type: "Technique", updated: "15 Oct 2024" },
  { id: 4, name: "Lettre de Relance (Mise en demeure)", type: "Juridique", updated: "20 Sep 2024" },
];

const recentDocs = [
  { id: 101, name: "Bail - Moussa Diop.pdf", relatedTo: "Apt T3", date: "Aujourd'hui", size: "1.2 Mo" },
  { id: 102, name: "Quittance Nov - Fatou Sow.pdf", relatedTo: "Villa Corniche", date: "Hier", size: "0.4 Mo" },
];

export default function DocumentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Documents & Modèles</h1>
           <p className="text-slate-500">Gérez vos modèles juridiques et vos archives.</p>
        </div>
        <Button className="bg-blue-600 text-white" onClick={() => setIsModalOpen(true)}>
           <Upload size={18} className="mr-2"/> Nouveau Modèle
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* GAUCHE : Bibliothèque de Modèles */}
         <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
               <h3 className="font-bold text-slate-800 text-lg">Modèles Disponibles (Templates)</h3>
               <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <Input placeholder="Rechercher un modèle..." className="pl-9 h-9" />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {templates.map((tpl) => (
                  <Card key={tpl.id} className="group hover:border-blue-300 cursor-pointer transition-all">
                     <CardContent className="p-4 flex items-start gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                           <FileText size={24} />
                        </div>
                        <div className="flex-1">
                           <h4 className="font-bold text-slate-900 text-sm mb-1">{tpl.name}</h4>
                           <div className="flex justify-between items-center">
                              <Badge variant="secondary" className="text-[10px]">{tpl.type}</Badge>
                              <span className="text-[10px] text-slate-400">{tpl.updated}</span>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               ))}
               
               {/* Carte Ajouter */}
               <div onClick={() => setIsModalOpen(true)} className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer transition-all p-6 h-full">
                  <Plus size={24} className="mb-2"/>
                  <span className="text-sm font-medium">Ajouter un modèle</span>
               </div>
            </div>
         </div>

         {/* DROITE : Derniers fichiers générés */}
         <Card className="h-full bg-slate-50/50 border-slate-200">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
               <h3 className="font-bold text-slate-800">Récents</h3>
               <Button variant="ghost" size="sm" className="text-xs">Voir tout</Button>
            </div>
            <div className="p-2 space-y-1">
               {recentDocs.map((doc) => (
                  <div key={doc.id} className="p-3 hover:bg-white rounded-lg flex justify-between items-center group transition-colors">
                     <div className="flex items-center gap-3 overflow-hidden">
                        <div className="bg-white border border-slate-200 p-2 rounded text-red-500"><FileCheck size={16}/></div>
                        <div className="min-w-0">
                           <p className="text-sm font-medium text-slate-700 truncate">{doc.name}</p>
                           <p className="text-xs text-slate-400">{doc.relatedTo} • {doc.date}</p>
                        </div>
                     </div>
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600">
                        <Download size={16}/>
                     </Button>
                  </div>
               ))}
            </div>
         </Card>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Importer un modèle">
         <div className="space-y-4">
            <div className="border-2 border-dashed border-blue-200 bg-blue-50 rounded-xl p-8 text-center text-blue-600 cursor-pointer hover:bg-blue-100 transition-colors">
               <Upload size={32} className="mx-auto mb-2"/>
               <p className="font-medium">Cliquez pour uploader (Word/PDF)</p>
               <p className="text-xs opacity-70">Max 5 Mo</p>
            </div>
            <div>
               <label className="text-sm font-medium">Nom du modèle</label>
               <Input placeholder="Ex: Contrat Habitation 2025" />
            </div>
            <div>
               <label className="text-sm font-medium">Catégorie</label>
               <select className="w-full h-10 rounded-lg border border-slate-200 px-3 text-sm"><option>Juridique</option><option>Finance</option></select>
            </div>
            <div className="flex justify-end pt-4">
               <Button className="bg-blue-600 text-white">Sauvegarder</Button>
            </div>
         </div>
      </Modal>
    </div>
  );
}