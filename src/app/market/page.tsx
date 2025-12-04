"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  ArrowRight,
  Filter,
  Users,
  User,
  Zap,
  X,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Input from "@/components/ui/form/Input";
import { Logo } from "@/components/ui/Logo";
import { formatCurrency, CURRENT_YEAR } from "@/lib/utils";
import { MARKET_LISTINGS } from "./data"; // Assure-toi d'avoir ce fichier ou de mettre les données ici

// Mock Data Coloc (À déplacer dans data.ts idéalement)
const colocListings = [
  {
    id: 101,
    title: "Chambre Master avec Balcon",
    location: "Mermoz, Dakar",
    price: 200000,
    type: "Colocation",
    category: "Chambre",
    image: "bg-indigo-200",
    specs: { area: 20, privateBath: true, balcony: true },
    lifestyle: { gender: "Mixte", work: "Pro" },
    utilities: ["Wifi", "Ménage"],
  },
  {
    id: 102,
    title: "Chambre Étudiant Calme",
    location: "Fann Hock",
    price: 125000,
    type: "Colocation",
    category: "Chambre",
    image: "bg-teal-100",
    specs: { area: 12, privateBath: false, balcony: false },
    lifestyle: { gender: "Filles uniquement", work: "Étudiant" },
    utilities: ["Eau"],
  },
];

