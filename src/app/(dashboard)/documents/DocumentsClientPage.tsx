"use client";

import React, { useState } from "react";
import {
  FileText, Download, Upload, Search, Plus, 
  FileCheck, FileSignature, FolderOpen, Trash2
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/form/Input";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { ImageUpload } from "@/components/ui/form/ImageUpload"; // Pour l'upload
import { toast } from "sonner";

// On passera les documents réels en props depuis le Server Component parent
// Mais pour simplifier l'architecture "Client" ici, on va supposer que la page est un Server Component
// qui appelle un Client Component "DocumentsManager".

// MODELES STATIQUES (Ceux-là restent statiques car ce sont des modèles système)
const templates = [
  { id: 1, name: "Contrat de Bail Résidentiel", type: "Juridique", icon: FileSignature, color: "bg-purple-100 text-purple-600" },
  { id: 2, name: "Quittance de Loyer", type: "Finance", icon: FileCheck, color: "bg-green-100 text-green-600" },
  { id: 3, name: "État des Lieux Entrée", type: "Technique", icon: FileText, color: "bg-blue-100 text-blue-600" },
  { id: 4, name: "Lettre de Relance", type: "Juridique", icon: FileText, color: "bg-orange-100 text-orange-600" },
];

export default function DocumentsPage({ recentDocs }: { recentDocs: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const filteredTemplates = templates.filter(t => t.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Documents & Modèles</h1>
          <p className="text-slate-500">Générez vos contrats et archivez vos preuves.</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 text-white shadow-lg hover:bg-slate-800"
        >
          <Plus size={18} className="mr-2" /> Importer un modèle
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* GAUCHE : Modèles (Grid) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
             <div className="pl-3 text-slate-400"><Search size={18}/></div>
             <Input 
                placeholder="Rechercher un modèle..." 
                className="flex-1 h-10 bg-transparent outline-none text-sm border-none shadow-none focus:ring-0"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
             />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredTemplates.map((tpl) => (
              <Card key={tpl.id} hoverEffect className="group cursor-pointer border-slate-200 hover:border-blue-300">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${tpl.color} group-hover:scale-110 transition-transform`}>
                    <tpl.icon size={24} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 text-sm mb-1 truncate group-hover:text-blue-600 transition-colors">
                      {tpl.name}
                    </h4>
                    <div className="flex items-center gap-2">
                       <Badge variant="secondary" className="text-[10px] px-1.5">{tpl.type}</Badge>
                       <span className="text-[10px] text-slate-400">Système</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-6 text-slate-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/50 transition-all h-full min-h-[120px] group"
            >
               <div className="p-2 bg-slate-50 rounded-full mb-2 group-hover:bg-white"><Upload size={20}/></div>
               <span className="text-sm font-medium">Importer un fichier</span>
            </button>
          </div>
        </div>

        {/* DROITE : Récents (Connecté BDD) */}
        <Card className="h-full border-slate-200 bg-slate-50/50 flex flex-col">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <FolderOpen size={18} className="text-slate-400"/> Récents
            </h3>
          </div>
          <div className="p-3 space-y-1 flex-1 overflow-y-auto max-h-[500px]">
            {recentDocs.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-xs">Aucun document archivé.</div>
            ) : (
                recentDocs.map((doc) => (
                <div key={doc.id} className="p-3 hover:bg-white rounded-xl border border-transparent hover:border-slate-100 hover:shadow-sm flex justify-between items-center group transition-all cursor-pointer">
                    <div className="flex items-center gap-3 overflow-hidden">
                    <div className="bg-white border border-slate-200 p-2 rounded-lg text-blue-500 shrink-0">
                        <FileText size={16} />
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-700 truncate group-hover:text-blue-600 transition-colors">{doc.name}</p>
                        <p className="text-[10px] text-slate-400 flex items-center gap-1 truncate">
                        {doc.property?.title || "Général"} • {new Date(doc.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <a href={doc.url} target="_blank" rel="noreferrer">
                    <Button variant="ghost" size="icon" className="text-slate-300 hover:text-slate-600">
                        <Download size={16} />
                    </Button>
                </a>
                </div>
                ))
            )}
          </div>
        </Card>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Importer un document">
        <div className="space-y-4">
            {/* Ici on utiliserait un vrai formulaire d'upload connecté à une Server Action */}
            <div className="p-8 border-2 border-dashed border-slate-200 rounded-xl text-center">
                <p className="text-sm text-slate-500">Fonctionnalité d'upload direct disponible en V2.</p>
            </div>
            <div className="flex justify-end">
                <Button onClick={() => setIsModalOpen(false)}>Fermer</Button>
            </div>
        </div>
      </Modal>
    </div>
  );
}