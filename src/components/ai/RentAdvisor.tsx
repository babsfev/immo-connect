"use client"; // Nécessaire pour l'interaction

import React from "react";
import { Sparkles, TrendingUp } from "lucide-react";
import Button from "@/components/ui/Button";
import { toast } from "sonner";

export function RentAdvisor() {
  // Simule une analyse IA quand on clique
  const handleAnalyze = () => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: 'L\'IA analyse le marché local...',
      success: 'Analyse terminée ! Le loyer peut être augmenté de 8%.',
      error: 'Erreur connexion IA',
    });
  };

  return (
    <div className="h-full rounded-2xl bg-linear-to-br from-slate-900 via-slate-800 to-blue-900 p-6 text-white shadow-xl relative overflow-hidden flex flex-col justify-between group">
      
      {/* Effets de fond animés */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 rounded-full blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500 rounded-full blur-[60px] opacity-10"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 text-orange-400 mb-3">
          <Sparkles size={20} className="animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider">Immo-IA</span>
        </div>
        
        <h3 className="font-bold text-xl mb-2 leading-tight">
          Opportunité détectée.
        </h3>
        <p className="text-blue-100 text-sm leading-relaxed opacity-90">
          Le loyer de <strong className="text-white">"Villa Corniche"</strong> est 12% inférieur au marché actuel des Almadies.
        </p>
      </div>

      <div className="relative z-10 mt-6">
        <Button 
          onClick={handleAnalyze}
          className="w-full bg-white text-slate-900 hover:bg-blue-50 border-none font-semibold shadow-lg transition-transform hover:-translate-y-0.5"
        >
          <TrendingUp size={16} className="mr-2 text-blue-600" />
          Optimiser mes revenus
        </Button>
        <p className="text-[10px] text-center text-slate-500 mt-3">Basé sur 145 annonces similaires.</p>
      </div>
    </div>
  );
}