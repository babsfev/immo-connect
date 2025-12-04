"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Pour la redirection
import { 
  ArrowLeft, MapPin, BedDouble, Bath, Maximize, Edit, Trash2, 
  User, Phone, Mail, FileText, TrendingUp, Wallet, History, Wrench
} from "lucide-react";
import { toast } from "sonner";

import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs"; // Ton composant Breadcrumbs
import { formatCFA } from "@/lib/senegal-data"; 

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  // Simulation Data
  const property = {
    id: params.id,
    title: "Villa Corniche Ouest",
    address: "Corniche Ouest, Dakar, Sénégal",
    price: 1200000,
    status: "Loué",
    type: "Villa",
    description: "Magnifique villa de haut standing avec vue sur mer, piscine et jardin arboré. Située dans un quartier sécurisé et prisé.",
    specs: { beds: 4, baths: 3, area: 250, built: 2018 },
    tenant: {
      name: "Fatou Sow",
      email: "fatou.sow@gmail.com",
      phone: "+221 77 000 11 22",
      entryDate: "01 Jan 2023",
      paymentStatus: "À jour"
    },
    financials: {
      yield: "8.5%",
      totalRevenue: 14400000,
      expenses: 1200000
    }
  };

  let badgeVariant: "success" | "default" | "warning" = "default";
  if (property.status === "Loué") badgeVariant = "success";
  if (property.status === "Travaux") badgeVariant = "warning";

  // Actions Handlers
  const handleDelete = () => {
      if(confirm("Êtes-vous sûr de vouloir supprimer ce bien ?")) {
          toast.success("Bien supprimé", { description: "Redirection vers la liste..." });
          setTimeout(() => router.push("/properties"), 1000);
      }
  };

  const handleEdit = () => {
      toast.info("Mode édition", { description: "Fonctionnalité d'édition à venir." });
  };

  return (
    <div className="space-y-8 pb-10">
      
      {/* 1. Navigation & Header */}
      <div className="flex flex-col gap-4">
        {/* BREADCRUMBS AJOUTÉ ICI */}
        <div className="flex items-center justify-between">
            <Breadcrumbs 
                items={[
                { label: "Mes Biens", href: "/properties" },
                { label: property.title } 
                ]} 
            />
            <Link href="/properties">
                <Button variant="ghost" size="sm" className="text-slate-500 hover:text-blue-600">
                    <ArrowLeft size={16} className="mr-2" /> Retour
                </Button>
            </Link>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mt-2">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant={badgeVariant}>{property.status}</Badge>
              <span className="text-sm text-blue-600 font-semibold uppercase tracking-wider">{property.type}</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900">{property.title}</h1>
            <div className="flex items-center text-slate-500 mt-2">
              <MapPin size={16} className="mr-1 text-orange-500" />
              {property.address}
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleEdit} variant="outline" className="border-slate-200 text-slate-600">
              <Edit size={16} className="mr-2" /> Modifier
            </Button>
            <Button onClick={handleDelete} variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
              <Trash2 size={16} className="mr-2" /> Supprimer
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 2. COLONNE GAUCHE : Détails & Photos */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Image Placeholder */}
          <div className="h-64 md:h-80 w-full bg-slate-200 rounded-xl relative overflow-hidden group shadow-sm">
             <div className="absolute inset-0 bg-linear-to-t from-slate-900/50 to-transparent"></div>
             <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">
                
             </div>
             <div className="absolute bottom-4 left-4 right-4 flex justify-between text-white">
                <div className="flex gap-6">
                   <span className="flex items-center gap-2"><BedDouble size={20}/> {property.specs.beds} Ch.</span>
                   <span className="flex items-center gap-2"><Bath size={20}/> {property.specs.baths} Sdb.</span>
                   <span className="flex items-center gap-2"><Maximize size={20}/> {property.specs.area} m²</span>
                </div>
             </div>
          </div>

          {/* Description */}
          <Card>
             <CardHeader>
                <CardTitle>Description</CardTitle>
             </CardHeader>
             <CardContent>
                <p className="text-slate-600 leading-relaxed">
                   {property.description}
                </p>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                   <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-xs text-slate-500 mb-1">Année constr.</p>
                      <p className="font-semibold text-slate-900">{property.specs.built}</p>
                   </div>
                   <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-xs text-slate-500 mb-1">Climatisation</p>
                      <p className="font-semibold text-slate-900">Oui</p>
                   </div>
                   <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-xs text-slate-500 mb-1">Parking</p>
                      <p className="font-semibold text-slate-900">2 Places</p>
                   </div>
                   <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-xs text-slate-500 mb-1">Sécurité</p>
                      <p className="font-semibold text-slate-900">24/7</p>
                   </div>
                </div>
             </CardContent>
          </Card>

          {/* Historique */}
          <Card>
             <CardHeader>
                <CardTitle className="flex items-center gap-2">
                   <History size={18} className="text-slate-400"/> Historique Récent
                </CardTitle>
             </CardHeader>
             <CardContent>
                <div className="space-y-4">
                   <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                         <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600"><Wallet size={14}/></div>
                         <div><p className="text-sm font-medium">Loyer reçu</p><p className="text-xs text-slate-500">05 Nov 2024</p></div>
                      </div>
                      <span className="text-sm font-bold text-slate-900">+ {formatCFA(1200000)}</span>
                   </div>
                   <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                         <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600"><Wrench size={14} /></div>
                         <div><p className="text-sm font-medium">Maintenance (Fuite)</p><p className="text-xs text-slate-500">28 Oct 2024</p></div>
                      </div>
                      <span className="text-sm font-bold text-red-600">- {formatCFA(45000)}</span>
                   </div>
                </div>
             </CardContent>
          </Card>
        </div>

        {/* 3. COLONNE DROITE : Gestion & Locataire */}
        <div className="space-y-6">
           
           {/* Carte Financière */}
           <Card className="bg-slate-900 text-white border-slate-800">
              <CardContent className="p-6">
                 <div className="flex items-center gap-2 mb-6 opacity-80">
                    <TrendingUp size={18} className="text-green-400" />
                    <span className="text-sm font-medium">Performance Financière</span>
                 </div>
                 <div className="mb-6">
                    <p className="text-sm text-slate-400 mb-1">Loyer Mensuel</p>
                    <p className="text-3xl font-bold text-white">{formatCFA(property.price)}</p>
                 </div>
                 <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
                    <div>
                       <p className="text-xs text-slate-400">Rentabilité</p>
                       <p className="text-lg font-semibold text-green-400">{property.financials.yield}</p>
                    </div>
                    <div>
                       <p className="text-xs text-slate-400">Revenus (Année)</p>
                       <p className="text-lg font-semibold text-white">14.4M</p>
                    </div>
                 </div>
              </CardContent>
           </Card>

           {/* Carte Locataire */}
           <Card>
              <CardHeader>
                 <CardTitle>Locataire Actuel</CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                       {property.tenant.name.charAt(0)}
                    </div>
                    <div>
                       <p className="font-bold text-slate-900">{property.tenant.name}</p>
                       <Badge variant="success" className="mt-1 text-[10px] px-1.5 py-0">{property.tenant.paymentStatus}</Badge>
                    </div>
                 </div>
                 
                 <div className="space-y-3">
                    <a href={`tel:${property.tenant.phone}`} className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-600 transition-colors p-2 hover:bg-slate-50 rounded-lg">
                       <Phone size={16} /> {property.tenant.phone}
                    </a>
                    <a href={`mailto:${property.tenant.email}`} className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-600 transition-colors p-2 hover:bg-slate-50 rounded-lg">
                       <Mail size={16} /> {property.tenant.email}
                    </a>
                    <button className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-600 transition-colors p-2 hover:bg-slate-50 rounded-lg w-full text-left">
                       <FileText size={16} /> Voir le contrat
                    </button>
                 </div>

                 <div className="mt-6 pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-400 mb-2">Entrée le : {property.tenant.entryDate}</p>
                    <Button variant="outline" size="sm" className="w-full">Historique complet</Button>
                 </div>
              </CardContent>
           </Card>
        </div>

      </div>
    </div>
  );
}