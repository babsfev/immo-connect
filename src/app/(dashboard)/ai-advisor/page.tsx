"use client";

import React from "react";
import { Sparkles, Send, Bot, TrendingUp, AlertTriangle, ThumbsUp, ThumbsDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Input from "@/components/ui/Input";

export default function AIAdvisorPage() {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-6">
      
      {/* COLONNE GAUCHE : INSIGHTS */}
      <div className="lg:w-1/2 flex flex-col gap-4 overflow-y-auto pr-2">
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="text-orange-500" /> Conseiller Immo-IA
          </h1>
          <p className="text-slate-500">Analyses proactives de votre parc immobilier.</p>
        </div>

        <Card className="bg-blue-50/50 border-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base text-blue-800">
              <TrendingUp size={18} /> Opportunité de Rentabilité
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-700 mb-4">
              Le marché aux <strong>Almadies</strong> a pris +8%. Votre loyer actuel est sous-évalué.
            </p>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 border-none text-white">
              Voir l'analyse
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-orange-50/50 border-orange-100">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base text-orange-800">
              <AlertTriangle size={18} /> Alerte Maintenance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-orange-700 mb-4">
              3 incidents "Fuite d'eau" à la Villa Corniche. Inspection recommandée.
            </p>
            <Button size="sm" className="bg-white text-orange-700 border border-orange-200 hover:bg-orange-100">
              Planifier
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* COLONNE DROITE : CHAT */}
      <div className="lg:w-1/2 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden h-[600px] lg:h-auto">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-md">
              <Sparkles size={14} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Assistant Virtuel</p>
              <div className="flex items-center gap-2">
                 <Badge variant="success" className="px-1.5 py-0 h-4 text-[10px]">En ligne</Badge>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm">Effacer</Button>
        </div>

        <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-slate-50/30">
          {/* Bot Msg */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 shrink-0 flex items-center justify-center text-blue-600 mt-1"><Bot size={16} /></div>
            <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-slate-600 max-w-[85%]">
              <p>Bonjour ! Je peux vous aider à rédiger des contrats ou analyser vos dépenses.</p>
            </div>
          </div>

          {/* User Msg */}
          <div className="flex gap-3 flex-row-reverse">
            <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0 flex items-center justify-center text-slate-600 mt-1 font-bold text-xs">JD</div>
            <div className="bg-blue-600 p-3 rounded-2xl rounded-tr-none shadow-md text-sm text-white max-w-[85%]">
              <p>Rédige un rappel pour M. Diop (retard 5 jours).</p>
            </div>
          </div>

          {/* Bot Response */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 shrink-0 flex items-center justify-center text-blue-600 mt-1"><Bot size={16} /></div>
            <div className="space-y-2 max-w-[85%]">
               <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-slate-600">
                 <p className="mb-2">Voici une proposition :</p>
                 <div className="bg-slate-50 p-3 rounded border border-slate-200 italic mb-2">"Bonjour M. Diop, sauf erreur, nous attendons votre loyer de Novembre."</div>
                 <div className="flex gap-2">
                    <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-green-600"><ThumbsUp size={12}/> Bien</button>
                    <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-600"><ThumbsDown size={12}/> Trop sec</button>
                 </div>
               </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 bg-white">
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input placeholder="Posez une question..." className="flex-1" />
            <Button type="submit" size="icon" className="bg-orange-500 hover:bg-orange-600 text-white shrink-0">
              <Send size={18} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}