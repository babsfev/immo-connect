"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { MoreHorizontal, AlertCircle, CheckCircle2, Download, FileText } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { PaymentModal } from "./PaymentModal";
import Link from "next/link";

// Type enrichi avec nos calculs backend
type PaymentRow = {
  id: string;
  tenant: { firstName: string; lastName: string };
  lease: { property: { title: string; address: string } };
  amount: number;        // Dû
  receivedAmount: number; // Perçu
  remainingAmount: number; // Reste
  dueDate: string; // ISO String
  status: string;
  displayStatus: string; // Statut calculé (LATE...)
};

export function PaymentsTable({ data }: { data: PaymentRow[] }) {
  const [selectedPayment, setSelectedPayment] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (payment: PaymentRow) => {
    // On prépare les données pour la modale avec le "Reste à payer" par défaut
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
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs border-b border-slate-100">
              <tr>
                  <th className="px-6 py-3">Locataire</th>
                  <th className="px-6 py-3 hidden sm:table-cell">Bien</th>
                  <th className="px-6 py-3">Échéance</th>
                  <th className="px-6 py-3 text-right">Dû</th>
                  <th className="px-6 py-3 text-right">Perçu</th>
                  <th className="px-6 py-3 text-center">Statut</th>
                  <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((payment) => {
                  let variant: "success" | "warning" | "danger" | "default" = "default";
                  let label = payment.status;

                  if (payment.status === "PAID") { variant = "success"; label = "Payé"; }
                  else if (payment.status === "PARTIAL") { variant = "warning"; label = "Partiel"; }
                  else if (payment.displayStatus === "LATE") { variant = "danger"; label = "Retard"; }
                  else { variant = "default"; label = "En attente"; }

                  return (
                    <tr key={payment.id} className="hover:bg-blue-50/20 transition-colors group">
                        <td className="px-6 py-4 font-medium text-slate-900">
                          {payment.tenant.firstName} {payment.tenant.lastName}
                        </td>
                        <td className="px-6 py-4 text-slate-600 hidden sm:table-cell">
                          {payment.lease.property.title}
                        </td>
                        <td className="px-6 py-4 text-slate-500">
                          {new Date(payment.dueDate).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-slate-900">
                          {formatCurrency(payment.amount)}
                        </td>
                        <td className="px-6 py-4 text-right font-mono">
                           {payment.receivedAmount > 0 ? (
                              <span className="text-green-600 font-bold block">
                                 {formatCurrency(payment.receivedAmount)}
                              </span>
                           ) : (
                              <span className="text-slate-300 block">-</span>
                           )}
                           
                           {payment.remainingAmount > 0 && payment.receivedAmount > 0 && (
                              <div className="text-[10px] text-red-500 font-medium flex items-center justify-end gap-1 mt-1">
                                 <AlertCircle size={10} />
                                 Reste: {formatCurrency(payment.remainingAmount)}
                              </div>
                           )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Badge variant={variant}>{label}</Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {payment.status !== "PAID" ? (
                              <Button 
                                size="sm" 
                                onClick={() => handleOpenModal(payment)}
                                className="bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 shadow-sm h-8 px-3 text-xs"
                              >
                                Encaisser
                              </Button>
                          ) : (
                             <div className="flex justify-end gap-2">
                                <Link href={`/api/documents/${payment.id}`} target="_blank">
                                   <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600" title="Télécharger Quittance">
                                      <Download size={16}/>
                                   </Button>
                                </Link>
                             </div>
                          )}
                        </td>
                    </tr>
                  );
              })}
            </tbody>
        </table>
      </div>

      {/* La Modale Connectée */}
      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        payment={selectedPayment}
      />
    </>
  );
}