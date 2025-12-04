"use client";

import React from "react";
import { formatCurrency } from "@/lib/utils";

interface ChartData {
  month: string;
  in: number;  // Entrées
  out: number; // Sorties
}

export function PerformanceMetrics({ data }: { data: ChartData[] }) {
  // Trouver le max pour l'échelle (minimum 100 000 pour éviter l'échelle plate si vide)
  const maxVal = Math.max(...data.map(d => Math.max(d.in, d.out)), 100000);

  return (
    <div className="w-full h-full flex items-end justify-between gap-2 px-2 pb-2">
       {data.map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-2 w-full group cursor-pointer h-full justify-end">
             
             {/* Zone Barres */}
             <div className="w-full flex gap-1 items-end justify-center h-full relative">
                
                {/* Barre Entrées (Bleu) */}
                <div 
                   className="w-2 sm:w-5 bg-blue-600 rounded-t-sm transition-all duration-500 group-hover:opacity-80 relative" 
                   style={{ height: `${(item.in / maxVal) * 100}%`, minHeight: '4px' }}
                >
                   {/* Tooltip au survol */}
                   <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                      +{formatCurrency(item.in)}
                   </div>
                </div>

                {/* Barre Sorties (Orange) */}
                <div 
                   className="w-2 sm:w-5 bg-orange-500 rounded-t-sm transition-all duration-500 group-hover:opacity-80 relative" 
                   style={{ height: `${(item.out / maxVal) * 100}%`, minHeight: '4px' }}
                >
                   <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                      -{formatCurrency(item.out)}
                   </div>
                </div>

             </div>
             
             {/* Mois */}
             <span className="text-[10px] text-slate-400 font-medium uppercase">{item.month}</span>
          </div>
       ))}
    </div>
  );
}