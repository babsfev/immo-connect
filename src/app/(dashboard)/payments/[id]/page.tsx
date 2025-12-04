"use client";

import React, { use } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Printer, Download, CheckCircle2, AlertCircle, Building2, User, Send, MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

export default function PaymentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const status = searchParams.get('status') || 'Payé';
  
  // Simulation data
  const payment = {
      id: decodeURIComponent(id),
      amount: 450000,
      date: status === "Payé" ? "05 Nov 2024" : "En attente",
      tenant: "Jean Dupont",
      property: "Apt 4B - Le Plateau",
      method: status === "Payé" ? "Virement" : "-",
      status: status,
      phone: "770000000"
  };

  const isPaid = status === "Payé";

  const handleRelance = () => {
     toast.success("Relance envoyée", { description: "Le locataire a reçu l'avis d'échéance par SMS et Email." });
  };

  const getWhatsAppLink = () => {
    const message = `Bonjour ${payment.tenant}. Voici votre avis d'échéance de ${formatCurrency(payment.amount)} pour ${payment.property}. Merci de procéder au règlement.`;
    return `https://wa.me/${payment.phone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-10 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/payments">
          <Button variant="ghost" size="sm" className="pl-0 text-slate-500"><ArrowLeft size={16} className="mr-2" /> Retour Finances</Button>
        </Link>
        <div className="flex gap-2">
           <Button variant="outline" size="sm"><Printer size={16} className="mr-2"/> Imprimer</Button>
           <Button className="bg-blue-600 text-white" size="sm"><Download size={16} className="mr-2"/> PDF</Button>
        </div>
      </div>

      {/* Document Facture / Avis */}
      <Card className={`border-t-8 shadow-lg ${isPaid ? "border-t-green-500" : "border-t-orange-500"}`}>
         <CardContent className="p-10">
            
            {/* En-tête */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-8 mb-8">
               <div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">IMMO Connect</div>
                  <p className="text-lg text-slate-500 font-medium">
                     {isPaid ? "Quittance de Loyer" : "Avis d'Échéance"}
                  </p>
               </div>
               <div className="text-right">
                  <Badge variant={isPaid ? "success" : "warning"} className="px-3 py-1 text-sm">
                     {isPaid ? <><CheckCircle2 size={14} className="mr-1"/> PAYÉ</> : <><AlertCircle size={14} className="mr-1"/> À RÉGLER</>}
                  </Badge>
                  <p className="text-xs text-slate-400 mt-2">Réf: {payment.id}</p>
               </div>
            </div>

            {/* Corps */}
            <div className="grid grid-cols-2 gap-12 mb-8">
               <div>
                  <p className="text-xs text-slate-400 uppercase font-bold mb-1">Locataire</p>
                  <p className="font-bold text-slate-900 text-lg flex items-center gap-2"><User size={16} className="text-blue-500"/> {payment.tenant}</p>
                  <p className="text-sm text-slate-500 flex items-center gap-2 mt-1"><Building2 size={16} className="text-orange-500"/> {payment.property}</p>
               </div>
               <div className="text-right">
                  <p className="text-xs text-slate-400 uppercase font-bold mb-1">Période</p>
                  <p className="font-medium text-slate-900">Novembre 2025</p>
                  <p className="text-sm text-slate-500">Échéance : 05/11/2025</p>
               </div>
            </div>

            {/* Sommes */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
               <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-600">Loyer nu</span>
                  <span className="font-medium text-slate-900">{formatCurrency(400000)}</span>
               </div>
               <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-600">Provisions sur charges</span>
                  <span className="font-medium text-slate-900">{formatCurrency(50000)}</span>
               </div>
               <div className="border-t border-slate-200 my-4"></div>
               <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-slate-900">Total</span>
                  <span className="text-2xl font-extrabold text-blue-600">{formatCurrency(450000)}</span>
               </div>
            </div>

            {/* FOOTER : ACTIONS DE GESTION (CORRIGÉ) */}
            {!isPaid && (
               <div className="mt-8 p-4 bg-orange-50 border border-orange-100 rounded-xl">
                  <p className="text-sm text-orange-800 font-medium mb-3 text-center">Ce loyer est en attente. Actions disponibles :</p>
                  <div className="flex justify-center gap-3">
                      <a href={getWhatsAppLink()} target="_blank">
                         <Button className="bg-green-600 hover:bg-green-700 text-white">
                            <MessageCircle size={18} className="mr-2"/> Relancer (WhatsApp)
                         </Button>
                      </a>
                      <Button variant="outline" className="bg-white" onClick={handleRelance}>
                         <Send size={18} className="mr-2"/> Relancer (Email/SMS)
                      </Button>
                  </div>
               </div>
            )}

         </CardContent>
      </Card>
    </div>
  );
}