"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  XCircle,
  Check
} from "lucide-react";
import { toast } from "sonner";
import { markAsRead, markAllAsRead } from "@/app/actions/notifications"; // Les Server Actions sont OK dans les composants clients
import Button from "@/components/ui/Button";
import {Card} from "@/components/ui/Card";

// On définit le type des props attendues
type Notification = {
  id: string;
  title: string;
  message: string;
  type: "INFO" | "SUCCESS" | "WARNING" | "ERROR" | "PAYMENT" | "MAINTENANCE";
  read: boolean;
  createdAt: string; // Les dates doivent être passées en string du serveur au client
  link?: string | null;
};

type NotificationsClientProps = {
  initialNotifications: Notification[];
};

export function NotificationsClient({ initialNotifications }: NotificationsClientProps) {
  // On initialise l'état avec les données reçues du serveur
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [filter, setFilter] = useState<"ALL" | "UNREAD">("ALL");

  const unreadCount = notifications.filter(n => !n.read).length;

  // Gestion des actions (Optimistic UI possible ici)
  const handleMarkAsRead = async (id: string) => {
    try {
      // Mise à jour immédiate de l'UI
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
      // Appel serveur
      await markAsRead({ notificationId: id });
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const handleMarkAllRead = async () => {
    try {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      await markAllAsRead({}); 
      toast.success("Toutes les notifications marquées comme lues");
    } catch (error) {
      toast.error("Erreur action");
    }
  };

  // Filtrage
  const displayedNotifications = filter === "ALL" 
    ? notifications 
    : notifications.filter(n => !n.read);

  // Icônes helper
  const getIcon = (type: string) => {
    switch (type) {
      case "SUCCESS": return <CheckCircle className="text-green-500" size={20} />;
      case "WARNING": return <AlertTriangle className="text-amber-500" size={20} />;
      case "ERROR": return <XCircle className="text-red-500" size={20} />;
      case "PAYMENT": return <span className="text-emerald-600 font-bold">💰</span>;
      default: return <Info className="text-blue-500" size={20} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Filtres */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200 w-fit">
          <button
            onClick={() => setFilter("ALL")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
              filter === "ALL" 
                ? "bg-slate-900 text-white shadow-sm" 
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            Toutes
          </button>
          <button
            onClick={() => setFilter("UNREAD")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${
              filter === "UNREAD" 
                ? "bg-slate-900 text-white shadow-sm" 
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            Non lues
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] px-1.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={handleMarkAllRead} className="gap-2">
            <Check size={16} />
            Tout marquer comme lu
          </Button>
        )}
      </div>

      {/* Liste */}
      <div className="space-y-3">
        {displayedNotifications.length === 0 ? (
          <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <Bell className="mx-auto mb-3 text-slate-300" size={32} />
            <p>Aucune notification {filter === "UNREAD" ? "non lue" : ""}</p>
          </div>
        ) : (
          displayedNotifications.map((notif) => (
            <Card key={notif.id} className={`p-4 transition-all hover:shadow-md ${!notif.read ? "bg-blue-50/50 border-blue-100" : "bg-white"}`}>
              <div className="flex gap-4">
                <div className="mt-1 shrink-0">
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className={`text-sm font-semibold ${!notif.read ? "text-slate-900" : "text-slate-700"}`}>
                      {notif.title}
                    </h4>
                    <span className="text-xs text-slate-400 whitespace-nowrap">
                      {format(new Date(notif.createdAt), "d MMM, HH:mm", { locale: fr })}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                    {notif.message}
                  </p>
                  
                  <div className="mt-3 flex items-center gap-3">
                    {!notif.read && (
                      <button 
                        onClick={() => handleMarkAsRead(notif.id)}
                        className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                      >
                        <CheckCircle size={12} />
                        Marquer comme lu
                      </button>
                    )}
                    {notif.link && (
                      <a href={notif.link} className="text-xs font-medium text-slate-500 hover:text-slate-900 underline decoration-slate-300">
                        Voir les détails
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}