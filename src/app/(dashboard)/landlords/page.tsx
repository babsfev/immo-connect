"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  Plus,
  Briefcase,
  Percent,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Wallet,
  Crown,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Input from "@/components/ui/form/Input";
import { formatCurrency } from "@/lib/utils";
import { Modal } from "@/components/ui/Modal";

// Données Intelligentes
const landlords = [
  {
    id: 1,
    name: "Héritiers Famille Ndiaye",
    type: "Indivision",
    properties: 4,
    commission: 7,
    balance: 2500000,
    status: "payout_ready",
    aiInsight: "Client VIP : Génère 15% de votre CA agence.",
    performance: "high",
  },
  {
    id: 2,
    name: "M. Patrick Martin",
    type: "Investisseur",
    properties: 12,
    commission: 6,
    balance: 0,
    status: "settled",
    aiInsight: null,
    performance: "stable",
  },
  {
    id: 3,
    name: "Sci Les Almadies",
    type: "Société",
    properties: 1,
    commission: 8,
    balance: 450000,
    status: "risk",
    aiInsight: "Alerte : 3 mois de vacance sur leur bien. Risque de départ.",
    performance: "low",
  },
];

export default function LandlordsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLandlord, setSelectedLandlord] = useState<any>(null);

  // Calculs Globaux
  const totalPending = landlords.reduce((acc, curr) => acc + curr.balance, 0);
  const totalProperties = landlords.reduce(
    (acc, curr) => acc + curr.properties,
    0
  );

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      {/* HEADER & ACTIONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Propriétaires (Mandats)
          </h1>
          <p className="text-slate-500">
            Gestion des comptes mandants et reversements.
          </p>
        </div>
        <Button
          className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-200"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={18} className="mr-2" /> Nouveau Mandat
        </Button>
      </div>

      {/* 1. INTELLIGENCE AGENCY (KPIs) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Reversements en attente */}
        <Card className="bg-slate-900 text-white border-none relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-30"></div>
          <CardContent className="p-6 relative z-10">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
              À Reverser (Net)
            </p>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-bold text-white">
                {formatCurrency(totalPending)}
              </span>
            </div>
            <Button
              size="sm"
              className="w-full bg-white text-slate-900 hover:bg-blue-50 border-none"
            >
              <Wallet size={16} className="mr-2 text-purple-600" /> Lancer les
              virements
            </Button>
          </CardContent>
        </Card>

        {/* Parc sous gestion */}
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                  Portefeuille
                </p>
                <h3 className="text-3xl font-bold text-slate-900 mt-1">
                  {landlords.length}{" "}
                  <span className="text-lg font-normal text-slate-400">
                    Clients
                  </span>
                </h3>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <Briefcase size={20} />
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-4">
              Total de <strong>{totalProperties} biens</strong> sous mandat.
            </p>
          </CardContent>
        </Card>

        {/* Performance Agence */}
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                  Commissions (Mois)
                </p>
                <h3 className="text-3xl font-bold text-slate-900 mt-1">
                  7.5%{" "}
                  <span className="text-lg font-normal text-slate-400">
                    Moy.
                  </span>
                </h3>
              </div>
              <div className="p-2 bg-green-50 rounded-lg text-green-600">
                <Percent size={20} />
              </div>
            </div>
            <p className="text-sm text-green-700 mt-4 flex items-center gap-1">
              <TrendingUp size={16} /> Revenus agence en hausse.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 2. FILTRES */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm max-w-md flex items-center gap-2">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <Input
            placeholder="Rechercher un propriétaire..."
            className="pl-10 border-none shadow-none focus:ring-0 bg-transparent"
          />
        </div>
      </div>

      {/* 3. GRILLE PROPRIÉTAIRES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {landlords.map((landlord) => (
          <Card
            key={landlord.id}
            className="group hover:border-purple-300 hover:shadow-md transition-all cursor-pointer relative overflow-hidden"
          >
            {/* Bandeau status visuel */}
            {landlord.status === "payout_ready" && (
              <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
            )}
            {landlord.status === "risk" && (
              <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
            )}

            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-700 font-bold border-2 border-white shadow-sm">
                    {landlord.name.charAt(0)}
                  </div>
                  <div>
                    <h3
                      className="font-bold text-slate-900 truncate w-32"
                      title={landlord.name}
                    >
                      {landlord.name}
                    </h3>
                    <Badge variant="secondary" className="text-[10px] mt-0.5">
                      {landlord.type}
                    </Badge>
                  </div>
                </div>
                {landlord.performance === "high" && (
                  <div
                    className="p-1.5 bg-yellow-100 text-yellow-700 rounded-full"
                    title="Client VIP"
                  >
                    <Crown size={14} />
                  </div>
                )}
              </div>

              {/* Métriques Rapides */}
              <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-slate-100 mb-4 bg-slate-50/50 rounded-lg px-2">
                <div className="text-center border-r border-slate-200">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">
                    Biens
                  </p>
                  <p className="font-semibold text-slate-900">
                    {landlord.properties}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-slate-500 uppercase font-bold">
                    Com.
                  </p>
                  <p className="font-semibold text-purple-700">
                    {landlord.commission}%
                  </p>
                </div>
              </div>

              {/* Note IA */}
              {landlord.aiInsight && (
                <div
                  className={`mb-4 p-2 rounded-lg text-xs flex items-start gap-2 ${
                    landlord.status === "risk"
                      ? "bg-red-50 text-red-700"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {landlord.status === "risk" ? (
                    <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                  ) : (
                    <TrendingUp size={14} className="shrink-0 mt-0.5" />
                  )}
                  {landlord.aiInsight}
                </div>
              )}

              {/* Action Financière */}
              <div className="flex justify-between items-center pt-2">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">
                    Solde (Net)
                  </p>
                  <p
                    className={`font-bold text-lg ${
                      landlord.balance > 0 ? "text-green-600" : "text-slate-400"
                    }`}
                  >
                    {formatCurrency(landlord.balance)}
                  </p>
                </div>
                {landlord.balance > 0 ? (
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white h-8 px-3 text-xs"
                  >
                    Reverser
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 h-8 px-3 text-xs"
                  >
                    Détails <ArrowRight size={14} className="ml-1" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* MODALE CRÉATION MANDAT */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nouveau Mandat de Gestion"
      >
        <form className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              Nom du propriétaire
            </label>
            <Input placeholder="M. ou Mme..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Type</label>
              <select className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm">
                <option>Particulier</option>
                <option>Société (SCI)</option>
                <option>Indivision</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">
                Commission Agence (%)
              </label>
              <Input type="number" defaultValue="7" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              Email contact
            </label>
            <Input type="email" placeholder="contact@client.com" />
          </div>
          <div className="pt-4 flex justify-end gap-2 border-t border-slate-100 mt-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Annuler
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Créer le compte
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
