"use client";

import React from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from "recharts";
import { formatCurrency } from "@/lib/utils";

interface ChartData {
  month: string;
  in: number;
  out: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white text-xs p-3 rounded-xl shadow-xl border border-slate-700">
        <p className="font-bold mb-2 text-slate-300 uppercase tracking-wider">{label}</p>
        <div className="space-y-1">
            <p className="text-emerald-400 flex justify-between gap-4">
                <span>Entrées :</span>
                <span className="font-mono font-bold">+{formatCurrency(payload[0].value)}</span>
            </p>
            <p className="text-rose-400 flex justify-between gap-4">
                <span>Sorties :</span>
                <span className="font-mono font-bold">-{formatCurrency(payload[1].value)}</span>
            </p>
        </div>
      </div>
    );
  }
  return null;
};

export function PerformanceMetrics({ data }: { data: ChartData[] }) {
  // Si pas de données, on affiche un état vide élégant
  if (!data || data.every(d => d.in === 0 && d.out === 0)) {
      return (
          <div className="h-full w-full flex flex-col items-center justify-center text-slate-400">
              <div className="w-16 h-1 bg-slate-100 rounded-full mb-2"></div>
              <div className="w-12 h-1 bg-slate-100 rounded-full mb-4"></div>
              <p className="text-xs">Pas assez de données financières</p>
          </div>
      )
  }

  return (
    <div className="w-full h-full" style={{ minHeight: "220px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          barGap={4}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 10 }}
            tickFormatter={(value) => `${value / 1000}k`} // Format compact
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
          
          <Bar 
            dataKey="in" 
            fill="#2563eb" 
            radius={[4, 4, 0, 0]} 
            maxBarSize={40}
            animationDuration={1500}
          />
          <Bar 
            dataKey="out" 
            fill="#f97316" 
            radius={[4, 4, 0, 0]} 
            maxBarSize={40}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}