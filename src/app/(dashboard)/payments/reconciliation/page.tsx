"use client";
import React from "react";
import { ArrowRightLeft, Check, X, UploadCloud } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";

export default function ReconciliationPage() {
  return (
    <div className="space-y-6 pb-10 h-[calc(100vh-100px)] flex flex-col">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Réconciliation Bancaire</h1>
           <p className="text-slate-500">Associez les virements reçus aux loyers en attente.</p>
        </div>
        <Button variant="outline"><UploadCloud size={18} className="mr-2"/> Importer Relevé (OFX/CSV)</Button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden">
         
         {/* GAUCHE : Relevé Bancaire */}
         <Card className="flex flex-col h-full bg-slate-50/50">
            <div className="p-4 border-b border-slate-100 font-semibold text-slate-700">Relevé Bancaire (Non lettré)</div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
               <div className="p-4 bg-white border border-blue-200 shadow-sm rounded-lg cursor-pointer ring-2 ring-blue-500">
                  <div className="flex justify-between mb-1">
                     <span className="font-mono text-xs text-slate-500">21/11/2024</span>
                     <span className="font-bold text-green-600">+ 450 000 FCFA</span>
                  </div>
                  <p className="text-sm font-medium text-slate-900">VIR M. MOUSSA DIOP LOYER NOV</p>
                  <Badge variant="warning" className="mt-2">À traiter</Badge>
               </div>
               {/* Autre ligne */}
               <div className="p-4 bg-white border border-slate-200 rounded-lg opacity-60">
                  <div className="flex justify-between mb-1">
                     <span className="font-mono text-xs text-slate-500">20/11/2024</span>
                     <span className="font-bold text-slate-900">- 12 000 FCFA</span>
                  </div>
                  <p className="text-sm font-medium text-slate-900">FRAIS BANCAIRES</p>
               </div>
            </div>
         </Card>

         {/* DROITE : Suggestion IA */}
         <Card className="flex flex-col h-full border-blue-100 bg-blue-50/30">
            <div className="p-4 border-b border-blue-100 font-semibold text-blue-800 flex items-center gap-2">
               <SparklesIcon /> Suggestion Intelligente
            </div>
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                  <ArrowRightLeft size={32} />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-2">Correspondance trouvée !</h3>
               <p className="text-slate-500 mb-6 max-w-xs">
                  Le montant et le libellé correspondent au loyer de <strong>Moussa Diop</strong> (Apt T3).
               </p>
               
               <div className="bg-white p-4 rounded-xl border border-slate-200 w-full max-w-sm mb-6">
                  <div className="flex justify-between text-sm mb-2">
                     <span className="text-slate-500">Locataire</span>
                     <span className="font-semibold">Moussa Diop</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                     <span className="text-slate-500">Bien</span>
                     <span className="font-semibold">Apt T3 - Centre</span>
                  </div>
                  <div className="flex justify-between text-sm border-t pt-2 mt-2">
                     <span className="text-slate-500">Montant Loyer</span>
                     <span className="font-bold text-slate-900">450 000 FCFA</span>
                  </div>
               </div>

               <div className="flex gap-4">
                  <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 px-8"><X className="mr-2"/> Ignorer</Button>
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-8"><Check className="mr-2"/> Valider</Button>
               </div>
            </div>
         </Card>

      </div>
    </div>
  );
}

function SparklesIcon() { // Petite icone locale pour l'exemple
  return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>;
}