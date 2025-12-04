"use client";
import React, { useState } from "react";
import { 
  ChevronLeft, ChevronRight, Calendar as CalIcon, 
  Clock, MapPin, User, Plus, Share2, Filter 
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import Input from "@/components/ui/Input";

// Mock Data : Les RDV
const appointments = [
  { id: 1, title: "Visite - Villa Corniche", type: "visite", date: "21", time: "14:30", contact: "M. Diop", location: "Corniche Ouest", status: "confirmé" },
  { id: 2, title: "État des lieux - Sortie", type: "edl", date: "21", time: "16:00", contact: "Sarah N.", location: "Almadies", status: "attente" },
  { id: 3, title: "Plombier - Fuite", type: "travaux", date: "22", time: "09:00", contact: "Ent. Fall", location: "Plateau", status: "confirmé" },
  { id: 4, title: "Signature Bail", type: "admin", date: "23", time: "11:00", contact: "Jean-Marc", location: "Agence", status: "confirmé" },
];

export default function CalendarPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState("month"); // 'month' ou 'list'

  return (
    <div className="space-y-6 pb-10 h-[calc(100vh-100px)] flex flex-col">
      
      {/* HEADER & ACTIONS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Agenda</h1>
           <p className="text-slate-500">Gérez vos visites et états des lieux.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="hidden sm:flex"><Share2 size={16} className="mr-2"/> Lien de réservation</Button>
           <Button className="bg-blue-600 text-white" onClick={() => setIsModalOpen(true)}>
             <Plus size={18} className="mr-2"/> Nouveau RDV
           </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 overflow-hidden">
         
         {/* COLONNE GAUCHE : PLANNING DU JOUR */}
         <Card className="lg:col-span-1 flex flex-col h-full bg-white border-slate-200">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
               <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <Clock size={18} className="text-orange-500"/> Auj. 21 Nov
               </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
               {/* Timeline Visuelle */}
               {appointments.filter(a => a.date === "21").map((rdv) => (
                  <div key={rdv.id} className="flex gap-3 group cursor-pointer">
                     <div className="flex flex-col items-center">
                        <span className="text-xs font-bold text-slate-500">{rdv.time}</span>
                        <div className="w-0.5 h-full bg-slate-100 mt-1 group-hover:bg-blue-200 transition-colors"></div>
                     </div>
                     <div className={`flex-1 p-3 rounded-xl border border-l-4 shadow-sm hover:shadow-md transition-all ${
                        rdv.type === "visite" ? "bg-blue-50 border-blue-100 border-l-blue-500" :
                        rdv.type === "edl" ? "bg-purple-50 border-purple-100 border-l-purple-500" :
                        "bg-orange-50 border-orange-100 border-l-orange-500"
                     }`}>
                        <p className="font-bold text-slate-900 text-sm truncate">{rdv.title}</p>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                           <User size={12}/> {rdv.contact}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                           <MapPin size={12}/> {rdv.location}
                        </div>
                     </div>
                  </div>
               ))}
               {/* Empty Slot */}
               <div className="flex gap-3 opacity-50">
                  <span className="text-xs font-bold text-slate-400">17:00</span>
                  <div className="flex-1 border-2 border-dashed border-slate-200 rounded-lg p-2 text-center text-xs text-slate-400">
                     Créneau libre
                  </div>
               </div>
            </div>
         </Card>

         {/* COLONNE DROITE : CALENDRIER MENSUEL */}
         <Card className="lg:col-span-3 flex flex-col h-full">
            {/* Cal Nav */}
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
               <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronLeft size={16}/></Button>
                  <span className="text-lg font-bold text-slate-800 w-32 text-center">Nov 2024</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronRight size={16}/></Button>
               </div>
               <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="hidden sm:flex"><Filter size={14} className="mr-2"/> Filtres</Button>
                  <select className="text-sm bg-slate-50 border-none rounded-md px-2 py-1 outline-none cursor-pointer">
                     <option>Mois</option>
                     <option>Semaine</option>
                  </select>
               </div>
            </div>

            {/* Grille Jours */}
            <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50 text-xs font-semibold text-slate-500 text-center py-2">
               <div>LUN</div><div>MAR</div><div>MER</div><div>JEU</div><div>VEN</div><div>SAM</div><div>DIM</div>
            </div>
            <div className="flex-1 grid grid-cols-7 auto-rows-fr bg-white">
               {/* Jours vides début mois */}
               <div className="border-b border-r border-slate-50 bg-slate-50/30"></div>
               <div className="border-b border-r border-slate-50 bg-slate-50/30"></div>
               <div className="border-b border-r border-slate-50 bg-slate-50/30"></div>
               <div className="border-b border-r border-slate-50 bg-slate-50/30"></div>

               {Array.from({length: 30}, (_, i) => i + 1).map((day) => {
                  const dayRdvs = appointments.filter(a => a.date === day.toString());
                  const isToday = day === 21;
                  return (
                     <div key={day} className={`border-b border-r border-slate-50 p-1 md:p-2 relative group hover:bg-blue-50/20 transition-colors min-h-20 ${isToday ? "bg-blue-50/30" : ""}`}>
                        <span className={`text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full ${isToday ? "bg-blue-600 text-white" : "text-slate-700"}`}>
                           {day}
                        </span>
                        <div className="mt-1 space-y-1">
                           {dayRdvs.map((rdv, idx) => (
                              <div key={idx} className={`text-[10px] px-1 py-0.5 rounded border truncate cursor-pointer font-medium ${
                                 rdv.type === "visite" ? "bg-blue-100 text-blue-700 border-blue-200" :
                                 rdv.type === "edl" ? "bg-purple-100 text-purple-700 border-purple-200" :
                                 "bg-orange-100 text-orange-700 border-orange-200"
                              }`}>
                                 {rdv.time} {rdv.type === "edl" ? "EDL" : rdv.contact}
                              </div>
                           ))}
                        </div>
                        {/* Bouton + au survol */}
                        <button className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 rounded text-slate-500">
                           <Plus size={12} />
                        </button>
                     </div>
                  )
               })}
            </div>
         </Card>
      </div>

      {/* MODALE NOUVEAU RDV */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Programmer un rendez-vous">
         <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1">
                  <label className="text-sm font-medium">Type</label>
                  <select className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm">
                     <option>Visite</option>
                     <option>État des lieux (Entrée)</option>
                     <option>État des lieux (Sortie)</option>
                     <option>Signature Bail</option>
                     <option>Maintenance / Travaux</option>
                  </select>
               </div>
               <div className="space-y-1">
                  <label className="text-sm font-medium">Bien concerné</label>
                  <select className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm">
                     <option>Villa Corniche</option>
                     <option>Appartement T3</option>
                  </select>
               </div>
            </div>

            <div className="space-y-1">
               <label className="text-sm font-medium">Avec qui ?</label>
               <Input placeholder="Nom du contact (Prospect, Locataire, Artisan)" />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1"><label className="text-sm font-medium">Date</label><Input type="date" /></div>
               <div className="space-y-1"><label className="text-sm font-medium">Heure</label><Input type="time" /></div>
            </div>

            <div className="flex items-center gap-2 mt-2 bg-blue-50 p-3 rounded-lg border border-blue-100">
               <input type="checkbox" id="notif" defaultChecked className="text-blue-600 rounded" />
               <label htmlFor="notif" className="text-xs text-blue-800">Envoyer une invitation par SMS/Email au contact</label>
            </div>

            <div className="pt-4 flex justify-end gap-2 border-t border-slate-100 mt-4">
               <Button variant="outline" onClick={() => setIsModalOpen(false)}>Annuler</Button>
               <Button className="bg-blue-600 text-white">Confirmer le RDV</Button>
            </div>
         </form>
      </Modal>

    </div>
  );
}