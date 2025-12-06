"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { AlertCircle, CheckCircle2, Download, Clock, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { PaymentModal } from "./PaymentModal";
import Link from "next/link";
import { Card } from "@/components/ui/Card";

// Type enrichi
type PaymentRow = {
  id: string;
  tenant: { firstName: string; lastName: string };
  lease: { property: { title: string; address: string } };
  amount: number;        
  receivedAmount: number; 
  remainingAmount: number; 
  dueDate: string; 
  status: string;
  displayStatus: string; 
};

export function PaymentsTable({ data }: { data: PaymentRow[] }) {
  const [selectedPayment, setSelectedPayment] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (payment: PaymentRow) => {
    setSelectedPayment({
      id: payment.id,
      amount: payment.remainingAmount, 
      totalDue: payment.amount,
      tenantName: `${payment.tenant.firstName} ${payment.tenant.lastName}`,
      propertyName: payment.lease.property.title
    });
    setIsModalOpen(true);
  };

  return (
    <>
      {/* VERSION DESKTOP (Tableau) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-slate-50/50 text-slate-500 font-bold uppercase text-xs border-b border-slate-100">
              <tr>
                  <th className="px-6 py-4 font-semibold">Locataire / Bien</th>
                  <th className="px-6 py-4 font-semibold">Échéance</th>
                  <th className="px-6 py-4 text-right font-semibold">Montant Dû</th>
                  <th className="px-6 py-4 text-right font-semibold">Reçu</th>
                  <th className="px-6 py-4 text-center font-semibold">Statut</th>
                  <th className="px-6 py-4 text-right font-semibold w-32">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((payment) => {
                  const isPaid = payment.status === "PAID";
                  const isLate = payment.displayStatus === "LATE";
                  
                  return (
                    <tr key={payment.id} className="hover:bg-slate-50/80 transition-colors group">
                        {/* Locataire */}
                        <td className="px-6 py-4">
                           <div className="font-bold text-slate-900">{payment.tenant.firstName} {payment.tenant.lastName}</div>
                           <div className="text-xs text-slate-500 mt-0.5 truncate max-w-[180px]">{payment.lease.property.title}</div>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4 text-slate-500">
                          <div className="flex items-center gap-2">
                             <Clock size={14} className={isLate && !isPaid ? "text-red-400" : "text-slate-300"} />
                             <span className={isLate && !isPaid ? "text-red-600 font-medium" : ""}>
                                {new Date(payment.dueDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                             </span>
                          </div>
                        </td>

                        {/* Dû */}
                        <td className="px-6 py-4 text-right font-mono font-medium text-slate-700">
                          {formatCurrency(payment.amount)}
                        </td>

                        {/* Perçu */}
                        <td className="px-6 py-4 text-right">
                           {payment.receivedAmount > 0 ? (
                              <span className="text-emerald-600 font-bold font-mono block">
                                 {formatCurrency(payment.receivedAmount)}
                              </span>
                           ) : (
                              <span className="text-slate-300 block">-</span>
                           )}
                           
                           {payment.remainingAmount > 0 && payment.receivedAmount > 0 && (
                              <span className="inline-flex items-center gap-1 text-[10px] text-red-500 font-medium bg-red-50 px-1.5 py-0.5 rounded-full mt-1">
                                 Reste: {formatCurrency(payment.remainingAmount)}
                              </span>
                           )}
                        </td>

                        {/* Statut */}
                        <td className="px-6 py-4 text-center">
                          <Badge 
                             variant={isPaid ? "success" : payment.status === "PARTIAL" ? "warning" : isLate ? "danger" : "default"}
                             className="shadow-sm"
                          >
                             {payment.status === "PAID" ? "Payé" : payment.status === "PARTIAL" ? "Partiel" : isLate ? "Retard" : "En attente"}
                          </Badge>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right">
                          {!isPaid ? (
                              <Button 
                                size="sm" 
                                onClick={() => handleOpenModal(payment)}
                                className="bg-slate-900 text-white hover:bg-blue-600 shadow-md h-9 px-4 text-xs font-semibold transition-all hover:-translate-y-0.5"
                              >
                                Encaisser
                              </Button>
                          ) : (
                             <Link href={`/api/documents/${payment.id}`} target="_blank">
                                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 h-9 w-9 p-0 rounded-full">
                                   <Download size={18}/>
                                </Button>
                             </Link>
                          )}
                        </td>
                    </tr>
                  );
              })}
            </tbody>
        </table>
      </div>

      {/* VERSION MOBILE (Cartes) */}
      <div className="md:hidden space-y-3">
         {data.map((payment) => {
            const isPaid = payment.status === "PAID";
            const isLate = payment.displayStatus === "LATE";

            return (
               <Card key={payment.id} className="p-4 border border-slate-200 shadow-sm active:scale-[0.98] transition-transform">
                  <div className="flex justify-between items-start mb-3">
                     <div>
                        <h4 className="font-bold text-slate-900">{payment.tenant.firstName} {payment.tenant.lastName}</h4>
                        <p className="text-xs text-slate-500 truncate max-w-[200px]">{payment.lease.property.title}</p>
                     </div>
                     <Badge 
                        variant={isPaid ? "success" : isLate ? "danger" : "warning"}
                        size="sm"
                        className="px-2"
                     >
                        {isPaid ? "Payé" : isLate ? "Retard" : "En attente"}
                     </Badge>
                  </div>

                  <div className="flex justify-between items-end border-t border-slate-50 pt-3 mt-2">
                     <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Montant Dû</p>
                        <p className="font-mono text-lg font-bold text-slate-800">{formatCurrency(payment.amount)}</p>
                        {payment.receivedAmount > 0 && !isPaid && (
                           <p className="text-xs text-green-600 font-medium mt-1">Reçu: {formatCurrency(payment.receivedAmount)}</p>
                        )}
                     </div>

                     {!isPaid ? (
                        <Button 
                           size="sm" 
                           onClick={() => handleOpenModal(payment)}
                           className="bg-slate-900 text-white shadow-lg text-xs h-8"
                        >
                           Encaisser <ArrowRight size={14} className="ml-1"/>
                        </Button>
                     ) : (
                        <Link href={`/api/documents/${payment.id}`} target="_blank">
                           <Button variant="outline" size="sm" className="h-8 text-xs border-slate-200 text-slate-600">
                              <Download size={14} className="mr-1"/> Reçu
                           </Button>
                        </Link>
                     )}
                  </div>
               </Card>
            );
         })}
      </div>

      {/* Modale */}
      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        payment={selectedPayment}
      />
    </>
  );
}