import React from "react";
import { Rocket, Bell } from "lucide-react";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/form/Input";
import { Card } from "@/components/ui/Card";

export default function MarketPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center max-w-2xl mx-auto px-4">
      
      <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-8 animate-bounce-slow">
        <Rocket size={48} className="text-blue-600" />
      </div>

      <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
        La Marketplace arrive bientôt.
      </h1>
      
      <p className="text-lg text-slate-500 mb-8 leading-relaxed">
        Nous construisons la première plateforme centralisée pour connecter propriétaires et locataires vérifiés à Dakar.
      </p>

      <Card className="p-6 w-full bg-slate-50 border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-2 flex items-center justify-center gap-2">
           <Bell size={16} className="text-orange-500"/> Être notifié du lancement
        </h3>
        <form className="flex gap-2 mt-4">
           <Input placeholder="votre@email.com" className="bg-white" />
           <Button className="bg-slate-900 text-white">M'inscrire</Button>
        </form>
        <p className="text-xs text-slate-400 mt-3">
           Vous serez les premiers informés. Pas de spam.
        </p>
      </Card>

      <div className="mt-12 grid grid-cols-3 gap-8 text-center w-full opacity-50">
         <div>
            <p className="text-2xl font-bold text-slate-900">500+</p>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Biens en attente</p>
         </div>
         <div>
            <p className="text-2xl font-bold text-slate-900">100%</p>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Vérifiés</p>
         </div>
         <div>
            <p className="text-2xl font-bold text-slate-900">24/7</p>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Support</p>
         </div>
      </div>
    </div>
  );
}