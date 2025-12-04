"use client";

import React, { useState } from "react";
import { 
  Plus, Search, Phone, Mail, MoreVertical, User, CheckCircle2, 
  AlertCircle, FileText, Users 
} from "lucide-react";
import { toast } from "sonner"; // Notification

import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal"; // Ton composant Modal
import { EmptyState } from "@/components/ui/EmptyState"; // Ton composant EmptyState

// Mock Data
const initialTenants = [
  {
    id: 1, name: "Moussa Diop", property: "Appartement T3 - Centre Ville",
    status: "À jour", nextPayment: "05 Nov 2024", amount: 450000,
    avatar: "bg-blue-100 text-blue-700", initials: "MD"
  },
  {
    id: 2, name: "Sarah Ndiaye", property: "Studio Meublé - Almadies",
    status: "En retard", nextPayment: "01 Oct 2024", amount: 300000,
    avatar: "bg-orange-100 text-orange-700", initials: "SN"
  },
  {
    id: 3, name: "Jean Dupont", property: "Local Commercial - Plateau",
    status: "En attente", nextPayment: "05 Nov 2024", amount: 850000,
    avatar: "bg-purple-100 text-purple-700", initials: "JD"
  },
  {
    id: 4, name: "Fatou Sow", property: "Villa Corniche Ouest",
    status: "À jour", nextPayment: "05 Nov 2024", amount: 1200000,
    avatar: "bg-green-100 text-green-700", initials: "FS"
  }
];

export default function TenantsPage() {
  const [tenants, setTenants] = useState(initialTenants);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTenant = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    toast.success("Locataire ajouté avec succès", {
      description: "Le dossier a été créé et l'invitation envoyée."
    });
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mes Locataires</h1>
          <p className="text-slate-500">Suivez vos contrats et paiements.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-orange-500 hover:bg-orange-600 text-white">
          <Plus size={18} className="mr-2" /> Nouveau Locataire
        </Button>
      </div>

      {/* Stats Rapides */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="flex items-center gap-4 p-4">
           <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><User size={24} /></div>
           <div><p className="text-sm text-slate-500">Total</p><p className="text-2xl font-bold text-slate-900">{tenants.length}</p></div>
        </Card>
        <Card className="flex items-center gap-4 p-4">
           <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center text-green-600"><CheckCircle2 size={24} /></div>
           <div><p className="text-sm text-slate-500">À jour</p><p className="text-2xl font-bold text-slate-900">21</p></div>
        </Card>
        <Card className="bg-red-50/30 border-red-100 flex items-center gap-4 p-4">
           <div className="h-12 w-12 rounded-full bg-white border border-red-100 flex items-center justify-center text-red-500"><AlertCircle size={24} /></div>
           <div><p className="text-sm text-slate-500">Retards</p><p className="text-2xl font-bold text-red-600">3</p></div>
        </Card>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input placeholder="Rechercher un locataire..." className="pl-10" />
        </div>
      </div>

      {/* Liste Cards ou Empty State */}
      {tenants.length === 0 ? (
        <EmptyState 
          icon={Users}
          title="Aucun locataire"
          description="Ajoutez des locataires pour suivre leurs paiements et contrats."
          actionLabel="Ajouter un locataire"
          onAction={() => setIsModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tenants.map((tenant) => {
            let badgeVariant: "success" | "danger" | "warning" | "default" = "default";
            if (tenant.status === "À jour") badgeVariant = "success";
            if (tenant.status === "En retard") badgeVariant = "danger";
            if (tenant.status === "En attente") badgeVariant = "warning";

            return (
              <Card key={tenant.id} className="group hover:border-blue-300 transition-colors">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center text-lg font-bold ${tenant.avatar}`}>
                        {tenant.initials}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">{tenant.name}</h3>
                        <p className="text-sm text-slate-500 truncate max-w-[200px]">{tenant.property}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><MoreVertical size={20} /></Button>
                  </div>

                  <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-100 mb-6">
                    <div>
                        <p className="text-xs text-slate-400 mb-1">Prochain Loyer</p>
                        <p className="font-bold text-slate-900">{tenant.amount.toLocaleString()} FCFA</p>
                    </div>
                    <Badge variant={badgeVariant}>{tenant.status}</Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <Button variant="outline" size="sm"><Phone size={16} className="mr-2" /> Appeler</Button>
                    <Button variant="outline" size="sm"><Mail size={16} className="mr-2" /> Email</Button>
                    <Button variant="outline" size="sm"><FileText size={16} className="mr-2" /> Bail</Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Modal Ajout Locataire */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Nouveau Locataire">
        <form onSubmit={handleAddTenant} className="space-y-4">
            <div>
                <label className="text-sm font-medium text-slate-700">Nom complet</label>
                <Input required placeholder="Ex: Moussa Diop" />
            </div>
            <div>
                <label className="text-sm font-medium text-slate-700">Assigner à une propriété</label>
                <select className="w-full p-2 border border-slate-200 rounded-md bg-white text-sm">
                    <option>Appartement T3 - Centre Ville</option>
                    <option>Villa Corniche</option>
                </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium text-slate-700">Loyer (FCFA)</label>
                    <Input type="number" placeholder="0" />
                </div>
                <div>
                    <label className="text-sm font-medium text-slate-700">Date d'entrée</label>
                    <Input type="date" />
                </div>
            </div>
            <div className="pt-4 flex justify-end gap-2 border-t border-slate-100 mt-4">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Annuler</Button>
                <Button type="submit" className="bg-orange-500 text-white hover:bg-orange-600">Créer le dossier</Button>
            </div>
        </form>
      </Modal>
    </div>
  );
}