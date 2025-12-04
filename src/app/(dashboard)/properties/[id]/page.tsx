import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, Building2, MapPin, Edit, Trash2, 
  User, FileText, Wallet, Maximize, BedDouble, Bath, 
  Grid, Plus, ArrowRight
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getPropertyById } from "@/app/data/properties";
import { formatCurrency } from "@/lib/utils";
import { PROPERTY_STATUS_LABELS, PROPERTY_TYPE_LABELS } from "@/lib/constants";
import DeletePropertyButton from "@/components/properties/DeletePropertyButton";

export default async function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const property = await getPropertyById(params.id);

  if (!property) notFound();

  const isRented = property.status === "RENTED";
  const isBuilding = property.type === "BUILDING" || property.lots.length > 0;

  // Calculs automatiques pour l'immeuble
  const totalRent = property.lots.reduce((sum, lot) => sum + lot.price, 0);
  const occupiedLots = property.lots.filter(lot => lot.tenants.length > 0).length;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 animate-in fade-in duration-500">
      
      {/* HEADER & NAVIGATION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Link href="/properties" className="text-slate-500 hover:text-slate-900 text-sm flex items-center gap-2 font-medium transition-colors">
           <ArrowLeft size={16}/> Retour à la liste
        </Link>
        <div className="flex gap-2">
           <DeletePropertyButton id={property.id} title={property.title} />
           <Link href={`/properties/${property.id}/edit`}>
              <Button variant="outline" className="bg-white border-slate-200 text-slate-700">
                 <Edit size={16} className="mr-2"/> Modifier
              </Button>
           </Link>
        </div>
      </div>

      {/* CARTE D'IDENTITÉ DU BIEN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* COLONNE GAUCHE : IMAGE & INFO PRINCIPALE */}
         <div className="lg:col-span-2 space-y-6">
            
            <Card className="overflow-hidden border-slate-200 shadow-md">
               <div className="h-64 bg-slate-100 relative flex items-center justify-center border-b border-slate-100 overflow-hidden">
                  {property.coverImage ? (
                    <img src={property.coverImage} alt={property.title} className="w-full h-full object-cover" />
                  ) : (
                    <Building2 size={64} className="text-slate-300"/>
                  )}
                  
                  <Badge className={`absolute top-4 right-4 px-3 py-1 text-sm ${isRented || occupiedLots > 0 ? "bg-blue-600" : "bg-green-600"} border-none text-white shadow-sm`}>
                     {isBuilding 
                        ? `${occupiedLots}/${property.lots.length} Occupés` 
                        : (PROPERTY_STATUS_LABELS[property.status] || property.status)}
                  </Badge>
               </div>
               
               <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                           {PROPERTY_TYPE_LABELS[property.type] || property.type}
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-900">{property.title}</h1>
                     </div>
                     <div className="text-right">
                        {/* Si c'est un immeuble, on affiche la somme des loyers */}
                        <p className="text-2xl font-extrabold text-blue-600">
                           {isBuilding ? formatCurrency(totalRent) : formatCurrency(property.price)}
                        </p>
                        <p className="text-xs text-slate-400 font-medium">
                           {isBuilding ? "/ mois (Potentiel)" : "/ mois"}
                        </p>
                     </div>
                  </div>

                  <div className="flex items-center gap-2 text-slate-600 mb-6">
                     <MapPin size={18} className="text-orange-500"/>
                     <span className="font-medium">{property.address}, {property.city}</span>
                  </div>

                  {/* Specs Grid (Caché pour un Immeuble global car non pertinent ?) */}
                  {!isBuilding && (
                     <div className="grid grid-cols-3 gap-4 py-6 border-t border-slate-100">
                        <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                           <Maximize size={20} className="text-slate-400 mb-2"/>
                           <span className="font-bold text-slate-900">{property.surface || "-"} m²</span>
                           <span className="text-[10px] text-slate-500 uppercase font-bold mt-1">Surface</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                           <BedDouble size={20} className="text-slate-400 mb-2"/>
                           <span className="font-bold text-slate-900">{property.rooms || "-"}</span>
                           <span className="text-[10px] text-slate-500 uppercase font-bold mt-1">Pièces</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                           <Bath size={20} className="text-slate-400 mb-2"/>
                           <span className="font-bold text-slate-900">{property.bathrooms || "-"}</span>
                           <span className="text-[10px] text-slate-500 uppercase font-bold mt-1">SDB</span>
                        </div>
                     </div>
                  )}
               </CardContent>
            </Card>

            {/* --- SECTION LOTS (VISIBLE SI IMMEUBLE) --- */}
            {isBuilding && (
               <Card>
                  <CardHeader className="border-b border-slate-100 pb-3 flex flex-row items-center justify-between">
                     <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <Grid size={20} className="text-blue-600"/> Composition de l'Immeuble
                     </CardTitle>
                     <Link href={`/properties/new?parentId=${property.id}&parentName=${encodeURIComponent(property.title)}`}>
                        <Button size="sm" className="bg-blue-600 text-white">
                           <Plus size={16} className="mr-2"/> Ajouter un lot
                        </Button>
                     </Link>
                  </CardHeader>
                  <CardContent className="p-0">
                     {property.lots.length > 0 ? (
                        <div className="divide-y divide-slate-100">
                           {property.lots.map((lot) => (
                              <Link key={lot.id} href={`/properties/${lot.id}`} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
                                 <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
                                       <Building2 size={20}/>
                                    </div>
                                    <div>
                                       <p className="font-bold text-slate-900">{lot.title}</p>
                                       <p className="text-xs text-slate-500">{PROPERTY_TYPE_LABELS[lot.type]} • {formatCurrency(lot.price)}</p>
                                    </div>
                                 </div>
                                 <div className="flex items-center gap-3">
                                    {lot.tenants.length > 0 ? (
                                       <Badge variant="success" className="bg-green-100 text-green-700 border-none">Occupé</Badge>
                                    ) : (
                                       <Badge variant="secondary" className="bg-slate-100 text-slate-500 border-none">Vacant</Badge>
                                    )}
                                    <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-600"/>
                                 </div>
                              </Link>
                           ))}
                        </div>
                     ) : (
                        <div className="p-8 text-center text-slate-500">
                           <p className="mb-2">Aucun lot créé pour cet immeuble.</p>
                           <p className="text-xs text-slate-400">Ajoutez des appartements, chambres ou magasins.</p>
                        </div>
                     )}
                  </CardContent>
               </Card>
            )}

            {property.description && (
               <Card>
                  <CardHeader><CardTitle className="text-base">Description</CardTitle></CardHeader>
                  <CardContent><p className="text-slate-600 leading-relaxed">{property.description}</p></CardContent>
               </Card>
            )}
         </div>

         {/* COLONNE DROITE */}
         <div className="space-y-6">
            
            {/* Si c'est un lot simple : on affiche le locataire. Si Immeuble : on affiche le résumé */}
            {!isBuilding && (
               <Card className="border-l-4 border-l-blue-600 shadow-sm">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-sm font-bold uppercase text-slate-500 flex items-center gap-2">
                        <User size={16}/> Locataire Actuel
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     {property.tenants && property.tenants.length > 0 ? (
                        <div className="flex items-center gap-4 py-2">
                           <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border-2 border-white shadow-sm">
                              {property.tenants[0].firstName.charAt(0)}
                           </div>
                           <div>
                              <p className="font-bold text-slate-900">{property.tenants[0].firstName} {property.tenants[0].lastName}</p>
                              <Link href={`/tenants/${property.tenants[0].id}`} className="text-xs text-blue-600 hover:underline font-medium">Voir le dossier</Link>
                           </div>
                        </div>
                     ) : (
                        <div className="text-center py-6 text-slate-400 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                           <p className="text-sm">Aucun locataire</p>
                           <Link href="/tenants/new"><Button size="sm" variant="ghost" className="text-blue-600 p-0 h-auto font-bold hover:underline">Ajouter un locataire</Button></Link>
                        </div>
                     )}
                  </CardContent>
               </Card>
            )}

            {/* Raccourcis Rapides */}
            <Card>
               <CardHeader className="pb-3"><CardTitle className="text-sm font-bold text-slate-900">Gestion</CardTitle></CardHeader>
               <CardContent className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-slate-600 h-10 hover:bg-slate-50 border border-transparent hover:border-slate-200">
                     <FileText size={16} className="mr-3 text-slate-400"/> Contrats & Baux
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-slate-600 h-10 hover:bg-slate-50 border border-transparent hover:border-slate-200">
                     <Wallet size={16} className="mr-3 text-slate-400"/> Historique Paiements
                  </Button>
               </CardContent>
            </Card>

         </div>
      </div>
    </div>
  );
}