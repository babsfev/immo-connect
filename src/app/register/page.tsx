"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Building2, User, ArrowRight } from "lucide-react";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  const [step, setStep] = useState<"ROLE" | "FORM">("ROLE");
  const [role, setRole] = useState<"OWNER" | "AGENCY">("OWNER");

  // ÉTAPE 1 : CHOIX DU RÔLE
  if (step === "ROLE") {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-6">
        
        <div className="mb-10 hover:scale-105 transition-transform cursor-pointer">
           <Link href="/"><Logo className="h-14 w-auto" /></Link>
        </div>
        
        <div className="w-full max-w-2xl text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
           <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Bienvenue sur Immo-Connect</h1>
           <p className="text-slate-500 mb-10 text-lg">Pour commencer, dites-nous qui vous êtes.</p>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div 
                 onClick={() => { setRole("OWNER"); setStep("FORM"); }}
                 className="group cursor-pointer bg-white p-8 rounded-3xl border-2 border-slate-100 hover:border-blue-600 hover:shadow-xl transition-all duration-300 text-left relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600"><ArrowRight /></div>
                 <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><User size={28}/></div>
                 <h3 className="text-xl font-bold text-slate-900 mb-2">Propriétaire</h3>
                 <p className="text-slate-500 text-sm leading-relaxed">Je possède des biens et je veux les gérer simplement.</p>
              </div>

              <div 
                 onClick={() => { setRole("AGENCY"); setStep("FORM"); }}
                 className="group cursor-pointer bg-white p-8 rounded-3xl border-2 border-slate-100 hover:border-orange-500 hover:shadow-xl transition-all duration-300 text-left relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity text-orange-500"><ArrowRight /></div>
                 <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Building2 size={28}/></div>
                 <h3 className="text-xl font-bold text-slate-900 mb-2">Agence Immobilière</h3>
                 <p className="text-slate-500 text-sm leading-relaxed">Je gère un parc pour mes clients (Mandats, Équipes).</p>
              </div>
           </div>
        </div>
        <p className="mt-12 text-sm text-slate-400">Déjà un compte ? <Link href="/login" className="text-blue-600 font-bold hover:underline">Connexion</Link></p>
      </div>
    );
  }

  // ÉTAPE 2 : FORMULAIRE COMPLET (Email d'abord, puis Google)
  return (
     <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-6 animate-in zoom-in-95 duration-300">
        <div className="mb-8"><Logo className="h-12 w-auto" /></div>
        <RegisterForm role={role} onBack={() => setStep("ROLE")} />
     </div>
  );
}