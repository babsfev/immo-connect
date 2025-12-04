"use client";
import React from "react";
import { Plus, MoreHorizontal, Calendar } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

// Colonnes du Kanban
const columns = [
  { id: "todo", title: "À traiter", color: "bg-slate-100", items: [{ id: 1, title: "Fuite Sdb", date: "Hier", priority: "Urgent" }] },
  { id: "progress", title: "En cours / Prestataire", color: "bg-blue-50", items: [{ id: 2, title: "Peinture Salon", date: "20 Nov", priority: "Moyenne" }] },
  { id: "done", title: "Terminé", color: "bg-green-50", items: [{ id: 3, title: "Serrure Entrée", date: "15 Nov", priority: "Faible" }] },
];

export default function MaintenancePage() {
  return (
    <div className="space-y-6 pb-10 h-[calc(100vh-100px)] flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Tableau de Maintenance</h1>
        <Button className="bg-orange-500 text-white"><Plus size={18} className="mr-2"/> Nouveau Ticket</Button>
      </div>

      <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
         {columns.map((col) => (
            <div key={col.id} className={`flex-1 min-w-[300px] rounded-xl p-4 flex flex-col gap-4 ${col.color}`}>
               <div className="flex justify-between items-center font-bold text-slate-700 mb-2">
                  <span>{col.title}</span>
                  <span className="bg-white px-2 py-0.5 rounded-full text-xs border border-slate-200">{col.items.length}</span>
               </div>
               
               {col.items.map((item) => (
                  <Card key={item.id} className="cursor-pointer hover:shadow-md transition-shadow border-none shadow-sm">
                     <div className="p-4 space-y-3">
                        <div className="flex justify-between items-start">
                           <Badge variant={item.priority === "Urgent" ? "danger" : "secondary"} className="text-[10px]">{item.priority}</Badge>
                           <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={16}/></button>
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                        <div className="flex items-center text-xs text-slate-500">
                           <Calendar size={12} className="mr-1"/> {item.date}
                        </div>
                        {/* Avatar Prestataire (Simulation) */}
                        <div className="flex items-center gap-2 pt-2 border-t border-slate-50 mt-2">
                           <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-[10px] font-bold">PL</div>
                           <span className="text-xs text-slate-500">Plombier</span>
                        </div>
                     </div>
                  </Card>
               ))}
               
               <button className="w-full py-2 text-sm text-slate-500 hover:bg-white/50 rounded-lg border border-transparent hover:border-slate-200 border-dashed transition-all">
                  + Ajouter
               </button>
            </div>
         ))}
      </div>
    </div>
  );
}