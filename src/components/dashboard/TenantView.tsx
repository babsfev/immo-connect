"use client";
import React from "react";
import { Home, CreditCard, Wrench, FileText, Bell, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";

export function TenantView() {
  // Données simulées du locataire connecté
  const rentStatus = "À jour"; // ou "Retard"
  const rentAmount = 450000;

  return (
    <div className="pb-24 space-y-6">
      
      {/* 1. HEADER MOBILE */}
      <div className="flex justify-between items-center">
         <div>
            <h1 className="text-2xl font-bold text-slate-900">Mon Logement</h1>
            <p className="text-slate-500 text-sm">Apt T3 - Centre Ville</p>
         </div>
         <div className="relative">
            <Bell className="text-slate-600" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
         </div>
      </div>

      {/* 2. STATUS LOYER (Card Principale) */}
      <Card className={`border-none text-white shadow-xl ${rentStatus === "À jour" ? "bg-linear-to-br from-blue-600 to-blue-800" : "bg-red-600"}`}>
         <CardContent className="p-6">
            <p className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-1">Situation Loyer</p>
            <div className="flex justify-between items-end mb-4">
               <h2 className="text-3xl font-bold">{rentStatus === "À jour" ? "Tout est bon ! 🎉" : "Retard ⚠️"}</h2>
            </div>
            <div className="bg-white/10 rounded-xl p-3 flex justify-between items-center backdrop-blur-sm">
               <span className="text-sm">Prochain prélèvement</span>
               <span className="font-bold text-lg">{formatCurrency(rentAmount)}</span>
            </div>
            <Button className="w-full mt-4 bg-white text-blue-700 hover:bg-blue-50 border-none">
               <CreditCard size={16} className="mr-2"/> Payer maintenant
            </Button>
         </CardContent>
      </Card>

      {/* 3. ACTIONS RAPIDES (Grid) */}
      <div className="grid grid-cols-2 gap-4">
         <Card className="active:scale-95 transition-transform cursor-pointer">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
               <div className="p-3 bg-orange-50 text-orange-600 rounded-full"><Wrench size={24}/></div>
               <span className="font-bold text-slate-700">Signaler incident</span>
            </CardContent>
         </Card>
         <Card className="active:scale-95 transition-transform cursor-pointer">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
               <div className="p-3 bg-blue-50 text-blue-600 rounded-full"><FileText size={24}/></div>
               <span className="font-bold text-slate-700">Mes Documents</span>
            </CardContent>
         </Card>
      </div>

      {/* 4. DERNIÈRES ACTIVITÉS */}
      <div>
         <h3 className="font-bold text-slate-900 mb-3">Activités récentes</h3>
         <div className="space-y-3">
            <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-center justify-between shadow-sm">
               <div className="flex items-center gap-3">
                  <div className="bg-green-100 text-green-600 p-2 rounded-lg"><Check size={16}/></div>
                  <div>
                     <p className="text-sm font-bold text-slate-900">Quittance Nov. générée</p>
                     <p className="text-xs text-slate-500">Hier</p>
                  </div>
               </div>
               <ChevronRight size={16} className="text-slate-300"/>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-center justify-between shadow-sm">
               <div className="flex items-center gap-3">
                  <div className="bg-blue-100 text-blue-600 p-2 rounded-lg"><Wrench size={16}/></div>
                  <div>
                     <p className="text-sm font-bold text-slate-900">Plombier programmé</p>
                     <p className="text-xs text-slate-500">25 Nov à 14h</p>
                  </div>
               </div>
               <ChevronRight size={16} className="text-slate-300"/>
            </div>
         </div>
      </div>

    </div>
  );
}

import { Check } from "lucide-react"; // Import manquant