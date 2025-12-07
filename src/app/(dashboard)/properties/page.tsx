import React from "react";
import Link from "next/link";
import { Plus, Search, Filter, Building2, MapPin, Home } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/form";
import { EmptyState } from "@/components/ui/EmptyState"; // EmptyState Pro
import { getProperties } from "@/app/data/properties";
import { formatCurrency } from "@/lib/utils";
import { PROPERTY_STATUS_LABELS, PROPERTY_TYPE_LABELS } from "@/lib/constants";

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Mes Biens</h1>
           <p className="text-slate-500">Gérez votre inventaire ({properties.length} biens).</p>
        </div>
        <Link href="/properties/new">
           <Button className="bg-slate-900 text-white shadow-lg hover:bg-slate-800 transition-all">
             <Plus size={18} className="mr-2" /> Ajouter un bien
           </Button>
        </Link>
      </div>

      {/* FILTRES (Si on a des biens) */}
      {properties.length > 0 && (
         <div className="flex gap-4">
            <div className="relative flex-1 max-w-sm">
               <Input placeholder="Rechercher un bien..." icon={<Search size={18}/>} />
            </div>
            <Button variant="outline" className="bg-white border-slate-200 text-slate-600">
               <Filter size={16} className="mr-2"/> Filtres
            </Button>
         </div>
      )}

      {/* LISTE OU VIDE */}
      {properties.length === 0 ? (
         <EmptyState 
            icon={Home}
            title="Aucun bien pour le moment"
            description="Commencez par ajouter votre premier appartement, maison ou local commercial."
            actionLabel="Créer mon premier bien"
            // Note: Pour un lien Link dans EmptyState, il faudrait adapter le composant ou utiliser un client component wrapper.
            // Ici, pour faire simple, on peut laisser le bouton du header faire le travail ou wrapper.
         />
      ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
               <Link key={property.id} href={`/properties/${property.id}`} className="block h-full">
                  <Card hoverEffect className="group cursor-pointer overflow-hidden border-slate-200 h-full flex flex-col">
                     
                     {/* Image */}
                     <div className="h-48 bg-slate-100 relative flex items-center justify-center overflow-hidden">
                        {property.coverImage ? (
                           <img src={property.coverImage} alt={property.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        ) : (
                           <div className="text-slate-300 flex flex-col items-center">
                              <Building2 size={48} className="mb-2 opacity-50"/>
                              <span className="text-xs font-medium uppercase tracking-widest opacity-50">Sans image</span>
                           </div>
                        )}
                        
                        <div className="absolute top-3 left-3">
                           <Badge className="bg-white/90 backdrop-blur text-slate-800 shadow-sm border-none font-bold">
                              {PROPERTY_TYPE_LABELS[property.type] || property.type}
                           </Badge>
                        </div>
                        <div className="absolute top-3 right-3">
                            <Badge variant={property.status === 'AVAILABLE' ? 'success' : 'info'} className="shadow-sm">
                               {PROPERTY_STATUS_LABELS[property.status] || property.status}
                            </Badge>
                        </div>
                     </div>
                     
                     {/* Contenu */}
                     <CardContent className="p-5 flex-1 flex flex-col">
                        <div className="mb-4">
                           <h3 className="font-bold text-lg text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                              {property.title}
                           </h3>
                           <p className="text-slate-500 text-sm flex items-center gap-1 mt-1 truncate">
                              <MapPin size={14} className="text-orange-500 shrink-0" /> {property.address}
                           </p>
                        </div>
                        
                        <div className="mt-auto flex justify-between items-end pt-4 border-t border-slate-100">
                           <div>
                              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Loyer</span>
                              <span className="font-extrabold text-slate-900 text-xl">
                                 {formatCurrency(property.price)}
                              </span>
                           </div>
                           <Badge variant="secondary" className="bg-slate-50 text-slate-500 border-slate-100">
                              {property.tenants.length} Locataire(s)
                           </Badge>
                        </div>
                     </CardContent>
                  </Card>
               </Link>
            ))}
         </div>
      )}
    </div>
  );
}