"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Card } from "@/components/ui/Card";

export default function EmailVerifiedPage() {
  const router = useRouter();

  // Redirection auto après 5 secondes
  useEffect(() => {
    const timer = setTimeout(() => router.push("/dashboard"), 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-6 relative overflow-hidden">
      
      {/* Fond décoratif */}
      <div className="absolute top-0 left-0 w-full h-64 bg-linear-to-b from-green-50 to-transparent -z-10"></div>
      
      <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
        <Logo className="h-12 w-auto" />
      </div>

      <Card className="w-full max-w-md p-8 text-center shadow-xl border-green-100 animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-300 delay-150">
          <CheckCircle2 size={40} strokeWidth={3} />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">Email confirmé !</h1>
        <p className="text-slate-500 text-sm mb-8">
          Votre compte est maintenant actif et sécurisé.<br/>
          Bienvenue sur Immo-Connect.
        </p>

        <Link href="/dashboard">
          <Button className="w-full h-12 bg-slate-900 text-white hover:bg-slate-800 shadow-lg">
            Accéder à mon Dashboard <ArrowRight size={18} className="ml-2" />
          </Button>
        </Link>
        
        <p className="text-xs text-slate-400 mt-4">
          Redirection automatique dans quelques secondes...
        </p>
      </Card>
    </div>
  );
}