"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalIcon,
  Clock,
  MapPin,
  User,
  Plus,
  Share2,
  Filter,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  MoreHorizontal,
  Phone,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import Input from "@/components/ui/form/Input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// --- DONNÉES DE DÉMO ---
// Note : Le jour 12 a un conflit (3 RDV), mais si nous sommes le 22, l'IA l'ignorera.
const getEvents = () => [
  {
    id: 1,
    day: 5,
    time: "09:00",
    title: "État des lieux",
    type: "edl",
    contact: "M. Diop",
    location: "Villa Corniche",
    status: "confirmed",
    link: "/tenants/1",
  },
  {
    id: 2,
    day: 12,
    time: "11:30",
    title: "Visite Prospect",
    type: "visit",
    contact: "Sarah N.",
    location: "Apt T3",
    status: "pending",
    aiNote: "Trajet optimisé",
    link: "/applications/1",
  },
  {
    id: 3,
    day: 12,
    time: "14:00",
    title: "Plombier",
    type: "work",
    contact: "Ent. Fall",
    location: "Villa Corniche",
    status: "confirmed",
    link: "/maintenance",
  },
  {
    id: 4,
    day: 12,
    time: "16:00",
    title: "Signature",
    type: "admin",
    contact: "Agence",
    location: "Bureau",
    status: "confirmed",
    link: "/documents",
  },

  // Événements FUTURS (Après le 22)
  {
    id: 5,
    day: 25,
    title: "Loyer Attendu",
    type: "finance",
    amount: "450k",
    status: "info",
    link: "/payments",
  },
  {
    id: 6,
    day: 28,
    title: "Fin Bail Studio",
    type: "admin",
    status: "alert",
    link: "/tenants/2",
  },
];

