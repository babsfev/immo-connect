"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Plus,
  Phone,
  Calendar,
  FileText,
  Check,
  User,
  Briefcase,
  MoreHorizontal,
  Sparkles,
  Building2,
  Wallet,
  Mail,
  ArrowRight,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Input from "@/components/ui/form/Input";
import { Modal } from "@/components/ui/Modal";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

// Données Mockées
const columns = [
  {
    id: "review",
    title: "Priorité 1 : Analyse",
    color: "border-purple-600",
    bg: "bg-purple-50/40",
    candidates: [
      {
        id: "4",
        name: "Jean-Marc Ndiaye",
        job: "Consultant",
        income: 2000000,
        property: "Villa Corniche",
        date: "Dossier complet",
        score: 92,
        docs: 4,
        tags: ["Expat", "Solide"],
        avatarColor: "bg-purple-100 text-purple-700",
      },
    ],
  },
  {
    id: "visit",
    title: "Priorité 2 : Visites",
    color: "border-orange-500",
    bg: "bg-orange-50/40",
    candidates: [
      {
        id: "3",
        name: "Couple Diop",
        job: "Cadres",
        income: 1200000,
        property: "Villa Corniche",
        date: "Demain 15h00",
        score: 95,
        visitConfirmed: true,
        tags: ["Top Dossier"],
        avatarColor: "bg-orange-100 text-orange-700",
      },
    ],
  },
  {
    id: "new",
    title: "Nouveaux Contacts",
    color: "border-blue-500",
    bg: "bg-blue-50/40",
    candidates: [
      {
        id: "2",
        name: "Paul Mendy",
        job: "Enseignant",
        income: 450000,
        property: "Studio Almadies",
        date: "Hier",
        score: 82,
        tags: ["Garants"],
        avatarColor: "bg-blue-100 text-blue-700",
      },
      {
        id: "1",
        name: "Aminata Fall",
        job: "Commerçante",
        income: 800000,
        property: "Apt T3",
        date: "Auj. 10:00",
        score: 65,
        tags: ["Revenus variables"],
        avatarColor: "bg-slate-100 text-slate-600",
      },
    ],
  },
];

export default function ApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isProspectModalOpen, setIsProspectModalOpen] = useState(false);

  const handleAISummaryClick = () => {
    toast.info("Analyse IA", {
      description: "Le dossier de M. Ndiaye est prêt à être signé.",
    });
  };

  const handleAddProspect = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Prospect ajouté !", {
      description:
        "Il apparaît maintenant dans la colonne 'Nouveaux Contacts'.",
    });
    setIsProspectModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-10 h-[calc(100vh-100px)] flex flex-col animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Candidatures</h1>
          <p className="text-slate-500">Pipeline commercial intelligent.</p>
        </div>
        <Button
          onClick={() => setIsProspectModalOpen(true)}
          className="bg-blue-600 text-white shadow-lg"
        >
          <Plus size={18} className="mr-2" /> Ajouter
        </Button>
      </div>

      {/* BANDEAU IA */}
      <div className="bg-white border border-slate-200 p-3 rounded-xl flex items-center justify-between shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
            <Sparkles size={16} />
          </div>
          <p className="text-sm text-slate-700">
            <span className="font-bold text-indigo-700">Focus :</span> 1 dossier
            en phase finale. Potentiel :{" "}
            <strong>{formatCurrency(600000)}</strong>.
          </p>
        </div>
      </div>

      {/* KANBAN (VERTICAL / CLASSIQUE) */}
      <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
        {columns.map((col) => (
          <div
            key={col.id}
            className={`flex-1 min-w-[320px] flex flex-col gap-3 p-3 rounded-2xl ${col.bg} border-t-4 ${col.color}`}
          >
            {/* Colonne Header */}
            <div className="flex justify-between items-center px-1 mb-2">
              <span className="font-bold text-slate-800 text-sm uppercase tracking-wide">
                {col.title}
              </span>
              <Badge
                variant="secondary"
                className="bg-white shadow-sm text-slate-600 font-bold"
              >
                {col.candidates.length}
              </Badge>
            </div>

            {/* Liste des cartes */}
            <div className="flex-1 space-y-3 overflow-y-auto pr-1">
              {col.candidates.map((candidate) => (
                <div key={candidate.id} className="relative">
                  <Link
                    href={`/applications/${candidate.id}`}
                    className="block"
                  >
                    <Card className="group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all bg-white border-slate-200/80 pb-10">
                      {" "}
                      {/* pb-10 pour laisser place aux boutons */}
                      <CardContent className="p-4">
                        {/* Header Carte (Avatar + Nom) */}
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ${candidate.avatarColor}`}
                            >
                              {candidate.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-900 text-sm leading-tight">
                                {candidate.name}
                              </h4>
                              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                <Briefcase size={10} /> {candidate.job}
                              </p>
                            </div>
                          </div>
                          {/* Score */}
                          <div
                            className={`text-xs font-bold px-2 py-0.5 rounded flex items-center justify-end gap-1 ${
                              candidate.score >= 80
                                ? "text-green-600 bg-green-50"
                                : "text-orange-600 bg-orange-50"
                            }`}
                          >
                            {candidate.score}%
                          </div>
                        </div>

                        {/* Infos Bien (Badge large) */}
                        <div className="bg-slate-50 p-2 rounded-lg mb-3 border border-slate-100 flex justify-between items-center">
                          <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                            <Building2 size={12} className="text-blue-500" />{" "}
                            {candidate.property}
                          </div>
                          <span className="text-[10px] text-slate-400 font-bold">
                            {formatCurrency(candidate.income)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  {/* --- BOUTONS D'ACTION (Overlay en bas de carte) --- */}
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toast.info("Appel lancé...");
                      }}
                      className="flex-1 h-8 flex items-center justify-center gap-1 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-md border border-slate-200 transition-colors"
                    >
                      <Phone size={12} /> Appeler
                    </button>
                    <Link
                      href={`/applications/${candidate.id}`}
                      className="flex-1 h-8 flex items-center justify-center gap-1 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors"
                    >
                      Détails <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsProspectModalOpen(true)}
              className="w-full py-3 text-xs font-medium text-slate-400 hover:text-slate-600 border-2 border-dashed border-slate-300 rounded-xl hover:border-slate-400 transition-all bg-white/50"
            >
              + Ajouter un prospect
            </button>
          </div>
        ))}
      </div>

      {/* MODALE AJOUT */}
      <Modal
        isOpen={isProspectModalOpen}
        onClose={() => setIsProspectModalOpen(false)}
        title="Nouveau Prospect"
      >
        <form className="space-y-4" onSubmit={handleAddProspect}>
          <div className="space-y-1">
            <label className="text-sm font-medium">Nom</label>
            <Input placeholder="Nom complet" autoFocus />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Contact</label>
            <Input placeholder="Email ou Tél" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Bien</label>
            <Input placeholder="Rechercher un bien..." />
          </div>
          <div className="flex justify-end pt-4">
            <Button className="bg-blue-600 text-white">Enregistrer</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