export default function MarketPage() {
  const [mode, setMode] = useState<"classic" | "coloc">("classic");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("Tout");
  const [catFilter, setCatFilter] = useState("Tout");

  // Filtrage Classic
  const filteredClassic = MARKET_LISTINGS.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "Tout" || item.type === typeFilter;
    const matchesCat = catFilter === "Tout" || item.category === catFilter;
    return matchesSearch && matchesType && matchesCat;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* NAVBAR */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 h-20 flex items-center px-6 justify-between">
        <Link href="/">
          <Logo className="h-10" />
        </Link>
        <div className="flex gap-3">
          <Link href="/login">
            <Button variant="ghost">Connexion</Button>
          </Link>
          <Link href="/register">
            <Button className="bg-slate-900 text-white hover:bg-slate-800">
              Publier
            </Button>
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <div className="bg-slate-900 py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-blue-600/30 via-transparent to-transparent"></div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 relative z-10">
          {mode === "classic"
            ? "Le marché immobilier en direct."
            : "Trouvez votre colocataire idéal."}
        </h1>

        {/* SWITCHER */}
        <div className="flex justify-center mb-8 relative z-10">
          <div className="bg-white/10 p-1 rounded-full flex backdrop-blur-md border border-white/10">
            <button
              onClick={() => setMode("classic")}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                mode === "classic"
                  ? "bg-white text-slate-900 shadow-md"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Location / Vente
            </button>
            <button
              onClick={() => setMode("coloc")}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                mode === "coloc"
                  ? "bg-orange-500 text-white shadow-md"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <Users size={16} /> Colocation
            </button>
          </div>
        </div>

        {/* BARRE DE RECHERCHE HYBRIDE */}
        <div className="max-w-5xl mx-auto bg-white p-3 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-3 relative z-10">
          <div className="flex-1 relative">
            <MapPin
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />
            <Input
              className="pl-12 border-none shadow-none text-base h-14 bg-slate-50 rounded-xl focus:ring-0"
              placeholder="Ville, Quartier (ex: Almadies)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {mode === "classic" ? (
            <>
              <div className="w-px bg-slate-200 hidden md:block my-2"></div>
              <div className="flex-1 relative">
                <select
                  className="w-full h-14 bg-slate-50 border-none text-slate-600 px-4 rounded-xl outline-none appearance-none cursor-pointer"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="Tout">Tout type</option>
                  <option value="Location">Location</option>
                  <option value="Vente">Vente</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <div className="w-px bg-slate-200 hidden md:block my-2"></div>
              <div className="flex-1 relative">
                <select className="w-full h-14 bg-slate-50 border-none text-slate-600 px-4 rounded-xl outline-none appearance-none cursor-pointer">
                  <option>Budget Max</option>
                  <option>150.000 FCFA</option>
                  <option>300.000 FCFA</option>
                </select>
              </div>
            </>
          )}

          <Button className="bg-orange-500 hover:bg-orange-600 text-white h-14 px-10 rounded-xl text-lg shadow-lg">
            <Search size={22} />
          </Button>
        </div>
      </div>

      {/* RÉSULTATS */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">
            {mode === "classic"
              ? `${filteredClassic.length} Annonces`
              : "Chambres disponibles"}
          </h2>
          {(searchTerm || typeFilter !== "Tout") && (
            <Button
              variant="ghost"
              onClick={() => {
                setSearchTerm("");
                setTypeFilter("Tout");
              }}
              className="text-red-500"
            >
              <X size={16} className="mr-2" /> Effacer filtres
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* RENDU CONDITIONNEL */}
          {mode === "classic"
            ? filteredClassic.map((item) => (
                <Link key={item.id} href={`/market/${item.id}`}>
                  <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden border-slate-200 h-full flex flex-col">
                    <div
                      className={`h-64 w-full ${item.image} relative flex items-center justify-center overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                      <item.icon
                        size={64}
                        className="text-white/30 group-hover:scale-110 transition-transform duration-700"
                      />
                      <Badge
                        className={`absolute top-4 left-4 ${
                          item.type === "Vente"
                            ? "bg-purple-600"
                            : "bg-blue-600"
                        } text-white border-none shadow-md text-sm px-3 py-1`}
                      >
                        {item.type}
                      </Badge>
                      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold text-slate-900 shadow-sm uppercase tracking-wide">
                        {item.category}
                      </div>
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="mb-3">
                        <h3 className="font-bold text-xl text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-slate-500 text-sm flex items-center gap-1 mt-1">
                          <MapPin size={16} className="text-orange-500" />{" "}
                          {item.location}
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-2 py-4 border-t border-slate-100 mb-4">
                        {item.specs.beds && (
                          <div className="flex flex-col items-center text-xs text-slate-500">
                            <BedDouble
                              size={18}
                              className="mb-1 text-slate-400"
                            />{" "}
                            {item.specs.beds} Lits
                          </div>
                        )}
                        {item.specs.baths && (
                          <div className="flex flex-col items-center text-xs text-slate-500">
                            <Bath size={18} className="mb-1 text-slate-400" />{" "}
                            {item.specs.baths} Sdb
                          </div>
                        )}
                        {item.specs.area && (
                          <div className="flex flex-col items-center text-xs text-slate-500">
                            <Maximize
                              size={18}
                              className="mb-1 text-slate-400"
                            />{" "}
                            {item.specs.area} m²
                          </div>
                        )}
                      </div>
                      <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-100">
                        <span className="font-extrabold text-blue-700 text-xl">
                          {formatCurrency(item.price)}
                        </span>
                        <Button
                          size="icon"
                          className="rounded-full bg-slate-900 text-white hover:bg-orange-500 transition-colors h-10 w-10 shadow-md"
                        >
                          <ArrowRight size={20} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            : colocListings.map((item) => (
                <div
                  key={item.id}
                  className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden rounded-2xl bg-white border border-slate-200 h-full flex flex-col"
                >
                  <div
                    className={`h-56 w-full ${item.image} relative flex items-center justify-center`}
                  >
                    <div className="absolute top-4 left-4 flex gap-2">
                      {item.specs.balcony && (
                        <Badge className="bg-green-500 text-white border-none text-xs">
                          Balcon
                        </Badge>
                      )}
                      {item.specs.privateBath && (
                        <Badge className="bg-blue-500 text-white border-none text-xs">
                          SDB Privée
                        </Badge>
                      )}
                    </div>
                    <Users size={64} className="text-white/30" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-slate-900 line-clamp-1">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-slate-500 text-sm flex items-center gap-1 mb-4">
                      <MapPin size={14} className="text-orange-500" />{" "}
                      {item.location}
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center gap-2 text-xs text-slate-700">
                        <User size={14} className="text-purple-500" />{" "}
                        {item.lifestyle.gender}
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center gap-2 text-xs text-slate-700">
                        <Zap size={14} className="text-yellow-500" />{" "}
                        {item.utilities.join(", ")}
                      </div>
                    </div>
                    <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-100">
                      <div>
                        <span className="font-extrabold text-blue-700 text-xl">
                          {formatCurrency(item.price)}
                        </span>
                        <span className="text-xs text-slate-400">
                          {" "}
                          / chambre
                        </span>
                      </div>
                      <Button
                        size="sm"
                        className="rounded-full bg-slate-900 text-white"
                      >
                        Détails
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>

      <footer className="bg-white border-t border-slate-200 py-12 text-center text-slate-500 text-sm">
        <p>&copy; {CURRENT_YEAR} Immo-Connect.</p>
      </footer>
    </div>
  );
}
