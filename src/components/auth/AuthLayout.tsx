import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { ShieldCheck } from "lucide-react";

export function AuthLayout({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      
      {/* GAUCHE : Visuel (Caché sur mobile) */}
      <div className="hidden lg:flex flex-col justify-between bg-slate-900 p-12 text-white relative overflow-hidden">
        {/* Fond animé */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600 rounded-full blur-[100px] opacity-20 translate-y-1/3 -translate-x-1/3"></div>
        
        <div className="relative z-10">
          <Logo variant="white" className="h-8" />
        </div>

        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-extrabold mb-6 leading-tight">
            Gérez vos biens immobiliers en toute sérénité.
          </h2>
          <ul className="space-y-4 text-slate-300">
            <li className="flex items-center gap-3">
              <div className="p-1 bg-green-500/20 rounded-full text-green-400"><ShieldCheck size={16} /></div>
              Paiements sécurisés et automatisés
            </li>
            <li className="flex items-center gap-3">
              <div className="p-1 bg-blue-500/20 rounded-full text-blue-400"><ShieldCheck size={16} /></div>
              Suivi des incidents et maintenance
            </li>
            <li className="flex items-center gap-3">
              <div className="p-1 bg-purple-500/20 rounded-full text-purple-400"><ShieldCheck size={16} /></div>
              Documents générés en 1 clic
            </li>
          </ul>
        </div>

        <div className="relative z-10 text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Immo-Connect. Made in Dakar.
        </div>
      </div>

      {/* DROITE : Formulaire */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 lg:p-24 overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden mb-8">
             <Logo className="h-8 mx-auto" />
          </div>
          
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{title}</h1>
            <p className="text-slate-500 mt-2 text-sm">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}