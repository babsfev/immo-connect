"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-slate-100 text-center animate-in fade-in zoom-in-95 duration-500">
       
       {/* Icône Animée */}
       <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <Mail size={40} className="text-blue-600"/>
       </div>

       <h1 className="text-2xl font-bold text-slate-900 mb-2">Vérifiez vos emails</h1>
       
       <p className="text-slate-500 text-sm mb-6 leading-relaxed">
          Un lien de connexion sécurisé a été envoyé à :<br/>
          <span className="font-bold text-slate-900">{email || "votre adresse"}</span>
       </p>

       <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-8 text-left">
          <p className="text-xs text-blue-800 flex gap-2">
             <CheckCircle2 size={16} className="shrink-0 mt-0.5"/>
             Cliquez sur le lien dans l'email pour activer votre compte et accéder directement au Dashboard.
          </p>
       </div>

       <div className="space-y-3">
          <button 
             onClick={() => window.open("https://gmail.com", "_blank")}
             className="w-full h-12 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
          >
             Ouvrir ma boîte mail
          </button>
          
          <Link href="/login">
             <Button variant="ghost" className="w-full text-slate-400 hover:text-slate-600">
                <ArrowLeft size={16} className="mr-2"/> Retour à la connexion
             </Button>
          </Link>
       </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-64 bg-linear-to-b from-blue-50 to-transparent -z-10"></div>
      <div className="mb-8"><Logo className="h-12 w-auto" /></div>
      
      <Suspense fallback={<div>Chargement...</div>}>
         <VerifyEmailContent />
      </Suspense>
    </div>
  );
}