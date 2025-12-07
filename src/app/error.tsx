"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log l'erreur dans un service d'analyse (Sentry, etc.)
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-6">
      <Card className="max-w-md w-full text-center p-8 border-red-100 shadow-xl">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={40} className="text-red-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Oups ! Une erreur est survenue.
        </h2>
        
        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
          Ne vous inquiétez pas, nos équipes ont été notifiées. 
          Essayez de rafraîchir la page.
        </p>

        <div className="flex flex-col gap-3">
          <Button 
            onClick={reset}
            className="w-full bg-slate-900 text-white hover:bg-slate-800"
          >
            <RefreshCcw size={18} className="mr-2" /> Réessayer
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={() => window.location.href = "/dashboard"}
            className="w-full"
          >
            <Home size={18} className="mr-2" /> Retour à l'accueil
          </Button>
        </div>

        {error.digest && (
          <div className="mt-8 pt-4 border-t border-slate-100">
             <p className="text-[10px] text-slate-400 font-mono">Code erreur: {error.digest}</p>
          </div>
        )}
      </Card>
    </div>
  );
}