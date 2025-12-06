"use client";

import React from "react";
import { Check, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeedbackModalProps {
  isOpen: boolean;
  type: "success" | "error" | "loading";
  title: string;
  message?: string;
}

export function FeedbackModal({ isOpen, type, title, message }: FeedbackModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      
      {/* La Carte */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 border border-white/20 relative overflow-hidden">
         
         {/* Effet de fond coloré (glow) */}
         <div className={cn(
            "absolute top-0 left-0 w-full h-1.5",
            type === "success" && "bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)]",
            type === "error" && "bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]",
            type === "loading" && "bg-blue-500 animate-pulse"
         )}></div>

         {/* L'ICÔNE GÉANTE ANIMÉE */}
         <div className="flex justify-center mb-6">
            <div className={cn(
               "w-20 h-20 rounded-full flex items-center justify-center border-4 shadow-xl transition-all duration-500",
               type === "success" && "bg-green-50 border-green-100 text-green-600 scale-110",
               type === "error" && "bg-red-50 border-red-100 text-red-600",
               type === "loading" && "bg-blue-50 border-blue-100 text-blue-600"
            )}>
               {type === "success" && <Check size={40} strokeWidth={4} className="animate-in zoom-in spin-in-12 duration-500 delay-100" />}
               {type === "error" && <X size={40} strokeWidth={4} className="animate-in zoom-in duration-300" />}
               {type === "loading" && <Loader2 size={40} strokeWidth={3} className="animate-spin" />}
            </div>
         </div>

         {/* LE TEXTE */}
         <h3 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight animate-in slide-in-from-bottom-2 delay-100 fill-mode-both">
            {title}
         </h3>
         
         {message && (
            <p className="text-slate-500 text-sm font-medium leading-relaxed animate-in slide-in-from-bottom-2 delay-200 fill-mode-both">
               {message}
            </p>
         )}

      </div>
    </div>
  );
}