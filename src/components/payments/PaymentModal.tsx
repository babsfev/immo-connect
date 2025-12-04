"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { Input, CurrencyInput, Label, ImageUpload } from "@/components/ui/form";
import { Select } from "@/components/ui/form/Select";
import { useAction } from "@/hooks/use-action";
import { capturePayment } from "@/app/actions/payments";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: {
    id: string;
    amount: number; // Montant restant à payer (pré-rempli)
    totalDue: number;
    tenantName: string;
    propertyName: string;
  } | null;
}

export function PaymentModal({ isOpen, onClose, payment }: PaymentModalProps) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [proofUrl, setProofUrl] = useState<string | null>(null);
  
  const { execute, isPending } = useAction(capturePayment, {
    onSuccess: () => {
      toast.success("Encaissement validé !");
      onClose();
      setProofUrl(null);
    }
  });

  const handleSubmit = (formData: FormData) => {
    if (!payment) return;
    formData.append("paymentId", payment.id);
    if (proofUrl) formData.append("proofUrl", proofUrl);
    execute(formData);
  };

  if (!payment) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Encaisser un loyer">
       <div className="space-y-6 max-h-[80vh] overflow-y-auto px-1">
          
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex justify-between items-center">
             <div>
                <p className="text-xs font-bold text-blue-600 uppercase">Locataire</p>
                <p className="font-bold text-slate-900">{payment.tenantName}</p>
                <p className="text-xs text-slate-500">{payment.propertyName}</p>
             </div>
             <div className="text-right">
                <p className="text-2xl font-bold text-blue-700">{payment.amount.toLocaleString()} F</p>
                <p className="text-xs text-blue-500">Reste à payer</p>
             </div>
          </div>

          <form action={handleSubmit} className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
                <div>
                   <Label required>Date paiement</Label>
                   <Input name="date" type="date" defaultValue={date} required />
                </div>
                <div>
                   <Label required>Mode</Label>
                   <Select 
                      name="method" 
                      options={[
                         { label: "Wave Mobile Money", value: "WAVE" },
                         { label: "Orange Money", value: "OM" },
                         { label: "Espèces", value: "ESPECES" },
                         { label: "Virement", value: "VIREMENT" },
                         { label: "Chèque", value: "CHEQUE" },
                      ]}
                      defaultValue="WAVE"
                   />
                </div>
             </div>

             <div>
                <Label required>Montant perçu</Label>
                <CurrencyInput name="amount" defaultValue={payment.amount} />
                <p className="text-xs text-slate-400 mt-1">Si inférieur au reste, le statut sera "Partiel".</p>
             </div>

             <div>
                <Label>Preuve (Reçu / Chèque)</Label>
                <div className="mt-2">
                   <ImageUpload 
                      currentImage={proofUrl || undefined} 
                      onUploadComplete={setProofUrl} 
                   />
                </div>
             </div>

             <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={onClose}>Annuler</Button>
                <Button type="submit" disabled={isPending} className="bg-green-600 hover:bg-green-700 text-white shadow-lg">
                   {isPending ? <Loader2 className="animate-spin mr-2"/> : <CheckCircle2 size={18} className="mr-2"/>}
                   Valider
                </Button>
             </div>
          </form>
       </div>
    </Modal>
  );
}