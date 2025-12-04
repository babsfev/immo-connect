import React from "react";
import Link from "next/link";
import { Plus, Search, Filter, Building2, MapPin, Home } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getProperties } from "@/app/data/properties"; // Vrai Loader BDD
import { formatCurrency } from "@/lib/utils";

const TYPE_LABELS: Record<string, string> = {
  APARTMENT: "Appartement", HOUSE: "Maison", STUDIO: "Studio",
  OFFICE: "Bureau", RETAIL: "Commerce", WAREHOUSE: "Entrepôt",
  INDUSTRIAL: "Industriel", LAND: "Terrain", PARKING: "Parking", BUILDING: "Immeuble", ROOM: "Chambre"
};

export default async function PropertiesPage() {
  // 1. Chargement des vraies données (Côté Serveur)
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
           <Button className="bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all">
             <Plus size={18} className="mr-2" /> Ajouter un bien
           </Button>
        </Link>
      </div>

      {/* FILTRES (Visuels pour l'instant) */}
      <div className="flex flex-col sm:flex-row gap-4">
         <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
            <input 
              type="text" 
              placeholder="Rechercher un bien..." 
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm"
            />
         </div>
         <Button variant="outline" className="bg-white border-slate-200 text-slate-600">
            <Filter size={16} className="mr-2"/> Filtres
         </Button>
      </div>

      {/* LISTE DES BIENS */}
      {properties.length === 0 ? (
         <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <Home size={32}/>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Aucun bien pour le moment</h3>
            <p className="text-slate-500 mb-6 text-sm max-w-xs mx-auto">Commencez par ajouter votre premier appartement, maison ou local commercial.</p>
            <Link href="/properties/new"><Button>Créer mon premier bien</Button></Link>
         </div>
      ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
               <Link key={property.id} href={`/properties/${property.id}`} className="block h-full">
                  <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden border-slate-200 h-full flex flex-col">
                     
                     {/* Image */}
                     <div className="h-48 bg-slate-100 relative flex items-center justify-center overflow-hidden">
                        {property.coverImage ? (
                           <img src={property.coverImage} alt={property.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        ) : (
                           <Building2 size={48} className="text-slate-300"/>
                        )}
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3">
                           <Badge className="bg-white/90 backdrop-blur text-slate-800 shadow-sm border-none font-bold">
                              {TYPE_LABELS[property.type] || property.type}
                           </Badge>
                        </div>
                        <div className="absolute top-3 right-3">
                            <Badge className={`border-none text-white shadow-sm ${property.status === 'AVAILABLE' ? 'bg-green-500' : 'bg-blue-500'}`}>
                               {property.status === 'AVAILABLE' ? 'Vacant' : 'Loué'}
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
                           <span className={`text-xs font-medium px-2.5 py-1 rounded-md ${property.tenants.length > 0 ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                              {property.tenants.length > 0 ? `${property.tenants.length} Locataire(s)` : '0 Locataire'}
                           </span>
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