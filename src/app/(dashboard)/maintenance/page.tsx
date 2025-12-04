"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Wrench,
  Sparkles,
  ArrowRight,
  User,
  MapPin,
  Zap,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Input from "@/components/ui/form/Input";
import { formatCurrency } from "@/lib/utils";
import { Modal } from "@/components/ui/Modal";

// Données Mockées "Intelligentes"
const tickets = [
  {
    id: 1,
    title: "Fuite d'eau importante SDB",
    property: "Appartement T3",
    tenant: "M. Diop",
    date: "Il y a 2h",
    priority: "Urgent",
    status: "todo",
    aiCost: 45000,
    sla: "2h restants",
    suggestion: "Plombier Express (Dispo)",
  },
  {
    id: 2,
    title: "Panne Climatiseur Salon",
    property: "Villa Corniche",
    tenant: "Fatou Sow",
    date: "Hier",
    priority: "Moyenne",
    status: "progress",
    aiCost: 25000,
    sla: "J+1",
    provider: "Froid Clim Pro",
  },
  {
    id: 3,
    title: "Remplacement Serrure Entrée",
    property: "Studio Almadies",
    tenant: "Sarah Ndiaye",
    date: "15 Nov",
    priority: "Faible",
    status: "done",
    realCost: 15000,
    provider: "Serrurier du Coin",
  },
  {
    id: 4,
    title: "Peinture Façade (Humidité)",
    property: "Immeuble Le Plateau",
    tenant: "Syndic",
    date: "Il y a 3 jours",
    priority: "Moyenne",
    status: "todo",
    aiCost: 350000,
    sla: "J+5",
    suggestion: "Bati-Peint (Meilleur devis)",
  },
];

const columns = [
  {
    id: "todo",
    title: "À Traiter (Nouveaux)",
    color: "border-t-4 border-red-500",
  },
  {
    id: "progress",
    title: "En Cours / Prestataire",
    color: "border-t-4 border-blue-500",
  },
  {
    id: "done",
    title: "Terminé & Vérifié",
    color: "border-t-4 border-green-500",
  },
];

