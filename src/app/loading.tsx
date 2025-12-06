import React from "react";
import { Loader2 } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm animate-in fade-in duration-300">
      
      {/* Container avec ombre et bordure subtile */}
      <div className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-2xl border border-slate-100 relative overflow-hidden">
         
         {/* Effet de brillance */}
         <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-purple-500 to-orange-500 animate-pulse-slow"></div>

         <div className="mb-6 scale-110">
            <Logo className="h-8" />
         </div>
         
         <div className="relative">
            {/* Cercle extérieur fixe */}
            <div className="w-12 h-12 rounded-full border-4 border-slate-100"></div>
            {/* Cercle intérieur tournant */}
            <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
         </div>

         <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">
            Chargement...
         </p>
      </div>
    </div>
  );
}