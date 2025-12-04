"use client";

import React from "react";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Gavel,
  FileCheck,
  Banknote,
  TrendingUp,
  AlertCircle,
  Check,
  X,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Input from "@/components/ui/form/Input";
import { formatCurrency } from "@/lib/utils";

// Mock Data : Pipeline de Vente
const pipeline = [
  {
    id: "stage-offer",
    title: "Offres Reçues",
    color: "border-t-4 border-orange-500",
    deals: [
      {
        id: 1,
        property: "Terrain Diamniadio",
        client: "M. Fall",
        price: 15000000,
        date: "Hier",
        prob: 40,
        commission: 750000,
        status: "new_offer",
        insight: "Offre au prix demandé !",
      },
      {
        id: 2,
        property: "Villa Saly",
        client: "Mme. Diop",
        price: 85000000,
        date: "Il y a 3j",
        prob: 20,
        commission: 4250000,
        status: "negotiation",
        insight: "Offre basse (-10%)",
      },
    ],
  },
  {
    id: "stage-legal",
    title: "Notaire / Compromis",
    color: "border-t-4 border-blue-500",
    deals: [
      {
        id: 3,
        property: "Appartement Plateau",
        client: "Sci Horizon",
        price: 45000000,
        date: "Signé le 15 Nov",
        prob: 90,
        commission: 2250000,
        status: "waiting_act",
        insight: "Attente retour notaire",
      },
    ],
  },
  {
    id: "stage-closed",
    title: "Acté / Vendu",
    color: "border-t-4 border-green-500",
    deals: [],
  },
];

export default function SalesPage() {
  // Calculs Financiers
  const totalPotentialCommission = pipeline
    .flatMap((p) => p.deals)
    .reduce((acc, deal) => acc + deal.commission, 0);
  const activeDeals = pipeline.flatMap((p) => p.deals).length;

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Transactions</h1>
          <p className="text-slate-500">Pipeline de vente et suivi notarial.</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-200">
          <Plus size={18} className="mr-2" /> Nouvelle Opportunité
        </Button>
      </div>

      {/* SMART KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-white border-slate-200 p-4 flex items-center gap-4 shadow-sm">
          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Commissions Potentielles
            </p>
            <p className="text-2xl font-bold text-slate-900">
              {formatCurrency(totalPotentialCommission)}
            </p>
          </div>
        </Card>
        <Card className="bg-white border-slate-200 p-4 flex items-center gap-4 shadow-sm">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <Gavel size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Chez le Notaire
            </p>
            <p className="text-2xl font-bold text-slate-900">1 Dossier</p>
          </div>
        </Card>
        <Card className="bg-white border-slate-200 p-4 flex items-center gap-4 shadow-sm">
          <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Offres en attente
            </p>
            <p className="text-2xl font-bold text-slate-900">2</p>
          </div>
        </Card>
      </div>

      {/* FILTRES */}
      <div className="flex gap-4 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <Input
            placeholder="Rechercher un bien, un acheteur..."
            className="pl-10 border-none shadow-none focus:ring-0 bg-transparent"
          />
        </div>
        <div className="w-px bg-slate-200 my-1"></div>
        <Button variant="ghost" className="text-slate-600">
          <Filter size={16} className="mr-2" /> Filtres
        </Button>
      </div>

      {/* KANBAN PIPELINE */}
      <div className="flex-1 flex gap-6 overflow-x-auto pb-4 min-h-[400px]">
        {pipeline.map((col) => (
          <div
            key={col.id}
            className={`flex-1 min-w-[320px] flex flex-col gap-4 p-3 rounded-xl bg-slate-50/50 border border-slate-100`}
          >
            <div className="flex justify-between items-center px-1 mb-2">
              <span className="font-bold text-slate-700 text-sm uppercase tracking-wide">
                {col.title}
              </span>
              <Badge variant="secondary" className="bg-white shadow-sm">
                {col.deals.length}
              </Badge>
            </div>

            <div className="flex-1 space-y-3">
              {col.deals.map((deal) => (
                <Card
                  key={deal.id}
                  className={`group cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 border-l-0 border-r-0 border-b-0 ${col.color}`}
                >
                  <CardContent className="p-4">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-2">
                      <Badge
                        variant="outline"
                        className="bg-slate-50 text-[10px]"
                      >
                        {deal.date}
                      </Badge>
                      <button className="text-slate-300 hover:text-slate-600">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>

                    {/* Infos */}
                    <h4 className="font-bold text-slate-900 text-sm mb-1">
                      {deal.property}
                    </h4>
                    <p className="text-xs text-slate-500 mb-3">
                      Client :{" "}
                      <span className="font-medium text-slate-700">
                        {deal.client}
                      </span>
                    </p>

                    {/* Prix */}
                    <div className="flex justify-between items-center mb-3 bg-slate-50 p-2 rounded-lg">
                      <span className="text-xs font-bold text-slate-500">
                        Offre
                      </span>
                      <span className="text-sm font-extrabold text-slate-900">
                        {formatCurrency(deal.price)}
                      </span>
                    </div>

                    {/* Probabilité & Insight */}
                    <div className="mb-3">
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-slate-400">
                          Probabilité de succès
                        </span>
                        <span
                          className={`font-bold ${
                            deal.prob > 50
                              ? "text-green-600"
                              : "text-orange-500"
                          }`}
                        >
                          {deal.prob}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            deal.prob > 50 ? "bg-green-500" : "bg-orange-500"
                          }`}
                          style={{ width: `${deal.prob}%` }}
                        ></div>
                      </div>
                      {deal.insight && (
                        <p className="text-[10px] text-blue-600 mt-2 flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>{" "}
                          {deal.insight}
                        </p>
                      )}
                    </div>

                    {/* Actions Rapides */}
                    {col.id === "stage-offer" && (
                      <div className="flex gap-2 pt-3 border-t border-slate-50">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs flex-1 border-red-100 text-red-600 hover:bg-red-50"
                        >
                          Refuser
                        </Button>
                        <Button
                          size="sm"
                          className="h-7 text-xs flex-1 bg-green-600 text-white hover:bg-green-700 border-none"
                        >
                          Accepter
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              {col.deals.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-xs border-2 border-dashed border-slate-200 rounded-xl">
                  Aucun dossier ici
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
