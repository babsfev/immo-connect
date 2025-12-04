"use client"; // Important pour l'interactivité

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Pour la redirection
import { ArrowRight, Building2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulation d'attente réseau
    setTimeout(() => {
      router.push("/dashboard"); // Redirection vers le dashboard
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2">
      {/* GAUCHE */}
      <div className="flex flex-col justify-center px-8 py-12 md:px-12 lg:px-20 bg-white h-full relative">
        <Link href="/" className="absolute top-8 left-8 md:left-12 flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors">
          <ArrowRight className="h-4 w-4 rotate-180" /> Retour à l'accueil
        </Link>

        <div className="w-full max-w-md mx-auto space-y-8">
          <div className="space-y-2">
             <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-200">
                <Building2 size={20} />
             </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Connexion</h1>
            <p className="text-slate-500">Accédez à votre espace de gestion.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email</label>
              <Input type="email" placeholder="nom@exemple.com" required />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Mot de passe</label>
              <Input type="password" placeholder="••••••••" required />
              {/* Correction positionnement */}
              <div className="flex justify-end">
                <Link href="#" className="text-xs font-medium text-blue-600 hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" isLoading={isLoading}>
              Se connecter <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400">Ou</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full">Google</Button>
            <Button variant="outline" className="w-full">Apple</Button>
          </div>

          <p className="text-center text-sm text-slate-500">
            Pas encore de compte ? <Link href="/register" className="font-semibold text-blue-600 hover:underline">Créer un compte</Link>
          </p>
        </div>
      </div>

      {/* DROITE (Visuel) */}
      <div className="hidden lg:flex relative h-full w-full flex-col bg-slate-900 p-12 text-white overflow-hidden justify-between">
        <div className="absolute inset-0 bg-blue-600/20 mix-blend-multiply"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"></div>
        <div className="relative z-10">
           <h2 className="text-4xl font-bold leading-tight mb-6">Gérez votre parc immobilier avec sérénité.</h2>
           <p className="text-blue-200 text-lg">Rejoignez plus de 5000 gestionnaires qui utilisent Immo-Connect.</p>
        </div>
      </div>
    </div>
  );
}