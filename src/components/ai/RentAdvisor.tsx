"use client"; 

import React from "react";
import { Sparkles, Lock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function RentAdvisor() {
  return (
    <div className="h-full rounded-2xl bg-slate-900 p-6 text-white shadow-xl relative overflow-hidden flex flex-col justify-center items-center text-center group border border-slate-800">
      
      {/* Fond animé discret */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-600 rounded-full blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity"></div>

      <div className="relative z-10">
        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-white/10 text-purple-300">
           <Sparkles size={24} />
        </div>

        <h3 className="font-bold text-lg mb-2 text-white">
          Immo-Intelligence
        </h3>
        
        <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-[200px] mx-auto">
          Notre IA d'estimation des loyers est en cours d'entraînement sur le marché de Dakar.
        </p>

        <Badge className="bg-purple-500/20 text-purple-200 border-purple-500/30 px-3 py-1">
           <Lock size={10} className="mr-1.5"/> Bientôt disponible
        </Badge>
      </div>
    </div>
  );
}