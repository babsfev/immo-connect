import React from "react";
import Link from "next/link";
import { 
  ArrowLeft, Phone, Mail, MapPin, FileText, 
  CheckCircle2, AlertCircle, Clock, Download, 
  TrendingUp, Shield, Star 
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";

export default function TenantDetailPage({ params }: { params: { id: string } }) {
  // Mock Data Locataire
  const tenant = {
    id: params.id,
    name: "Moussa Diop",
    email: "moussa.diop@gmail.com",
    phone: "+221 77 123 45 67",
    job: "Ingénieur Informatique",
    status: "À jour",
    score: 95, // Score de fiabilité
    property: "Appartement T3 - Centre Ville",
    leaseStart: "01 Jan 2023",
    leaseEnd: "31 Déc 2024",
    rent: 450000,
    deposit: 900000,
    documents: [
      { name: "Contrat de Bail.pdf", date: "01 Jan 2023", size: "2.4 Mo" },
      { name: "État des lieux.pdf", date: "01 Jan 2023", size: "1.1 Mo" },
      { name: "Pièce d'identité.jpg", date: "15 Déc 2022", size: "0.5 Mo" },
    ],
    history: [
      { month: "Nov 2024", amount: 450000, status: "Payé", date: "05 Nov" },
      { month: "Oct 2024", amount: 450000, status: "Payé", date: "04 Oct" },
      { month: "Sep 2024", amount: 450000, status: "Retard", date: "12 Sep" }, // Payé en retard
      { month: "Août 2024", amount: 450000, status: "Payé", date: "03 Août" },
    ]
  };

  return (
    <div className="space-y-8 pb-10">
      
      {/* 1. Header & Navigation */}
      <div className="flex flex-col gap-4">
        <Link href="/tenants">
          <Button variant="ghost" size="sm" className="pl-0 text-slate-500 hover:text-blue-600">
            <ArrowLeft size={16} className="mr-2" /> Retour
          </Button>
        </Link>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
           <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
                 {tenant.name.charAt(0)}
              </div>
              <div>
                 <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    {tenant.name}
                    <Badge variant="success" className="text-xs">{tenant.status}</Badge>
                 </h1>
                 <p className="text-slate-500 flex items-center gap-1 text-sm">
                    <MapPin size={14}/> {tenant.property}
                 </p>
              </div>
           </div>
           <div className="flex gap-2">
              <Button variant="outline"><Mail size={16} className="mr-2"/> Message</Button>
              <Button className="bg-blue-600 text-white"><Phone size={16} className="mr-2"/> Appeler</Button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* 2. COLONNE GAUCHE : Infos & Score */}
         <div className="space-y-6">
            
            {/* Carte Score (Avis Automatique) */}
            <Card className="bg-linear-to-br from-slate-900 to-slate-800 text-white border-none">
               <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <p className="text-slate-400 text-sm">Fiabilité Locataire</p>
                        <h3 className="text-3xl font-bold text-white mt-1">{tenant.score}/100</h3>
                     </div>
                     <div className="p-2 bg-white/10 rounded-lg"><Shield className="text-green-400" size={24}/></div>
                  </div>
                  <div className="space-y-2">
                     <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full" style={{ width: `${tenant.score}%` }}></div>
                     </div>
                     <p className="text-xs text-slate-400 italic">
                        "Locataire assidu. Un seul retard léger en 12 mois."
                     </p>
                  </div>
               </CardContent>
            </Card>

            {/* Infos Contrat */}
            <Card>
               <CardHeader><CardTitle>Contrat de Bail</CardTitle></CardHeader>
               <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                     <span className="text-slate-500">Loyer</span>
                     <span className="font-bold text-slate-900">{formatCurrency(tenant.rent)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                     <span className="text-slate-500">Caution</span>
                     <span className="font-bold text-slate-900">{formatCurrency(tenant.deposit)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                     <span className="text-slate-500">Début du bail</span>
                     <span className="font-medium text-slate-700">{tenant.leaseStart}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                     <span className="text-slate-500">Fin du bail</span>
                     <span className="font-medium text-slate-700">{tenant.leaseEnd}</span>
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                     <Button variant="outline" className="w-full text-xs"><FileText size={14} className="mr-2"/> Voir le contrat</Button>
                  </div>
               </CardContent>
            </Card>

            {/* Documents */}
            <Card>
               <CardHeader><CardTitle>Documents</CardTitle></CardHeader>
               <CardContent className="space-y-3">
                  {tenant.documents.map((doc, i) => (
                     <div key={i} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg border border-transparent hover:border-slate-100 transition-all group cursor-pointer">
                        <div className="flex items-center gap-3 overflow-hidden">
                           <div className="bg-orange-50 text-orange-600 p-2 rounded"><FileText size={16}/></div>
                           <div className="truncate">
                              <p className="text-sm font-medium text-slate-700 truncate">{doc.name}</p>
                              <p className="text-[10px] text-slate-400">{doc.date} • {doc.size}</p>
                           </div>
                        </div>
                        <Download size={16} className="text-slate-300 group-hover:text-blue-600"/>
                     </div>
                  ))}
               </CardContent>
            </Card>
         </div>

         {/* 3. COLONNE DROITE : Historique Paiements */}
         <div className="lg:col-span-2">
            <Card className="h-full">
               <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                     <TrendingUp size={20} className="text-blue-600"/> Historique des Paiements
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="space-y-1">
                     {tenant.history.map((payment, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                           <div className="flex items-center gap-4">
                              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                                 payment.status === "Payé" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                              }`}>
                                 {payment.status === "Payé" ? <CheckCircle2 size={18}/> : <Clock size={18}/>}
                              </div>
                              <div>
                                 <p className="font-bold text-slate-900">{payment.month}</p>
                                 <p className="text-xs text-slate-500">Reçu le {payment.date}</p>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="font-bold text-slate-900">{formatCurrency(payment.amount)}</p>
                              <Badge variant={payment.status === "Payé" ? "success" : "warning"} className="mt-1">
                                 {payment.status}
                              </Badge>
                           </div>
                           <Button variant="ghost" size="sm" className="text-slate-400 hover:text-blue-600">
                              <Download size={16}/>
                           </Button>
                        </div>
                     ))}
                  </div>
                  {/* Bouton Générer avis */}
                  <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <Star className="text-orange-500 fill-orange-500" size={20} />
                        <div>
                           <p className="text-sm font-bold text-blue-900">Générer une attestation de bon payeur ?</p>
                           <p className="text-xs text-blue-600">Basé sur son score de 95/100.</p>
                        </div>
                     </div>
                     <Button size="sm" className="bg-blue-600 text-white">Générer PDF</Button>
                  </div>
               </CardContent>
            </Card>
         </div>

      </div>
    </div>
  );
}