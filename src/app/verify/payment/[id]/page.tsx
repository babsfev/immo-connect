import React from "react";
import { ShieldCheck, XCircle, Calendar, Building2, User, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Logo } from "@/components/ui/Logo";
import { formatCurrency } from "@/lib/utils";
// 👇 CORRECTION ICI (changement du nom de la fonction importée)
import { getPublicPaymentVerification } from "@/app/data/public-verification";
import Button from "@/components/ui/Button";

// OPTIMISATION : Cache la page pendant 60 secondes
export const revalidate = 60;

export default async function VerifyPaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // 👇 CORRECTION ICI AUSSI
  const payment = await getPublicPaymentVerification(id);

  // Cas 1 : Faux document ou ID invalide
  if (!payment) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center font-sans">
         <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-sm">
            <XCircle size={40} className="text-red-500" />
         </div>
         <h1 className="text-2xl font-bold text-slate-900">Document Inconnu</h1>
         <p className="text-slate-500 mt-2 max-w-xs mx-auto">
            Ce reçu n'existe pas dans nos registres ou a été révoqué par l'émetteur.
         </p>
      </div>
    );
  }

  const isPaid = payment.status === "PAID";
  // On accède à agencySettings via le manager
  const agency = payment.lease.property.manager.agencySettings;
  const agencyName = agency?.companyName || "Agence Partenaire";

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center py-12 px-4 font-sans text-slate-900">
      
      <div className="mb-8 scale-90 opacity-80 grayscale transition-all hover:grayscale-0 hover:scale-100">
         <Logo className="h-8 w-auto" />
      </div>

      <Card className="w-full max-w-md shadow-2xl border-t-8 border-t-green-500 overflow-hidden animate-in fade-in zoom-in-95 duration-500">
         
         {/* BANDEAU VALIDATION */}
         <div className="bg-green-50 p-8 text-center border-b border-green-100 relative overflow-hidden">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner relative z-10">
               <ShieldCheck size={32} />
            </div>
            <h1 className="text-xl font-extrabold text-green-900 relative z-10 tracking-tight">DOCUMENT AUTHENTIQUE</h1>
            <p className="text-green-700 text-sm mt-1 font-medium relative z-10">Certifié par Immo-Connect</p>
            <div className="mt-4 inline-block bg-white/80 backdrop-blur px-3 py-1 rounded-full text-[10px] font-mono text-green-800 border border-green-200">
               ID: {payment.id}
            </div>
         </div>

         <CardContent className="p-6 space-y-8">
            
            {/* MONTANT */}
            <div className="text-center">
               <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Montant Certifié</p>
               <p className="text-4xl font-extrabold text-slate-900 tracking-tight">
                  {formatCurrency(payment.receivedAmount || payment.amount)}
               </p>
               <div className="flex justify-center mt-3">
                  <Badge className={`px-3 py-1 text-xs font-bold border-none shadow-sm ${isPaid ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}`}>
                     {isPaid ? "PAYÉ INTÉGRALEMENT" : "PAIEMENT PARTIEL"}
                  </Badge>
               </div>
            </div>

            {/* DÉTAILS CLÉS */}
            <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
               <div className="flex items-start gap-4">
                  <div className="p-2 bg-white rounded-lg text-slate-400 border border-slate-100 shadow-sm"><User size={18}/></div>
                  <div>
                     <p className="text-xs font-bold text-slate-400 uppercase">Locataire</p>
                     <p className="font-bold text-slate-800 text-sm">{payment.tenantName}</p>
                  </div>
               </div>
               
               <div className="w-full h-px bg-slate-200/50"></div>

               <div className="flex items-start gap-4">
                  <div className="p-2 bg-white rounded-lg text-slate-400 border border-slate-100 shadow-sm"><Building2 size={18}/></div>
                  <div>
                     <p className="text-xs font-bold text-slate-400 uppercase">Bien Loué</p>
                     <p className="font-medium text-slate-700 text-sm leading-tight">{payment.propertyTitle}</p>
                  </div>
               </div>

               <div className="w-full h-px bg-slate-200/50"></div>

               <div className="flex items-start gap-4">
                  <div className="p-2 bg-white rounded-lg text-slate-400 border border-slate-100 shadow-sm"><Calendar size={18}/></div>
                  <div>
                     <p className="text-xs font-bold text-slate-400 uppercase">Date de valeur</p>
                     <p className="font-medium text-slate-700 text-sm">
                        {/* On utilise payment.date qui est déjà une string formatée ISO venant de getPublicPaymentVerification */}
                        {new Date(payment.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                     </p>
                  </div>
               </div>
            </div>

            {/* ACTION : TÉLÉCHARGER L'ORIGINAL */}
            <a 
               href={`/api/documents/${payment.id}`} 
               target="_blank" 
               rel="noopener noreferrer"
               className="block"
            >
               <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 h-12 shadow-lg">
                  <Download size={18} className="mr-2" /> Télécharger le PDF Original
               </Button>
            </a>

         </CardContent>
      </Card>
    </div>
  );
}