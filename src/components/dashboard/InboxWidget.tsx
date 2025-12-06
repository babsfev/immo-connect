"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Bell, Check, AlertCircle, Info } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

// Définition du type (copie partielle du modèle Prisma)
type NotificationItem = {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: Date;
};

export function InboxWidget({ notifications }: { notifications: NotificationItem[] }) {
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
     if (type === "SUCCESS") return <Check size={14} className="text-green-600" />;
     if (type === "WARNING") return <AlertCircle size={14} className="text-orange-600" />;
     return <Info size={14} className="text-blue-600" />;
  };

  const getBg = (type: string) => {
     if (type === "SUCCESS") return "bg-green-100";
     if (type === "WARNING") return "bg-orange-100";
     return "bg-blue-100";
  };

  return (
    <Card className="h-full flex flex-col border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3 border-b border-slate-50">
        <CardTitle className="flex justify-between items-center text-base">
          <div className="flex items-center gap-2 text-slate-800">
             <Bell size={18} className="text-slate-400" /> Activité Récente
          </div>
          {unreadCount > 0 && (
             <Badge variant="danger" size="sm" className="rounded-full px-2">{unreadCount}</Badge>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto pr-1 pt-3 space-y-1">
         {notifications.length === 0 ? (
             <div className="h-full flex flex-col items-center justify-center text-slate-400 text-xs py-8">
                 <Bell size={24} className="mb-2 opacity-20"/>
                 Aucune notification
             </div>
         ) : (
             notifications.map((notif) => (
                <div key={notif.id} className={`p-3 rounded-xl flex gap-3 group ${!notif.read ? "bg-blue-50/50" : "hover:bg-slate-50"} transition-colors`}>
                   <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${getBg(notif.type)}`}>
                      {getIcon(notif.type)}
                   </div>
                   
                   <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-0.5">
                         <p className={`text-xs ${!notif.read ? "font-bold text-slate-900" : "font-medium text-slate-700"}`}>{notif.title}</p>
                         <span className="text-[9px] text-slate-400 whitespace-nowrap ml-2">
                            {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true, locale: fr })}
                         </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">{notif.message}</p>
                   </div>
                </div>
             ))
         )}
      </CardContent>
      
      <div className="p-3 border-t border-slate-50 mt-auto">
         <Link href="/notifications" className="block text-center text-xs text-slate-500 hover:text-blue-600 hover:underline transition-colors">
            Voir tout l'historique
         </Link>
      </div>
    </Card>
  );
}