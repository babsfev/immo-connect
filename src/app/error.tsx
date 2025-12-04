"use client"; // Les composants d'erreur doivent être Client

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
    // Tu pourrais envoyer l'erreur à un service de log ici (Sentry)
    console.error("Erreur application:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4">
      <Card className="max-w-md w-full p-8 text-center border-red-100 shadow-xl">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={32} className="text-red-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Oups ! Une erreur est survenue.</h2>
        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
          Ne vous inquiétez pas, nos équipes ont été notifiées. Essayez de rafraîchir la page.
        </p>

        <div className="flex flex-col gap-3">
          <Button 
            onClick={reset} 
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            <RefreshCcw size={16} className="mr-2" /> Réessayer
          </Button>
          
          <Button 
            onClick={() => window.location.href = "/dashboard"} 
            variant="outline" 
            className="w-full"
          >
            <Home size={16} className="mr-2" /> Retour au Dashboard
          </Button>
        </div>
        
        {error.digest && (
          <p className="mt-6 text-[10px] text-slate-300 font-mono">
            Code erreur: {error.digest}
          </p>
        )}
      </Card>
    </div>
  );
}