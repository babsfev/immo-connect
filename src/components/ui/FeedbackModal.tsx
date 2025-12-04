"use client";

import React from "react";
import { Check, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeedbackModalProps {
  isOpen: boolean;
  type: "success" | "error" | "loading";
  title: string;
  message?: string;
  onClose?: () => void; // Optionnel si on redirige auto
}

export function FeedbackModal({ isOpen, type, title, message }: FeedbackModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* La Carte */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 border border-slate-100 relative overflow-hidden">
         
         {/* Effet de fond coloré subtil */}
         <div className={cn(
            "absolute top-0 left-0 w-full h-2",
            type === "success" && "bg-green-500",
            type === "error" && "bg-red-500",
            type === "loading" && "bg-blue-500 animate-pulse"
         )}></div>

         {/* L'ICÔNE GÉANTE ANIMÉE */}
         <div className="flex justify-center mb-6">
            <div className={cn(
               "w-20 h-20 rounded-full flex items-center justify-center border-4 shadow-lg transition-all",
               type === "success" && "bg-green-50 border-green-100 text-green-600",
               type === "error" && "bg-red-50 border-red-100 text-red-600",
               type === "loading" && "bg-blue-50 border-blue-100 text-blue-600"
            )}>
               {type === "success" && <Check size={40} strokeWidth={4} className="animate-in zoom-in duration-300 delay-150" />}
               {type === "error" && <X size={40} strokeWidth={4} className="animate-in zoom-in duration-300 delay-150" />}
               {type === "loading" && <Loader2 size={40} strokeWidth={3} className="animate-spin" />}
            </div>
         </div>

         {/* LE TEXTE */}
         <h3 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">
            {title}
         </h3>
         
         {message && (
            <p className="text-slate-500 text-base font-medium leading-relaxed">
               {message}
            </p>
         )}

      </div>
    </div>
  );
}