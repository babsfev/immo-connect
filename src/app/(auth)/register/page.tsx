"use client";

import React, { useState } from "react";
import { Building2, User, CheckCircle2 } from "lucide-react";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Logo } from "@/components/ui/Logo";
import { Card } from "@/components/ui/Card";

export default function RegisterPage() {
  const [step, setStep] = useState<"ROLE" | "FORM">("ROLE");
  const [role, setRole] = useState<"AGENCY" | "OWNER">("OWNER");

  // ÉTAPE 1 : CHOIX DU RÔLE
  if (step === "ROLE") {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-4">
         <div className="mb-10 scale-110"><Logo className="h-12 w-auto" /></div>
         
         <div className="text-center mb-8 max-w-md">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3">Bienvenue !</h1>
            <p className="text-slate-500 text-lg">Choisissez votre profil pour commencer.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
            {/* CARTE PROPRIÉTAIRE */}
            <Card 
               onClick={() => { setRole("OWNER"); setStep("FORM"); }}
               className="group cursor-pointer hover:border-blue-500 hover:shadow-xl transition-all duration-300 p-8 border-2 border-transparent hover:-translate-y-1 relative overflow-hidden"
            >
               <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500">
                  <CheckCircle2 size={24} />
               </div>
               <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                  <User size={32} />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-2">Propriétaire</h3>
               <p className="text-slate-500 leading-relaxed">
                  Je gère un ou plusieurs biens personnels. Je veux automatiser mes quittances et suivre mes loyers.
               </p>
            </Card>

            {/* CARTE AGENCE */}
            <Card 
               onClick={() => { setRole("AGENCY"); setStep("FORM"); }}
               className="group cursor-pointer hover:border-orange-500 hover:shadow-xl transition-all duration-300 p-8 border-2 border-transparent hover:-translate-y-1 relative overflow-hidden"
            >
               <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-orange-500">
                  <CheckCircle2 size={24} />
               </div>
               <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
                  <Building2 size={32} />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-2">Agence Immobilière</h3>
               <p className="text-slate-500 leading-relaxed">
                  Je gère un parc immobilier pour des tiers. J'ai besoin d'outils de gestion, mandats et équipe.
               </p>
            </Card>
         </div>
      </div>
    );
  }

  // ÉTAPE 2 : FORMULAIRE D'INSCRIPTION
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-6 animate-in zoom-in-95 duration-300">
       <div className="mb-8"><Logo className="h-10 w-auto" /></div>
       {/* Maintenant RegisterForm accepte les props role et onBack ! */}
       <RegisterForm role={role} onBack={() => setStep("ROLE")} />
    </div>
  );
}