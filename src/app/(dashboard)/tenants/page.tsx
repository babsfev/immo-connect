import React from "react";
import Link from "next/link";
import { Plus, Search, Filter, MessageCircle, MoreHorizontal, UploadCloud, User } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";
import { getTenants } from "@/app/data/tenants"; // <-- On utilise le vrai chargeur

export default async function TenantsPage() {
  // 1. Chargement des vraies données
  const tenants = await getTenants();

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mes Locataires</h1>
          <p className="text-slate-500">Gérez vos contrats ({tenants.length} actifs).</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white border-slate-200 text-slate-600">
            <UploadCloud size={18} className="mr-2" /> Importer
          </Button>
          <Link href="/tenants/new">
            <Button className="bg-blue-600 text-white shadow-lg hover:bg-blue-700">
               <Plus size={18} className="mr-2" /> Nouveau
            </Button>
          </Link>
        </div>
      </div>

      {/* EMPTY STATE (Si vide) */}
      {tenants.length === 0 ? (
         <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
               <User size={32}/>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Aucun locataire</h3>
            <p className="text-slate-500 mb-6 text-sm">Ajoutez votre premier locataire pour générer des loyers.</p>
            <Link href="/tenants/new"><Button>Ajouter un locataire</Button></Link>
         </div>
      ) : (
         <>
            {/* TABLEAU (DESKTOP) */}
            <div className="hidden md:block bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
               <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs border-b border-slate-100">
                  <tr>
                     <th className="px-6 py-4">Locataire</th>
                     <th className="px-6 py-4">Bien Loué</th>
                     <th className="px-6 py-4">Loyer</th>
                     <th className="px-6 py-4">Statut Paiement</th>
                     <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                  {tenants.map((tenant) => (
                     <tr key={tenant.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                                 {tenant.initials}
                              </div>
                              <div>
                                 <p className="font-bold text-slate-900">{tenant.name}</p>
                                 <p className="text-xs text-slate-500">{tenant.phone}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-700">{tenant.property}</td>
                        <td className="px-6 py-4 font-mono text-slate-600">{formatCurrency(tenant.rent)}</td>
                        <td className="px-6 py-4">
                           <Badge variant={tenant.status === "En retard" ? "danger" : tenant.status === "À jour" ? "success" : "warning"}>
                              {tenant.status}
                           </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <a href={`https://wa.me/${tenant.phone.replace(/\s/g,'')}`} target="_blank">
                                 <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:bg-green-50"><MessageCircle size={16}/></Button>
                              </a>
                              <Link href={`/tenants/${tenant.id}`}>
                                 <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-blue-600"><MoreHorizontal size={16}/></Button>
                              </Link>
                           </div>
                        </td>
                     </tr>
                  ))}
                  </tbody>
               </table>
            </div>

            {/* CARTES (MOBILE) */}
            <div className="md:hidden grid grid-cols-1 gap-4">
               {tenants.map((tenant) => (
                  <Link key={tenant.id} href={`/tenants/${tenant.id}`}>
                     <Card className="active:scale-[0.98] transition-transform">
                        <CardContent className="p-4 flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                                 {tenant.initials}
                              </div>
                              <div>
                                 <h4 className="font-bold text-slate-900">{tenant.name}</h4>
                                 <p className="text-xs text-slate-500">{tenant.property}</p>
                                 <Badge className="mt-1 text-[10px] px-1.5 py-0" variant={tenant.status === "En retard" ? "danger" : "success"}>
                                    {tenant.status}
                                 </Badge>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="font-bold text-slate-900">{formatCurrency(tenant.rent)}</p>
                           </div>
                        </CardContent>
                     </Card>
                  </Link>
               ))}
            </div>
         </>
      )}
    </div>
  );
}