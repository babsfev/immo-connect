"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, AlertTriangle, Info, Bell, Filter, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { getNotifications } from "@/app/data/notifications"; // Loader serveur
import { markAllAsRead } from "@/app/actions/notifications"; // Action serveur
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// On force le type car c'est un Client Component qui appelle un Server Action/Data
// Idéalement, on passerait les données via un composant Parent Serveur, 
// mais pour faire simple ici on peut fetcher ou passer en props.

// Pour cette version finale propre, transformons cette page en Server Component 
// qui passe les données à un Client Component.

// --- 1. LE COMPOSANT CLIENT (Liste) ---
function NotificationsList({ initialData }: { initialData: any[] }) {
  const router = useRouter();
  const { execute, isPending } = useAction(markAllAsRead, {
    onSuccess: () => {
      toast.success("Tout est marqué comme lu");
      router.refresh();
    }
  });

  if (initialData.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        <Bell size={48} className="mx-auto mb-3 opacity-20" />
        <p>Aucune notification pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
       <div className="flex justify-end">
          <Button variant="outline" onClick={() => execute({})} disabled={isPending}>
             {isPending ? <Loader2 className="animate-spin mr-2" size={16}/> : null}
             Tout marquer comme lu
          </Button>
       </div>
       <Card className="divide-y divide-slate-100">
         {initialData.map((n) => (
            <div key={n.id} className={`p-4 flex gap-4 transition-colors ${n.read ? "opacity-60 bg-white" : "bg-blue-50/40"}`}>
               <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                  n.type === "SUCCESS" || n.type === "PAYMENT" ? "bg-green-100 text-green-600" : 
                  n.type === "WARNING" || n.type === "ERROR" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
               }`}>
                  {n.type === "SUCCESS" || n.type === "PAYMENT" ? <CheckCircle2 size={20}/> : 
                   n.type === "WARNING" || n.type === "ERROR" ? <AlertTriangle size={20}/> : <Info size={20}/>}
               </div>
               <div className="flex-1">
                  <div className="flex justify-between items-start">
                     <h4 className={`text-sm ${n.read ? "font-medium text-slate-700" : "font-bold text-slate-900"}`}>{n.title}</h4>
                     <span className="text-xs text-slate-400">{new Date(n.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-0.5">{n.message}</p>
               </div>
               {!n.read && <div className="self-center"><div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div></div>}
            </div>
         ))}
       </Card>
    </div>
  );
}

// --- 2. LA PAGE SERVEUR (Data) ---
// Il faut importer le vrai loader ici
import { getNotifications as fetchNotifs } from "@/app/data/notifications";

export default async function NotificationsPage() {
  const notifications = await fetchNotifs();

  return (
    <div className="space-y-6 pb-10 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Centre de Notifications</h1>
      </div>
      <NotificationsList initialData={notifications} />
    </div>
  );
}