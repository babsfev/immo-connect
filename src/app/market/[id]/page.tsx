"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  Share2,
  Phone,
  Mail,
  CheckCircle2,
  MessageCircle,
  Copy,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Logo } from "@/components/ui/Logo";
import { formatCurrency, CURRENT_YEAR } from "@/lib/utils";
import { MARKET_LISTINGS } from "../data";
import { toast } from "sonner";

export default function MarketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const property = MARKET_LISTINGS.find((p) => p.id === Number(id));

  if (!property) return notFound();

  // --- FONCTION PARTAGE INTELLIGENTE ---
  const handleShare = async () => {
    const shareData = {
      title: `Immo-Connect : ${property.title}`,
      text: `Regarde ce bien incroyable à ${property.location} !`,
      url: window.location.href,
    };

    // Si le navigateur supporte le partage natif (Mobile)
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Erreur de partage", err);
      }
    } else {
      // Sinon (PC), on copie dans le presse-papier
      navigator.clipboard.writeText(window.location.href);
      toast.success("Lien copié !", {
        description: "Vous pouvez le coller dans vos messages.",
        icon: <Copy size={16} />,
      });
    }
  };

  // --- CONFIGURATION WHATSAPP ---
  // On nettoie le numéro et on prépare le message
  const agentPhoneClean = property.agent.phone.replace(/[^0-9]/g, "");
  const whatsappMessage = `Bonjour ${property.agent.name}, je suis intéressé par votre annonce "${property.title}" sur Immo-Connect. Est-elle toujours disponible ?`;
  const whatsappLink = `https://wa.me/${agentPhoneClean}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-24 md:pb-0">
      {/* NAVBAR SIMPLE */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 h-20 flex items-center px-6 justify-between">
        <Link
          href="/market"
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors"
        >
          <ArrowLeft size={20} />{" "}
          <span className="hidden sm:inline">Retour aux annonces</span>
        </Link>
        <div className="hidden md:block">
          <Logo className="h-8" />
        </div>
        <Button variant="outline" size="sm" onClick={handleShare}>
          <Share2 size={16} className="mr-2" /> Partager
        </Button>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* HEADER BIEN */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge
                className={`text-sm px-3 py-1 ${
                  property.type === "Vente" ? "bg-purple-600" : "bg-blue-600"
                } border-none text-white`}
              >
                {property.type}
              </Badge>
              <span className="text-slate-500 text-sm uppercase tracking-wider font-bold">
                {property.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 leading-tight">
              {property.title}
            </h1>
            <p className="text-lg text-slate-500 flex items-center gap-2">
              <MapPin className="text-orange-500 shrink-0" />{" "}
              {property.location}
            </p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-3xl font-extrabold text-blue-700">
              {formatCurrency(property.price)}
            </p>
            {property.type === "Location" && (
              <p className="text-slate-400 text-sm">/ mois</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* GAUCHE : PHOTOS & DETAILS */}
          <div className="lg:col-span-2 space-y-8">
            {/* Photo Principale */}
            <div
              className={`w-full h-[300px] md:h-[500px] rounded-3xl ${property.image} flex items-center justify-center relative overflow-hidden shadow-xl`}
            >
              <property.icon size={120} className="text-white/20" />
              <div className="absolute bottom-4 right-4 bg-black/60 text-white px-4 py-2 rounded-full text-xs backdrop-blur font-medium">
                1/5 Photos
              </div>
            </div>

            {/* Caractéristiques */}
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-6 grid grid-cols-3 gap-4 text-center divide-x divide-slate-100">
                {property.specs.beds && (
                  <div className="flex flex-col items-center gap-2">
                    <BedDouble size={24} className="text-blue-600" />
                    <div>
                      <p className="text-xl font-bold text-slate-900">
                        {property.specs.beds}
                      </p>
                      <p className="text-xs text-slate-500 uppercase font-bold">
                        Chambres
                      </p>
                    </div>
                  </div>
                )}
                {property.specs.baths && (
                  <div className="flex flex-col items-center gap-2">
                    <Bath size={24} className="text-blue-600" />
                    <div>
                      <p className="text-xl font-bold text-slate-900">
                        {property.specs.baths}
                      </p>
                      <p className="text-xs text-slate-500 uppercase font-bold">
                        Salles d'eau
                      </p>
                    </div>
                  </div>
                )}
                {property.specs.area && (
                  <div className="flex flex-col items-center gap-2">
                    <Maximize size={24} className="text-blue-600" />
                    <div>
                      <p className="text-xl font-bold text-slate-900">
                        {property.specs.area} m²
                      </p>
                      <p className="text-xs text-slate-500 uppercase font-bold">
                        Surface
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Description & Atouts */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                À propos de ce bien
              </h3>
              <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                {property.description}
              </p>

              <h4 className="font-bold text-slate-900 mb-4">Les plus</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.features?.map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl text-slate-700 border border-slate-100"
                  >
                    <div className="bg-green-100 p-1 rounded-full">
                      <CheckCircle2 size={14} className="text-green-600" />
                    </div>
                    <span className="font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* DROITE : CONTACT AGENT (Sticky Desktop) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <Card className="border-blue-100 shadow-xl overflow-hidden">
                <div className="bg-slate-900 p-6 text-white text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-[50px] opacity-20"></div>
                  <p className="text-sm opacity-80 mb-1 relative z-10">
                    Ce bien vous intéresse ?
                  </p>
                  <h3 className="text-xl font-bold relative z-10">
                    Contacter l'agence
                  </h3>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-100">
                    <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl border-4 border-white shadow-sm">
                      {property.agent.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-lg">
                        {property.agent.name}
                      </p>
                      <p className="text-sm text-slate-500">Agent Certifié</p>
                    </div>
                  </div>

                  {/* Bouton WhatsApp Desktop */}
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg shadow-lg shadow-green-100 mb-3">
                      <MessageCircle size={20} className="mr-2" /> Discuter sur
                      WhatsApp
                    </Button>
                  </a>

                  <Button
                    variant="outline"
                    className="w-full h-12 text-base"
                    onClick={() =>
                      (window.location.href = `tel:${property.agent.phone}`)
                    }
                  >
                    <Phone size={18} className="mr-2" /> {property.agent.phone}
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full text-slate-400 hover:text-slate-600"
                    onClick={() =>
                      (window.location.href = `mailto:${property.agent.email}`)
                    }
                  >
                    <Mail size={16} className="mr-2" /> Envoyer un email
                  </Button>
                </CardContent>
              </Card>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-800 text-center">
                🛡️ <strong>Sécurité :</strong> Ne versez jamais d'argent avant
                d'avoir visité le bien.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BARRE D'ACTION MOBILE (Sticky Bottom) */}
      {/* Visible uniquement sur mobile (md:hidden) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 md:hidden z-50 flex items-center justify-between safe-area-pb shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col">
          <p className="text-[10px] text-slate-400 font-bold uppercase">Prix</p>
          <p className="text-xl font-extrabold text-blue-700 leading-none">
            {formatCurrency(property.price)}
          </p>
        </div>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
          <Button className="bg-green-600 text-white rounded-full px-6 h-12 shadow-lg flex items-center gap-2">
            <MessageCircle size={20} /> WhatsApp
          </Button>
        </a>
      </div>

      <footer className="bg-white border-t border-slate-200 py-12 text-center text-slate-500 text-sm mt-12 hidden md:block">
        <p>&copy; {CURRENT_YEAR} Immo-Connect.</p>
      </footer>
    </div>
  );
}