export default function MaintenancePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6 pb-10 h-[calc(100vh-100px)] flex flex-col animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Maintenance Intelligente
          </h1>
          <p className="text-slate-500">
            Suivi des incidents, prestataires et coûts.
          </p>
        </div>
        <Button
          className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-200"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={18} className="mr-2" /> Créer un ticket
        </Button>
      </div>

      {/* SMART INSIGHT (Analyse Prédictive) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Carte IA : Analyse Récurrence */}
        <div className="bg-linear-to-r from-purple-50 to-white p-4 rounded-xl border border-purple-100 flex items-start gap-3 shadow-sm relative overflow-hidden group">
          <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-4">
            <Wrench size={100} />
          </div>
          <div className="p-2 bg-white rounded-lg shadow-sm text-purple-600 z-10">
            <Sparkles size={18} />
          </div>
          <div className="z-10">
            <h4 className="text-sm font-bold text-purple-900">
              Détection d'anomalie
            </h4>
            <p className="text-sm text-purple-700 mt-1 leading-relaxed">
              Attention : <strong>3ème fuite signalée</strong> en 2 mois sur la
              colonne d'eau de "L'Immeuble Le Plateau". Une inspection générale
              est recommandée pour éviter un dégât des eaux majeur.
            </p>
            <Button
              size="sm"
              variant="outline"
              className="mt-3 bg-white text-purple-700 border-purple-200 hover:bg-purple-50 h-8 text-xs"
            >
              Créer mission d'inspection
            </Button>
          </div>
        </div>

        {/* Carte Coûts Prévisionnels */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Coût Estimé (En cours)
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                {formatCurrency(420000)}
              </h3>
            </div>
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
              <Zap size={20} />
            </div>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4 overflow-hidden">
            <div
              className="bg-orange-500 h-full"
              style={{ width: "65%" }}
            ></div>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            65% du budget maintenance mensuel consommé.
          </p>
        </div>
      </div>

      {/* FILTRES */}
      <div className="flex gap-4 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <Input
            placeholder="Rechercher un ticket, un bien..."
            className="pl-10 border-none shadow-none focus:ring-0 bg-transparent"
          />
        </div>
        <div className="w-px bg-slate-200 my-1"></div>
        <Button variant="ghost" className="text-slate-600">
          <Filter size={16} className="mr-2" /> Filtrer par urgence
        </Button>
      </div>

      {/* KANBAN BOARD */}
      <div className="flex-1 flex gap-6 overflow-x-auto pb-4 min-h-[400px]">
        {columns.map((col) => (
          <div
            key={col.id}
            className="flex-1 min-w-[320px] flex flex-col gap-4 bg-slate-50/50 rounded-xl p-3 border border-slate-100"
          >
            {/* Colonne Header */}
            <div className="flex justify-between items-center px-1 mb-2">
              <span className="font-bold text-slate-700 text-sm">
                {col.title}
              </span>
              <Badge
                variant="secondary"
                className="bg-white shadow-sm text-slate-500"
              >
                {tickets.filter((t) => t.status === col.id).length}
              </Badge>
            </div>

            {/* Liste des cartes */}
            <div className="flex-1 space-y-3 overflow-y-auto pr-1">
              {tickets
                .filter((t) => t.status === col.id)
                .map((ticket) => (
                  <Card
                    key={ticket.id}
                    className={`group cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 border-l-0 border-r-0 border-b-0 ${col.color}`}
                  >
                    <CardContent className="p-4">
                      {/* Header Carte */}
                      <div className="flex justify-between items-start mb-3">
                        <Badge
                          variant={
                            ticket.priority === "Urgent"
                              ? "danger"
                              : ticket.priority === "Moyenne"
                              ? "warning"
                              : "secondary"
                          }
                          className="text-[10px] px-2"
                        >
                          {ticket.priority}
                        </Badge>
                        <button className="text-slate-400 hover:text-slate-600">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>

                      {/* Titre & Infos */}
                      <h4 className="font-bold text-slate-900 text-sm mb-1 leading-tight">
                        {ticket.title}
                      </h4>
                      <div className="flex flex-col gap-1 text-xs text-slate-500 mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin size={10} /> {ticket.property}
                        </span>
                        <span className="flex items-center gap-1">
                          <User size={10} /> {ticket.tenant}
                        </span>
                      </div>

                      {/* Estimation IA / SLA */}
                      {ticket.status === "todo" && (
                        <div className="bg-orange-50 p-2 rounded-lg mb-3 border border-orange-100 flex flex-col gap-1">
                          <div className="flex justify-between text-[10px] font-medium text-orange-800">
                            <span>Coût estimé IA</span>
                            <span>{formatCurrency(ticket.aiCost || 0)}</span>
                          </div>
                          {ticket.sla && (
                            <div className="flex items-center gap-1 text-[10px] text-red-600 font-bold animate-pulse">
                              <Clock size={10} /> SLA: {ticket.sla}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Footer Prestataire */}
                      <div className="pt-3 border-t border-slate-50 flex justify-between items-center mt-auto">
                        {ticket.provider ? (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-[9px] font-bold text-blue-700">
                              PR
                            </div>
                            <span className="text-xs text-blue-700 font-medium">
                              {ticket.provider}
                            </span>
                          </div>
                        ) : ticket.suggestion ? (
                          <div className="flex items-center gap-1 text-[10px] text-green-600 bg-green-50 px-2 py-1 rounded-full">
                            <Sparkles size={10} /> Suggestion:{" "}
                            {ticket.suggestion}
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400">
                            Non assigné
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400">
                          {ticket.date}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            {col.id === "todo" && (
              <button className="w-full py-2 text-sm font-medium text-slate-400 hover:text-slate-600 border border-dashed border-slate-300 rounded-lg hover:bg-white transition-all">
                + Ajouter rapide
              </button>
            )}
          </div>
        ))}
      </div>

      {/* MODALE CRÉATION TICKET */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Signaler un incident"
      >
        <form className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              Titre de l'incident
            </label>
            <Input placeholder="Ex: Panne chauffe-eau..." autoFocus />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                Bien concerné
              </label>
              <select className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm">
                <option>Appartement T3</option>
                <option>Villa Corniche</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                Priorité
              </label>
              <select className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm">
                <option>Normale</option>
                <option>Urgente</option>
                <option>Critique (SLA 4h)</option>
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              Assigner un prestataire (Optionnel)
            </label>
            <select className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm">
              <option value="">-- Choisir ou laisser l'IA suggérer --</option>
              <option>Plombier Express</option>
              <option>Serrurier 24/7</option>
            </select>
          </div>

          {/* Upload Photo */}
          <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center cursor-pointer hover:bg-slate-50">
            <p className="text-xs text-slate-500">
              Ajouter une photo pour analyse IA
            </p>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-slate-100 mt-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Annuler
            </Button>
            <Button className="bg-orange-500 text-white hover:bg-orange-600">
              Créer le ticket
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
