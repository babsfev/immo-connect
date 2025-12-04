import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, Phone, Mail, MapPin, MessageCircle, FileText, CheckCircle2, AlertCircle 
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";
import { getTenantById } from "@/app/data/tenants"; // <--- On importe la fonction ici !

export default async function TenantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Appel de la fonction importée
  const tenant = await getTenantById(id);

  if (!tenant) notFound();

  const activeLease = tenant.leases[0];
  const leaseStart = activeLease ? new Date(activeLease.startDate).toLocaleDateString("fr-FR") : "-";
  const leaseEnd = activeLease ? new Date(activeLease.endDate).toLocaleDateString("fr-FR") : "-";
  const waLink = `https://wa.me/${tenant.phone.replace(/\s/g,'')}?text=Bonjour ${tenant.firstName}`;

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex flex-col gap-4">
        <Link href="/tenants">
          <Button variant="ghost" size="sm" className="pl-0 text-slate-500 hover:text-slate-800">
            <ArrowLeft size={16} className="mr-2" /> Retour liste
          </Button>
        </Link>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
           <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
                 {tenant.firstName.charAt(0)}{tenant.lastName.charAt(0)}
              </div>
              <div>
                 <h1 className="text-2xl font-bold text-slate-900">{tenant.firstName} {tenant.lastName}</h1>
                 <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                    <Mail size={14}/> {tenant.email}
                    <span className="text-slate-300">•</span>
                    <Phone size={14}/> {tenant.phone}
                 </div>
              </div>
           </div>
           
           <div className="flex gap-2">
              <a href={waLink} target="_blank" rel="noopener noreferrer">
                 <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <MessageCircle size={18} className="mr-2"/> WhatsApp
                 </Button>
              </a>
              <Button variant="outline">Modifier</Button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* INFO PRINCIPALES */}
         <div className="lg:col-span-2 space-y-6">
            <Card>
               <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-base font-bold text-slate-800 flex justify-between items-center">
                     <span>Bien Loué</span>
                     {tenant.property ? (
                        <Link href={`/properties/${tenant.property.id}`} className="text-xs text-blue-600 hover:underline font-normal">
                           Voir la fiche bien
                        </Link>
                     ) : <Badge variant="warning">Aucun</Badge>}
                  </CardTitle>
               </CardHeader>
               <CardContent className="pt-4">
                  {tenant.property ? (
                     <div className="flex justify-between items-center">
                        <div>
                           <h3 className="font-bold text-lg text-slate-900">{tenant.property.title}</h3>
                           <p className="text-slate-500 text-sm flex items-center gap-1 mt-1">
                              <MapPin size={14} className="text-orange-500"/> {tenant.property.address}, {tenant.property.city}
                           </p>
                        </div>
                        <div className="text-right">
                           <p className="text-xs text-slate-400 font-bold uppercase">Loyer Actuel</p>
                           <p className="text-xl font-extrabold text-blue-700">{activeLease ? formatCurrency(activeLease.rentAmount) : "-"}</p>
                        </div>
                     </div>
                  ) : (
                     <p className="text-slate-500 italic">Ce locataire n'est assigné à aucun bien.</p>
                  )}
               </CardContent>
            </Card>

            {/* HISTORIQUE PAIEMENTS */}
            <Card>
               <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-base font-bold text-slate-800">Derniers Paiements</CardTitle>
               </CardHeader>
               <CardContent className="p-0">
                  <div className="divide-y divide-slate-100">
                     {tenant.payments.length === 0 ? (
                        <div className="p-6 text-center text-slate-400 text-sm">Aucun historique.</div>
                     ) : (
                        tenant.payments.map(pay => (
                           <div key={pay.id} className="p-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
                              <div className="flex items-center gap-3">
                                 <div className={`p-2 rounded-full ${pay.status === 'PAID' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                    {pay.status === 'PAID' ? <CheckCircle2 size={16}/> : <AlertCircle size={16}/>}
                                 </div>
                                 <div>
                                    <p className="text-sm font-bold text-slate-900">{formatCurrency(pay.amount)}</p>
                                    <p className="text-xs text-slate-500">Échéance : {new Date(pay.dueDate).toLocaleDateString()}</p>
                                 </div>
                              </div>
                              <Badge variant={pay.status === 'PAID' ? 'success' : 'warning'}>
                                 {pay.status}
                              </Badge>
                           </div>
                        ))
                     )}
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* SIDEBAR INFO */}
         <div className="space-y-6">
            <Card>
               <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
                  <CardTitle className="text-sm font-bold text-slate-800">Détails du Bail</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4 pt-4">
                  <div className="flex justify-between text-sm">
                     <span className="text-slate-500">Début</span>
                     <span className="font-medium">{leaseStart}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                     <span className="text-slate-500">Fin (Renouv.)</span>
                     <span className="font-medium">{leaseEnd}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                     <span className="text-slate-500">Dépôt Garantie</span>
                     <span className="font-medium">{activeLease ? formatCurrency(activeLease.deposit) : "-"}</span>
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                     <Button variant="outline" className="w-full justify-start text-slate-600">
                        <FileText size={16} className="mr-2"/> Voir le contrat
                     </Button>
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-sm font-bold text-slate-800">Solvabilité</CardTitle>
               </CardHeader>
               <CardContent className="pt-4 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-4 border-green-100 text-green-600 text-2xl font-bold mb-2">
                     {tenant.solvencyScore ?? 100}
                  </div>
                  <p className="text-xs text-slate-500">Score de fiabilité</p>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}