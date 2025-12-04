import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { BarChart3, TrendingDown, TrendingUp } from "lucide-react";

export function PerformanceMetrics() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-base">
          <div className="flex items-center gap-2"><BarChart3 size={18} className="text-blue-600" /> Flux de Trésorerie</div>
          <select className="text-xs border-none bg-slate-100 rounded-md px-2 py-1 text-slate-600 outline-none"><option>Cette année</option><option>6 derniers mois</option></select>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Résumé */}
        <div className="flex gap-4 mb-6">
           <div className="flex-1 p-3 bg-green-50 rounded-lg border border-green-100">
              <p className="text-xs text-green-600 flex items-center gap-1 mb-1"><TrendingUp size={12}/> Entrées</p>
              <p className="font-bold text-slate-900 text-lg">14.2M</p>
           </div>
           <div className="flex-1 p-3 bg-red-50 rounded-lg border border-red-100">
              <p className="text-xs text-red-600 flex items-center gap-1 mb-1"><TrendingDown size={12}/> Dépenses</p>
              <p className="font-bold text-slate-900 text-lg">2.1M</p>
           </div>
           <div className="flex-1 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-xs text-blue-600 mb-1">Net (Cashflow)</p>
              <p className="font-bold text-slate-900 text-lg">12.1M</p>
           </div>
        </div>

        {/* Graphique Barres Empilées (Simulation CSS) */}
        <div className="h-40 w-full flex items-end justify-between gap-3 px-2">
          {[
             {m:"J", in:80, out:20}, {m:"F", in:85, out:10}, {m:"M", in:80, out:40}, 
             {m:"A", in:90, out:15}, {m:"M", in:85, out:10}, {m:"J", in:95, out:25}
          ].map((data, i) => (
            <div key={i} className="w-full flex flex-col justify-end h-full group cursor-pointer">
              {/* Barre Dépense (Rouge) */}
              <div className="w-full bg-red-300 rounded-t-sm opacity-80 relative" style={{ height: `${data.out}%` }}></div>
              {/* Barre Revenu (Vert) */}
              <div className="w-full bg-green-500 rounded-b-sm relative" style={{ height: `${data.in}%` }}></div>
              <span className="text-xs text-slate-400 text-center mt-2">{data.m}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}