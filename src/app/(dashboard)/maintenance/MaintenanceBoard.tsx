"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, MapPin, User, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/form/Input";
import { Select } from "@/components/ui/form/Select";
import { Textarea } from "@/components/ui/form/Textarea";
import { Modal } from "@/components/ui/Modal";
import { useAction } from "@/hooks/use-action";
import { createTicket } from "@/app/actions/tickets";
import { toast } from "sonner";

// Types définis pour correspondre à ce que le serveur envoie
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const router = useRouter();

  // Hook de création (Server Action)
  const { execute, isPending } = useAction(createTicket, {
    onSuccess: () => {
      toast.success("Ticket créé avec succès");
      setIsModalOpen(false);
      router.refresh(); // Rafraîchit les données affichées sans recharger la page
    },
    onError: (err) => toast.error(err)
  });

  const handleSubmit = (formData: FormData) => {
    execute(formData);
  };

  // Filtrage local (instantané)
  const filteredTickets = initialTickets.filter(t => 
    t.title.toLowerCase().includes(filter.toLowerCase()) ||
    t.property.toLowerCase().includes(filter.toLowerCase())
  );

  const columns = [
    { id: "TODO", title: "À Traiter", color: "border-t-red-500" },
    { id: "IN_PROGRESS", title: "En Cours", color: "border-t-blue-500" },
    { id: "DONE", title: "Terminé", color: "border-t-green-500" },
  ];

  return (
    <div className="h-full flex flex-col space-y-6">
      
      {/* HEADER & FILTRES */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Maintenance</h1>
          <p className="text-slate-500">Suivi des incidents et travaux.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
           <div className="flex-1 sm:w-72">
              <Input 
                placeholder="Rechercher un ticket..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                icon={<Search size={18} />}
                className="bg-white shadow-sm"
              />
           </div>
           <Button onClick={() => setIsModalOpen(true)} className="shadow-md">
              <Plus size={18} className="mr-2"/> <span className="hidden sm:inline">Créer un ticket</span><span className="sm:hidden">Créer</span>
           </Button>
        </div>
      </div>

      {/* KANBAN BOARD */}
      <div className="flex-1 flex gap-6 overflow-x-auto pb-4 items-start h-full">
        {columns.map(col => (
           <div key={col.id} className="flex-1 min-w-[300px] flex flex-col bg-slate-50/50 rounded-2xl p-2 border border-slate-200 h-full max-h-[calc(100vh-220px)]">
              <div className="flex justify-between items-center mb-3 px-3 pt-2">
                 <h3 className="font-bold text-slate-700 text-sm">{col.title}</h3>
                 <Badge variant="secondary" className="bg-white shadow-sm">
                    {filteredTickets.filter(t => t.status === col.id).length}
                 </Badge>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 px-1 custom-scrollbar">
                 {filteredTickets.filter(t => t.status === col.id).map(ticket => (
                    <Card key={ticket.id} hoverEffect className={`cursor-pointer group border-l-0 border-r-0 border-b-0 border-t-4 ${col.color}`}>
                       <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                             <Badge 
                                variant={ticket.priority === "CRITICAL" ? "danger" : ticket.priority === "HIGH" ? "warning" : "secondary"} 
                                className="text-[10px] px-1.5"
                                dot
                             >
                                {ticket.priority}
                             </Badge>
                             <span className="text-[10px] text-slate-400 font-medium">{new Date(ticket.date).toLocaleDateString()}</span>
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm mb-2 group-hover:text-blue-600 transition-colors leading-tight">{ticket.title}</h4>
                          <div className="space-y-1.5">
                             <span className="text-xs text-slate-500 flex items-center gap-2 truncate bg-slate-50 p-1.5 rounded-lg">
                                <MapPin size={14} className="text-slate-400"/> {ticket.property}
                             </span>
                             <span className="text-xs text-slate-500 flex items-center gap-2 truncate p-1.5">
                                <User size={14} className="text-slate-400"/> {ticket.tenant}
                             </span>
                          </div>
                       </CardContent>
                    </Card>
                 ))}
                 {filteredTickets.filter(t => t.status === col.id).length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-slate-400 gap-2 border-2 border-dashed border-slate-200 rounded-xl m-1 bg-slate-50/50">
                       <AlertCircle size={20} className="opacity-50"/>
                       <span className="text-xs font-medium">Aucun ticket</span>
                    </div>
                 )}
              </div>
           </div>
        ))}
      </div>

      {/* MODALE CRÉATION */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Nouveau Ticket">
         <form action={handleSubmit} className="space-y-5">
            <Input label="Titre de l'incident" name="title" placeholder="Ex: Fuite d'eau SDB" required autoFocus />
            
            <div className="grid grid-cols-2 gap-4">
               <Select 
                  label="Priorité"
                  name="priority" 
                  options={[
                     { label: "Faible", value: "LOW" },
                     { label: "Moyenne", value: "MEDIUM" },
                     { label: "Haute", value: "HIGH" },
                     { label: "Critique", value: "CRITICAL" },
                  ]}
                  defaultValue="MEDIUM"
               />
               <Select 
                  label="Bien concerné"
                  name="propertyId" 
                  options={properties.map(p => ({ label: p.title, value: p.id }))}
                  placeholder="Choisir..."
                  searchable
               />
            </div>

            <Textarea label="Description détaillée" name="description" placeholder="Décrivez le problème..." rows={4} />

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
               <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Annuler</Button>
               <Button type="submit" isLoading={isPending} className="bg-orange-500 hover:bg-orange-600 text-white shadow-md">
                  Créer le ticket
               </Button>
            </div>
         </form>
      </Modal>
    </div>
  );
}