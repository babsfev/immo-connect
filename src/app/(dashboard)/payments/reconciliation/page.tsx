"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRightLeft, Check, X, UploadCloud, Sparkles, FileText } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

export default function ReconciliationPage() {
  const [selectedTx, setSelectedTx] = useState<number | null>(1);
  const [isImporting, setIsImporting] = useState(false);

  const handleImport = () => {
    setIsImporting(true);
    setTimeout(() => {
      setIsImporting(false);
      toast.success("Relevé importé", { description: "35 transactions analysées." });
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-10 h-[calc(100vh-100px)] flex flex-col animate-in slide-in-from-bottom-4 duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
           <Link href="/payments">
              <Button variant="ghost" size="icon"><ArrowLeft size={20}/></Button>
           </Link>
           <div>
              <h1 className="text-2xl font-bold text-slate-900">Réconciliation Bancaire</h1>
              <p className="text-slate-500">Lettrage automatique des virements.</p>
           </div>
        </div>
        <Button 
           variant="outline" 
           className="bg-white hover:bg-slate-50"
           onClick={handleImport}
           isLoading={isImporting}
        >
           <UploadCloud size={18} className="mr-2"/> Importer Relevé (OFX/CSV)
        </Button>
      </div>

      {/* SPLIT SCREEN - Correction hauteur : min-h-[500px] */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden min-h-[500px]">
         
         {/* GAUCHE : RELEVÉ */}
         <Card className="flex flex-col h-full bg-slate-50 border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-200 font-bold text-slate-700 bg-white flex justify-between shrink-0">
               <span>Relevé Bancaire (Novembre)</span>
               <Badge variant="warning">2 à traiter</Badge>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
               
               <div 
                  onClick={() => setSelectedTx(1)}
                  className={`p-4 bg-white border rounded-xl cursor-pointer transition-all shadow-sm ${selectedTx === 1 ? "border-blue-500 ring-2 ring-blue-100" : "border-slate-200 hover:border-blue-300"}`}
               >
                  <div className="flex justify-between mb-1">
                     <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">21/11</span>
                     <span className="font-bold text-green-600">+ 450 000 FCFA</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">VIR M. MOUSSA DIOP LOYER NOV</p>
                  <p className="text-xs text-slate-400 mt-1">REF: 0988766554</p>
               </div>

               <div 
                  onClick={() => setSelectedTx(2)}
                  className={`p-4 bg-white border rounded-xl cursor-pointer transition-all shadow-sm ${selectedTx === 2 ? "border-blue-500 ring-2 ring-blue-100" : "border-slate-200 hover:border-blue-300"}`}
               >
                  <div className="flex justify-between mb-1">
                     <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">20/11</span>
                     <span className="font-bold text-slate-900">- 12 000 FCFA</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">FRAIS TENUE DE COMPTE</p>
               </div>

            </div>
         </Card>

         {/* DROITE : IA MATCHING (Correction Flex) */}
         <Card className="flex flex-col h-full border-blue-100 bg-linear-to-b from-blue-50/50 to-white relative overflow-hidden shadow-sm">
            <div className="p-4 border-b border-blue-100 font-bold text-blue-800 flex items-center gap-2 bg-white/50 backdrop-blur shrink-0">
               <Sparkles size={18} className="text-orange-500" /> Analyse Intelligente
            </div>
            
            {/* Correction : Utilisation de flex-1 et justify-center pour centrer verticalement */}
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center relative z-10 overflow-y-auto">
               {selectedTx === 1 ? (
                  <div className="w-full max-w-sm animate-in zoom-in duration-300">
                     <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-green-500 mb-4 shadow-lg mx-auto border border-green-50">
                        <ArrowRightLeft size={32} />
                     </div>
                     
                     <h3 className="text-xl font-extrabold text-slate-900 mb-2">Correspondance trouvée !</h3>
                     <Badge className="bg-green-100 text-green-700 border-none mb-6 px-3 py-1 mx-auto">Confiance IA : 98%</Badge>
                     
                     <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 text-left mb-8 w-full">
                        <div className="flex justify-between text-sm mb-3 pb-3 border-b border-slate-50">
                           <span className="text-slate-500">Locataire détecté</span>
                           <span className="font-bold text-slate-900">Moussa Diop</span>
                        </div>
                        <div className="flex justify-between text-sm mb-3">
                           <span className="text-slate-500">Bien concerné</span>
                           <span className="font-medium text-slate-700">Apt T3 - Centre</span>
                        </div>
                        <div className="flex justify-between text-sm pt-2 bg-blue-50/50 p-2 rounded-lg">
                           <span className="text-blue-600 font-medium">Montant Attendu</span>
                           <span className="font-bold text-blue-700">450 000 FCFA</span>
                        </div>
                     </div>

                     <div className="flex gap-3 w-full">
                        <Button variant="outline" className="flex-1 border-red-200 text-red-600 hover:bg-red-50 h-11">
                           <X className="mr-2"/> Ignorer
                        </Button>
                        <Button 
                           className="flex-1 bg-green-600 hover:bg-green-700 text-white h-11 shadow-lg shadow-green-200"
                           onClick={() => toast.success("Transaction lettrée !", { description: "Le statut du loyer est passé à PAYÉ." })}
                        >
                           <Check className="mr-2"/> Valider
                        </Button>
                     </div>
                  </div>
               ) : (
                  <div className="text-slate-400 flex flex-col items-center">
                     <FileText size={48} className="mb-4 opacity-50"/>
                     <p>Sélectionnez une transaction pour l'analyser.</p>
                  </div>
               )}
            </div>
         </Card>

      </div>
    </div>
  );
}