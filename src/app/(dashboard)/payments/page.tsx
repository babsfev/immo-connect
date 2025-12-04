"use client";

import React from "react";
import { 
  Download, Filter, Search, ArrowDownLeft, Wallet, ArrowUpRight, 
  AlertCircle, Building, MoreHorizontal, CreditCard
} from "lucide-react";
import { toast } from "sonner";

import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge"; 
import { EmptyState } from "@/components/ui/EmptyState"; // Ton composant

// --- Fonctions Utilitaires ---
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("fr-FR", { 
    style: "currency", 
    currency: "XOF",
    maximumFractionDigits: 0 
  }).format(amount);
};

// --- Données Simulées ---
const propertiesWithPayments = [
  {
    id: "P1",
    name: "Immeuble Le Plateau",
    totalCollected: 1250000,
    expected: 1500000,
    tenants: [
      { id: "T1", name: "Jean Dupont", unit: "Apt 4B", amount: 850000, status: "Payé", date: "05 Nov" },
      { id: "T2", name: "Marie Cur", unit: "Local RDC", amount: 400000, status: "Retard", date: "En attente" },
    ]
  },
  {
    id: "P2",
    name: "Villa Corniche",
    totalCollected: 1200000,
    expected: 1200000,
    tenants: [
      { id: "T3", name: "Fatou Sow", unit: "Villa complète", amount: 1200000, status: "Payé", date: "03 Nov" },
    ]
  },
  {
    id: "P3",
    name: "Résidence Almadies",
    totalCollected: 300000,
    expected: 600000,
    tenants: [
      { id: "T4", name: "Sarah Ndiaye", unit: "Studio 101", amount: 300000, status: "Payé", date: "01 Nov" },
      { id: "T5", name: "Moussa Diop", unit: "Appt T3", amount: 300000, status: "Impayé", date: "En attente" },
    ]
  }
];

export default function PaymentsPage() {
  
  const handleCollect = () => {
      toast.info("Module d'encaissement", {
          description: "La fonctionnalité d'encaissement rapide sera bientôt disponible."
      });
  };

  return (
    <div className="space-y-8 pb-10">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Paiements</h1>
          <p className="text-slate-500">Flux de trésorerie par propriété.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="hidden sm:flex">
            <Download size={18} className="mr-2" /> Exporter
          </Button>
          <Button onClick={handleCollect} className="bg-orange-500 hover:bg-orange-600 text-white">
            <ArrowDownLeft size={18} className="mr-2" /> Encaisser
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="flex items-center gap-4 p-4">
           <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
             <Wallet size={24} />
           </div>
           <div>
             <p className="text-sm text-slate-500">Encaissé (Nov)</p>
             <p className="text-2xl font-bold text-slate-900">2.75M</p>
           </div>
        </Card>
        <Card className="flex items-center gap-4 p-4">
           <div className="h-12 w-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
             <ArrowUpRight size={24} />
           </div>
           <div>
             <p className="text-sm text-slate-500">En attente</p>
             <p className="text-2xl font-bold text-slate-900">400k</p>
           </div>
        </Card>
        <Card className="bg-red-50/30 border-red-100 flex items-center gap-4 p-4">
           <div className="h-12 w-12 rounded-full bg-white border border-red-100 flex items-center justify-center text-red-500">
             <AlertCircle size={24} />
           </div>
           <div>
             <p className="text-sm text-red-600">Impayés Critiques</p>
             <p className="text-2xl font-bold text-red-700">300k</p>
           </div>
        </Card>
      </div>

      {/* Barre de recherche */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative max-w-sm w-full">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
           <Input placeholder="Rechercher un locataire ou une propriété..." className="pl-10 bg-white" />
        </div>
        <Button variant="outline" className="bg-white">
          <Filter size={16} className="mr-2" /> Filtres avancés
        </Button>
      </div>

      {/* Liste des paiements ou EmptyState */}
      {propertiesWithPayments.length === 0 ? (
         <EmptyState 
            icon={CreditCard}
            title="Aucun historique de paiement"
            description="Les transactions apparaîtront ici une fois les premiers loyers encaissés."
            actionLabel="Encaisser un loyer"
            onAction={handleCollect}
         />
      ) : (
        <div className="space-y-6">
            {propertiesWithPayments.map((property) => (
            <Card key={property.id} className="overflow-hidden border-slate-200 shadow-sm">
                {/* Header de la Carte Propriété */}
                <div className="bg-slate-50 p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white border border-slate-200 rounded-lg shadow-sm">
                        <Building size={20} className="text-blue-600"/>
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900">{property.name}</h3>
                        <p className="text-xs text-slate-500">{property.tenants.length} locataire(s)</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-6 text-right">
                    <div>
                        <span className="text-xs text-slate-500 block uppercase tracking-wider">Collecté</span>
                        <span className="font-bold text-slate-900 text-lg">{formatCurrency(property.totalCollected)}</span>
                    </div>
                    {property.expected > property.totalCollected && (
                        <div className="hidden sm:block">
                        <span className="text-xs text-red-500 block font-medium uppercase tracking-wider">Reste à percevoir</span>
                        <span className="text-sm font-bold text-red-500">{formatCurrency(property.expected - property.totalCollected)}</span>
                        </div>
                    )}
                </div>
                </div>
                
                {/* Liste des locataires pour cette propriété */}
                <div className="divide-y divide-slate-100 bg-white">
                {property.tenants.map((tenant) => (
                    <div key={tenant.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-50 transition-colors gap-4">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold border-2 border-white shadow-sm">
                            {tenant.name.charAt(0)}
                            </div>
                            <div>
                            <p className="text-sm font-semibold text-slate-900">{tenant.name}</p>
                            <p className="text-xs text-slate-500">{tenant.unit} • {tenant.date}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto pl-14 sm:pl-0">
                            <span className="text-sm font-bold text-slate-700">{formatCurrency(tenant.amount)}</span>
                            
                            <Badge variant={tenant.status === "Payé" ? "success" : tenant.status === "Retard" ? "warning" : "danger"}>
                            {tenant.status}
                            </Badge>
                            
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-600">
                            <MoreHorizontal size={16}/>
                            </Button>
                        </div>
                    </div>
                ))}
                </div>
            </Card>
            ))}
        </div>
      )}
    </div>
  );
}