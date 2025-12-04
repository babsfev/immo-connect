import React from "react";
import { Sparkles, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export function RentAdvisor() {
  return (
    // CORRECTION ICI : bg-linear-to-br au lieu de bg-gradient-to-br
    <div className="rounded-xl bg-linear-to-br from-blue-600 to-blue-800 p-5 text-white shadow-lg relative overflow-hidden h-full flex flex-col justify-between">
      {/* Décoration de fond */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl pointer-events-none"></div>
      
      <div>
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
          <Sparkles size={18} className="text-orange-400" />
          Immo-IA
          <span className="bg-orange-500 text-[10px] px-1.5 py-0.5 rounded text-white font-bold tracking-wider">BETA</span>
        </h3>
        <p className="text-blue-100 text-sm mb-4 leading-relaxed">
          Analyse terminée : Le loyer de "Villa Corniche" est <strong>12% inférieur</strong> au marché actuel des Almadies.
        </p>
      </div>

      <Button size="sm" className="w-full bg-white text-blue-700 hover:bg-blue-50 border-none font-semibold">
        <TrendingUp size={16} className="mr-2" />
        Voir l'optimisation
      </Button>
    </div>
  );
}