export default function CalendarPage() {
  const router = useRouter();

  // 1. États
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());
  const [isModalOpen, setIsModalOpen] = useState(false);

  // État pour "Maintenant" (évite les erreurs d'hydratation)
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
  }, []);

  // 2. Calculs de dates
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let firstDayIndex = new Date(year, month, 1).getDay();
  firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  const events = getEvents();

  // --- LOGIQUE IA : FILTRAGE FUTUR ---
  let aiSuggestion = "Analyse en cours...";
  let showOptimizeButton = false;

  if (now) {
    const todayDay = now.getDate();
    // Est-ce qu'on regarde le mois actuel ?
    const isCurrentMonthView =
      year === now.getFullYear() && month === now.getMonth();
    // Est-ce qu'on regarde un mois futur ?
    const isFutureMonthView =
      year > now.getFullYear() ||
      (year === now.getFullYear() && month > now.getMonth());

    // L'IA ne regarde que les événements "actifs" (Futurs ou Aujourd'hui)
    const futureEvents = events.filter((e) => {
      if (isFutureMonthView) return true; // Tout est dans le futur
      if (isCurrentMonthView) return e.day >= todayDay; // Jours >= aujourd'hui
      return false; // Mois passés = ignorés
    });

    // Analyse sur les données filtrées
    const futureVisits = futureEvents.filter((e) => e.type === "visit");
    const futureAlerts = futureEvents.filter((e) => e.status === "alert");

    // Conflits futurs uniquement
    const daysWithConflict = futureEvents.reduce((acc: number[], e) => {
      const count = futureEvents.filter((x) => x.day === e.day).length;
      if (count >= 3 && !acc.includes(e.day)) acc.push(e.day);
      return acc;
    }, []);

    // Génération du message
    if (daysWithConflict.length > 0) {
      const conflictDay = daysWithConflict[0];
      aiSuggestion = `⚠️ Conflit futur le ${conflictDay} : ${
        futureEvents.filter((e) => e.day === conflictDay).length
      } RDV prévus. L'IA recommande une réorganisation.`;
      showOptimizeButton = true;
    } else if (futureAlerts.length > 0) {
      aiSuggestion = `🔔 Rappel : ${futureAlerts.length} échéance(s) importante(s) à venir (ex: Fin de bail le ${futureAlerts[0].day}).`;
    } else if (futureVisits.length >= 2) {
      aiSuggestion = `💡 Conseil : ${futureVisits.length} visites à venir. Essayez de les grouper pour gagner du temps.`;
      showOptimizeButton = true;
    } else {
      aiSuggestion =
        "✅ Planning fluide pour les jours à venir. Aucune action urgente.";
    }
  }
  // --- FIN LOGIQUE IA ---

  const selectedDateEvents = events.filter((e) => e.day === selectedDay);

  // Navigation
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDay(today.getDate());
    setTimeout(() => {
      document
        .getElementById(`day-${today.getDate()}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      toast.info("Retour à aujourd'hui", {
        description: `Nous sommes le ${today.toLocaleDateString()}`,
      });
    }, 100);
  };

  // Live Clock
  useEffect(() => {
    const checkDate = () => {
      const d = new Date();
      if (d.getDate() !== currentDate.getDate()) {
        setCurrentDate(d);
        setSelectedDay(d.getDate());
      }
    };
    const timer = setInterval(checkDate, 60000);
    return () => clearInterval(timer);
  }, [currentDate]);

  // Auto-Scroll
  useEffect(() => {
    setTimeout(() => {
      const d = new Date();
      const el = document.getElementById(`day-${d.getDate()}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 500);
  }, []);

  const monthLabel = new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
  }).format(currentDate);
  const formattedMonthLabel =
    monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1);

  const getEventColor = (type: string) => {
    switch (type) {
      case "visit":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "work":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "finance":
        return "bg-green-100 text-green-700 border-green-200";
      case "edl":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const handleVoir = (link?: string) => {
    if (link) router.push(link);
    else toast.info("Détails non disponibles");
  };

  const handleAction = (action: string, title: string) => {
    toast.success(`${action} effectuée !`, { description: title });
  };

  return (
    <div className="space-y-6 pb-10 h-[calc(100vh-100px)] flex flex-col animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex flex-col gap-4 shrink-0">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Agenda</h1>
            <p className="text-slate-500">
              Planification optimisée de vos interventions.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="hidden sm:flex bg-white"
              onClick={goToToday}
            >
              Aujourd'hui
            </Button>
            <Button
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={18} className="mr-2" /> Nouveau
            </Button>
          </div>
        </div>

        {/* Bannière IA */}
        <div className="bg-linear-to-r from-purple-50 to-blue-50 border border-purple-100 p-3 rounded-xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg text-purple-600 shadow-sm">
              <Sparkles size={16} />
            </div>
            <p className="text-sm text-purple-900 font-medium">
              {aiSuggestion}
            </p>
          </div>
          {showOptimizeButton && (
            <Button
              size="sm"
              variant="outline"
              className="bg-white text-blue-600 border-blue-200 hover:bg-blue-50 h-8 text-xs"
            >
              Optimiser
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden min-h-0">
        {/* CALENDRIER */}
        <Card className="lg:col-span-8 flex flex-col h-full border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white shrink-0">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-slate-800 w-40">
                {formattedMonthLabel}
              </h2>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevMonth}
                  className="h-8 w-8"
                >
                  <ChevronLeft size={18} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextMonth}
                  className="h-8 w-8"
                >
                  <ChevronRight size={18} />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 text-center py-3 shrink-0">
            {["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="flex-1 grid grid-cols-7 gap-px bg-slate-200 overflow-y-auto">
            {[...Array(firstDayIndex)].map((_, i) => (
              <div
                key={`empty-${i}`}
                className="bg-slate-50 min-h-[100px]"
              ></div>
            ))}

            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const dayEvents = events.filter((e) => e.day === day);
              const isSelected = day === selectedDay;
              const isToday =
                now &&
                day === now.getDate() &&
                month === now.getMonth() &&
                year === now.getFullYear();

              // Est-ce que ce jour est passé ? (Pour l'affichage grisé)
              const isPast =
                now &&
                (year < now.getFullYear() ||
                  (year === now.getFullYear() && month < now.getMonth()) ||
                  (year === now.getFullYear() &&
                    month === now.getMonth() &&
                    day < now.getDate()));

              return (
                <div
                  key={day}
                  id={`day-${day}`}
                  onClick={() => setSelectedDay(day)}
                  className={cn(
                    "bg-white p-2 relative cursor-pointer transition-all hover:bg-blue-50/50 min-h-[100px] flex flex-col gap-1 scroll-mt-20",
                    isSelected && "ring-2 ring-inset ring-blue-500 z-10",
                    isToday && "bg-blue-50/30",
                    isPast && "opacity-50 grayscale bg-slate-50/30" // GRISÉ SI PASSÉ
                  )}
                >
                  <span
                    className={cn(
                      "text-xs font-medium w-7 h-7 flex items-center justify-center rounded-full mb-1",
                      isToday
                        ? "bg-slate-900 text-white"
                        : isSelected
                        ? "bg-blue-600 text-white"
                        : "text-slate-700"
                    )}
                  >
                    {day}
                  </span>

                  <div className="flex flex-col gap-1">
                    {dayEvents.slice(0, 2).map((evt, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "text-[10px] px-1.5 py-1 rounded border truncate font-medium leading-tight",
                          getEventColor(evt.type)
                        )}
                      >
                        {evt.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-[10px] text-slate-400 font-medium pl-1">
                        + {dayEvents.length - 2} autres
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {[...Array(42 - (daysInMonth + firstDayIndex))].map((_, i) => (
              <div key={`end-${i}`} className="bg-slate-50 min-h-[100px]"></div>
            ))}
          </div>
        </Card>

        {/* DÉTAILS */}
        <Card className="lg:col-span-4 flex flex-col h-full border-slate-200 shadow-lg overflow-hidden bg-white">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 shrink-0 flex justify-between items-center">
            <h3 className="font-bold text-slate-900 text-lg">
              Détails du {selectedDay}
            </h3>
            <Badge variant="secondary">
              {selectedDateEvents.length} événements
            </Badge>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedDateEvents.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <CalIcon size={32} className="mb-2 opacity-20" />
                <p className="text-sm">Rien de prévu.</p>
              </div>
            ) : (
              selectedDateEvents.map((rdv) => (
                <div
                  key={rdv.id}
                  className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-blue-200 transition-all"
                >
                  <div className="flex justify-between mb-2">
                    <Badge
                      className={cn(
                        "text-[10px] px-2 py-0 border-none",
                        getEventColor(rdv.type)
                      )}
                    >
                      {rdv.type.toUpperCase()}
                    </Badge>
                    <span className="text-xs font-bold text-slate-500">
                      {rdv.time}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">
                    {rdv.title}
                  </h4>
                  {rdv.contact && (
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                      <User size={12} /> {rdv.contact}
                    </div>
                  )}
                  {rdv.location && (
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                      <MapPin size={12} /> {rdv.location}
                    </div>
                  )}

                  <div className="flex gap-3 pt-3 border-t border-slate-100 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs px-3 flex-1"
                      onClick={() => handleVoir(rdv.link)}
                    >
                      Voir
                    </Button>
                    {rdv.status === "confirmed" ? (
                      <Button
                        size="sm"
                        className="h-8 text-xs px-3 bg-green-100 text-green-700 border-green-200 hover:bg-green-200 flex-1 border"
                        onClick={() => handleAction("Tâche faite", rdv.title)}
                      >
                        <CheckCircle2 size={12} className="mr-1" /> Fait
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="h-8 text-xs px-3 bg-blue-600 text-white hover:bg-blue-700 flex-1"
                        onClick={() => handleAction("RDV confirmé", rdv.title)}
                      >
                        Confirmer
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* MODALE */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nouveau Rendez-vous"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Date</label>
              <Input
                type="date"
                defaultValue={`${year}-${String(month + 1).padStart(
                  2,
                  "0"
                )}-${String(selectedDay).padStart(2, "0")}`}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Heure</label>
              <Input type="time" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Titre</label>
            <Input placeholder="Ex: Visite M. Fall" />
          </div>
          <div className="flex justify-end pt-4">
            <Button className="bg-blue-600 text-white">Ajouter</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
