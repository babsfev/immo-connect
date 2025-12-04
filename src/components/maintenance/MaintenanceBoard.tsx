"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // <--- Pour le refresh doux
import { Plus, Search, MapPin, User } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input, Label, Textarea } from "@/components/ui/form";
import { Select } from "@/components/ui/form/Select";
import { Modal } from "@/components/ui/Modal";
import { useAction } from "@/hooks/use-action";
import { createTicket } from "@/app/actions/tickets";
import { toast } from "sonner";

// Types alignés avec le loader
type Ticket = {
  id: string;
  title: string;
  description: string;
  property: string;
  tenant: string;
  date: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  status: "TODO" | "IN_PROGRESS" | "DONE";
  provider: string | null;
};

type PropertyOption = { id: string; title: string };

export function MaintenanceBoard({ initialTickets, properties }: { initialTickets: Ticket[], properties: PropertyOption[] }) {
  const [tickets, setTickets] = useState(initialTickets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const router = useRouter();

  // Hook de création
  const { execute, isPending } = useAction(createTicket, {
    onSuccess: () => {
      toast.success("Ticket créé avec succès");
      setIsModalOpen(false);
      
      // AMÉLIORATION UX : Refresh Next.js (Doux) au lieu de reload navigateur
      router.refresh(); 
    }
  });

  const handleSubmit = (formData: FormData) => {
    execute(formData);
  };

  // Filtrage Client (Rapide pour < 100 tickets)
  const filteredTickets = tickets.filter(t => 
    t.title.toLowerCase().includes(filter.toLowerCase()) ||
    t.property.toLowerCase().includes(filter.toLowerCase())
  );

  const columns = [
    { id: "TODO", title: "À Traiter", color: "border-t-red-500" },
    { id: "IN_PROGRESS", title: "En Cours", color: "border-t-blue-500" },
    { id: "DONE", title: "Terminé", color: "border-t-green-500" },
  ];

  return (
    <div className="h-full flex flex-col">
      
      {/* HEADER & FILTRES */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Maintenance</h1>
          <p className="text-slate-500">Suivi des incidents et travaux.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
           <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16}/>
              <input 
                className="w-full h-10 pl-9 pr-4 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="Rechercher..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
           </div>
           <Button onClick={() => setIsModalOpen(true)} className="bg-orange-500 hover:bg-orange-600 text-white shadow-md whitespace-nowrap">
              <Plus size={18} className="mr-2"/> <span className="hidden sm:inline">Créer un ticket</span><span className="sm:hidden">Créer</span>
           </Button>
        </div>
      </div>

      {/* KANBAN BOARD */}
      <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
        {columns.map(col => (
           <div key={col.id} className="flex-1 min-w-[300px] flex flex-col bg-slate-50 rounded-xl p-3 border border-slate-200">
              <div className="flex justify-between items-center mb-3 px-1">
                 <h3 className="font-bold text-slate-700 text-sm">{col.title}</h3>
                 <Badge variant="secondary" className="bg-white shadow-sm">
                    {filteredTickets.filter(t => t.status === col.id).length}
                 </Badge>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
                 {filteredTickets.filter(t => t.status === col.id).map(ticket => (
                    <Card key={ticket.id} className={`cursor-pointer hover:shadow-md transition-all border-l-0 border-r-0 border-b-0 border-t-4 ${col.color} group`}>
                       <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                             <Badge variant={ticket.priority === "CRITICAL" ? "danger" : ticket.priority === "HIGH" ? "warning" : "secondary"} className="text-[10px] px-1.5">
                                {ticket.priority}
                             </Badge>
                             <span className="text-[10px] text-slate-400">{new Date(ticket.date).toLocaleDateString()}</span>
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">{ticket.title}</h4>
                          <div className="flex flex-col gap-1 mt-2">
                             <span className="text-xs text-slate-500 flex items-center gap-1.5 truncate"><MapPin size={12}/> {ticket.property}</span>
                             <span className="text-xs text-slate-500 flex items-center gap-1.5 truncate"><User size={12}/> {ticket.tenant}</span>
                          </div>
                       </CardContent>
                    </Card>
                 ))}
                 {filteredTickets.filter(t => t.status === col.id).length === 0 && (
                    <div className="text-center py-12 text-slate-400 text-xs italic border-2 border-dashed border-slate-200 rounded-lg m-2">
                       Aucun ticket
                    </div>
                 )}
              </div>
           </div>
        ))}
      </div>

      {/* MODALE CRÉATION */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Nouveau Ticket">
         <form action={handleSubmit} className="space-y-4">
            <div>
               <Label required>Titre de l'incident</Label>
               <Input name="title" placeholder="Ex: Fuite d'eau SDB" required autoFocus />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <Label required>Priorité</Label>
                  <Select 
                     name="priority" 
                     options={[
                        { label: "Faible", value: "LOW" },
                        { label: "Moyenne", value: "MEDIUM" },
                        { label: "Haute", value: "HIGH" },
                        { label: "Critique", value: "CRITICAL" },
                     ]}
                     defaultValue="MEDIUM"
                  />
               </div>
               <div>
                  <Label required>Bien concerné</Label>
                  <Select 
                     name="propertyId" 
                     options={properties.map(p => ({ label: p.title, value: p.id }))}
                     placeholder="Choisir..."
                  />
               </div>
            </div>

            <div>
               <Label>Description détaillée</Label>
               <Textarea name="description" placeholder="Décrivez le problème..." />
            </div>

            <div className="pt-4 flex justify-end gap-2 border-t border-slate-100 mt-2">
               <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Annuler</Button>
               <Button type="submit" disabled={isPending} className="bg-orange-500 hover:bg-orange-600 text-white shadow-md">
                  {isPending ? "Création..." : "Créer le ticket"}
               </Button>
            </div>
         </form>
      </Modal>
    </div>
  );
}