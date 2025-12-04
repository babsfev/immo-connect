"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="text-center mb-8">
           <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4"><Building2 /></div>
           <h1 className="text-2xl font-bold text-slate-900">Créer un compte</h1>
           <p className="text-slate-500">Rejoignez Immo-Connect aujourd'hui.</p>
        </div>
        <form className="space-y-4">
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1"><label className="text-sm font-medium">Prénom</label><Input placeholder="Jean"/></div>
              <div className="space-y-1"><label className="text-sm font-medium">Nom</label><Input placeholder="Dupont"/></div>
           </div>
           <div className="space-y-1"><label className="text-sm font-medium">Email</label><Input type="email" placeholder="jean@mail.com"/></div>
           <div className="space-y-1"><label className="text-sm font-medium">Mot de passe</label><Input type="password" placeholder="••••••••"/></div>
           <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-2">S'inscrire</Button>
        </form>
        <p className="text-center text-sm text-slate-500 mt-6">Déjà un compte ? <Link href="/login" className="text-blue-600 font-bold hover:underline">Se connecter</Link></p>
      </div>
    </div>
  );
}