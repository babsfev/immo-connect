import React from "react";
import { Wallet, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";
import { getPaymentsData } from "@/app/data/payments"; // Vrai Loader
import { PaymentsTable } from "@/components/payments/PaymentsTable"; // (Assurez-vous d'avoir créé ce composant client !)

export default async function PaymentsPage() {
  const data = await getPaymentsData();
  const payments = data?.payments || [];
  const stats = data?.stats || { totalCollected: 0, totalPending: 0 };

  return (
    <div className="space-y-8 pb-10">
      <h1 className="text-2xl font-bold text-slate-900">Pilotage Financier</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="flex items-center gap-4 p-4 border-l-4 border-l-green-500 shadow-sm">
           <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600"><Wallet size={24} /></div>
           <div><p className="text-sm text-slate-500">Total Encaissé</p><p className="text-2xl font-bold text-slate-900">{formatCurrency(stats.totalCollected)}</p></div>
        </Card>
        <Card className="flex items-center gap-4 p-4 border-l-4 border-l-orange-500 shadow-sm">
           <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600"><ArrowUpRight size={24} /></div>
           <div><p className="text-sm text-slate-500">En attente</p><p className="text-2xl font-bold text-slate-900">{formatCurrency(stats.totalPending)}</p></div>
        </Card>
      </div>

      <Card className="overflow-hidden border-slate-200 shadow-sm">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50"><h3 className="font-bold text-slate-800">Transactions</h3></div>
        {payments.length === 0 ? (
           <div className="p-12 text-center text-slate-400">Aucun paiement enregistré.</div>
        ) : (
           <PaymentsTable data={payments} />
        )}
      </Card>
    </div>
  );
}