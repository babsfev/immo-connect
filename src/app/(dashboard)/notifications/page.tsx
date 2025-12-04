"use client";
import React from "react";
import { CheckCircle2, AlertTriangle, Info, Bell, Filter } from "lucide-react";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const notifs = [
  { id: 1, title: "Loyer reçu - M. Diop", desc: "Virement de 450 000 FCFA confirmé.", type: "success", date: "Il y a 2h", read: false },
  { id: 2, title: "Urgence Fuite", desc: "Nouveau ticket créé par Fatou Sow.", type: "danger", date: "Il y a 5h", read: false },
  { id: 3, title: "Mise à jour système", desc: "Nouvelles fonctionnalités disponibles.", type: "info", date: "Hier", read: true },
  { id: 4, title: "Bail signé", desc: "Le contrat pour le Studio est validé.", type: "success", date: "Hier", read: true },
];

export default function NotificationsPage() {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Centre de Notifications</h1>
        <div className="flex gap-2">
           <Button variant="ghost" className="text-slate-600"><Filter size={16} className="mr-2"/> Filtrer</Button>
           <Button variant="outline">Tout marquer comme lu</Button>
        </div>
      </div>

      <Card className="divide-y divide-slate-100">
         {notifs.map((n) => (
            <div key={n.id} className={`p-4 flex gap-4 hover:bg-slate-50 transition-colors ${n.read ? "opacity-70" : "bg-blue-50/30"}`}>
               <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                  n.type === "success" ? "bg-green-100 text-green-600" : 
                  n.type === "danger" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
               }`}>
                  {n.type === "success" ? <CheckCircle2 size={20}/> : n.type === "danger" ? <AlertTriangle size={20}/> : <Info size={20}/>}
               </div>
               <div className="flex-1">
                  <div className="flex justify-between items-start">
                     <h4 className={`text-sm ${n.read ? "font-medium text-slate-700" : "font-bold text-slate-900"}`}>{n.title}</h4>
                     <span className="text-xs text-slate-400">{n.date}</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-0.5">{n.desc}</p>
               </div>
               {!n.read && <div className="self-center"><div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div></div>}
            </div>
         ))}
      </Card>
    </div>
  );
}