"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Card } from "@/components/ui/Card";

export default function LinkExpiredPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-6 relative overflow-hidden">
      
      {/* Fond décoratif */}
      <div className="absolute top-0 left-0 w-full h-64 bg-linear-to-b from-orange-50 to-transparent -z-10"></div>
      
      <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
        <Logo className="h-12 w-auto" />
      </div>

      <Card className="w-full max-w-md p-8 text-center shadow-xl border-orange-100 animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={40} strokeWidth={2} />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">Lien expiré</h1>
        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
          Ce lien de sécurité n'est plus valide ou a déjà été utilisé.<br/>
          Par mesure de sécurité, nos liens ont une durée de vie limitée.
        </p>

        <div className="space-y-3">
            <Link href="/login">
                <Button className="w-full h-12 bg-slate-900 text-white hover:bg-slate-800 shadow-lg">
                    Retour à la connexion <ArrowRight size={18} className="ml-2" />
                </Button>
            </Link>
            
            <Link href="/forgot-password">
                <Button variant="outline" className="w-full h-12 border-slate-200 text-slate-600 hover:bg-slate-50">
                    <RefreshCw size={16} className="mr-2"/> Demander un nouveau lien
                </Button>
            </Link>
        </div>
      </Card>
      
      <p className="mt-8 text-xs text-slate-400">
         Code erreur : AUTH_TOKEN_EXPIRED
      </p>
    </div>
  );
}