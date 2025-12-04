"use client";

import React, { useState } from "react";
import { 
  Plus, Search, Filter, MapPin, BedDouble, Bath, Maximize, 
  MoreVertical, Home, Building2, Warehouse, Globe 
} from "lucide-react";
import { toast } from "sonner"; // Pour les notifications
import { AddPropertyWizard } from "@/components/properties/AddPropertyWizard";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/EmptyState"; 
import { formatCurrency } from "@/lib/utils"; 
import { Map } from "lucide-react"; 
// --- MOCK DATA ---
const properties = [
  {
    id: 1,
    title: "Appartement T3 - Centre Ville",
    address: "12 Rue de la République, Dakar",
    price: 450000,
    currency: "XOF",
    locale: "fr-SN",
    status: "Loué",
    type: "Appartement",
    image: "bg-blue-100", 
    icon: Building2,
    specs: { beds: 2, baths: 1, area: 85 },
    tenant: "Moussa Diop"
  },
  {
    id: 2,
    title: "Penthouse Champs-Élysées",
    address: "Paris 8ème, France",
    price: 4500, 
    currency: "EUR",
    locale: "fr-FR",
    status: "Vacant",
    type: "Appartement",
    image: "bg-indigo-100",
    icon: Building2,
    specs: { beds: 3, baths: 2, area: 120 },
    tenant: null
  },
  {
    id: 3,
    title: "Villa Corniche Ouest",
    address: "Corniche Ouest, Dakar",
    price: 1200000,
    currency: "XOF",
    locale: "fr-SN",
    status: "Loué",
    type: "Villa",
    image: "bg-orange-100",
    icon: Home,
    specs: { beds: 4, baths: 3, area: 250 },
    tenant: "Fatou Sow"
  },
  {
    id: 4,
    title: "Loft Manhattan",
    address: "SoHo, New York, USA",
    price: 6000,
    currency: "USD",
    locale: "en-US",
    status: "Travaux",
    type: "Loft",
    image: "bg-slate-800",
    icon: Warehouse,
    specs: { beds: 1, baths: 1, area: 150 },
    tenant: null
  }
];

export default function PropertiesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fonction de soumission du formulaire (Simulation)
  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, tu ajouterais la logique pour sauvegarder en base de données
    
    setIsModalOpen(false); // Fermer le modal
    toast.success("Bien immobilier ajouté !", {
      description: "Le nouveau bien a été enregistré avec succès."
    });
  };

  function toggleView(arg0: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="space-y-8 pb-10">
      
      {/* --- Actions Header --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mes Biens</h1>
          <p className="text-slate-500">Gestion internationale de votre parc.</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          <Plus size={18} className="mr-2" />
          Ajouter un bien
        </Button>
      </div>

      {/* --- Filtres & Recherche --- */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input placeholder="Rechercher par ville, pays..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Globe size={16} className="mr-2" /> Devises
          </Button>
          <Button variant="outline">
            <Filter size={16} className="mr-2" /> Filtres
          </Button>
          <Button variant="outline" onClick={() => toggleView('map')}>
            <Map size={16} className="mr-2" /> Vue Carte
          </Button>
        </div>
      </div>

      {/* --- Contenu Principal (Empty State ou Grille) --- */}
      {properties.length === 0 ? (
        <EmptyState 
          icon={Building2} 
          title="Aucun bien immobilier" 
          description="Commencez par ajouter votre premier bien pour gérer vos locations."
          actionLabel="Ajouter un bien"
          onAction={() => setIsModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => {
            const Icon = property.icon;
            let badgeVariant: "success" | "default" | "warning" | "danger" = "default";
            if (property.status === "Loué") badgeVariant = "success";
            if (property.status === "Travaux") badgeVariant = "warning";
            if (property.status === "Vacant") badgeVariant = "danger"; 

            return (
              <Card key={property.id} className="group hover:shadow-lg hover:border-blue-200 transition-all overflow-hidden cursor-pointer">
                {/* Image Header */}
                <div className={`h-48 w-full ${property.image} relative flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}>
                  <Icon size={48} className="text-white/50" />
                  <div className="absolute top-4 right-4">
                    <Badge variant={badgeVariant}>{property.status}</Badge>
                  </div>
                </div>

                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">{property.type}</p>
                      <h3 className="font-bold text-lg text-slate-900 line-clamp-1">{property.title}</h3>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical size={18} />
                    </Button>
                  </div>

                  <div className="flex items-center text-slate-500 text-sm mb-4">
                    <MapPin size={14} className="mr-1 text-slate-400" />
                    <span className="truncate">{property.address}</span>
                  </div>

                  <div className="flex items-center gap-4 py-4 border-t border-slate-100 mb-4">
                    <div className="flex items-center gap-1.5 text-slate-600 text-sm"><BedDouble size={16} className="text-slate-400" /> {property.specs.beds}</div>
                    <div className="flex items-center gap-1.5 text-slate-600 text-sm"><Bath size={16} className="text-slate-400" /> {property.specs.baths}</div>
                    <div className="flex items-center gap-1.5 text-slate-600 text-sm"><Maximize size={16} className="text-slate-400" /> {property.specs.area} m²</div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <p className="text-sm text-slate-400">Loyer mensuel</p>
                      <p className="text-lg font-bold text-slate-900">
                        {formatCurrency(property.price, property.currency, property.locale)}
                      </p>
                    </div>
                    {property.tenant ? (
                      <div className="flex items-center gap-2 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-700">
                          {property.tenant.charAt(0)}
                        </div>
                        <span className="text-xs font-medium text-slate-600 max-w-20 truncate">{property.tenant}</span>
                      </div>
                    ) : (
                      <Badge variant="secondary" className="text-xs">Disponible</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* --- Modal d'ajout --- */}
      <AddPropertyWizard isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}