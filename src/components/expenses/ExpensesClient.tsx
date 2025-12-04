"use client";

import React, { useState } from "react";
import { Plus, TrendingUp, Receipt, FileText, Wrench, Zap, Building } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { Input, CurrencyInput, Label, ImageUpload } from "@/components/ui/form";
import { Select } from "@/components/ui/form/Select";
import { useAction } from "@/hooks/use-action";
import { createExpense } from "@/app/actions/expenses";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { EXPENSE_CATEGORY_LABELS } from "@/lib/constants";

export default function ExpensesClient({ initialData, properties }: { initialData: any, properties: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receipt, setReceipt] = useState<string | null>(null);
  
  const { execute, isPending } = useAction(createExpense, {
    onSuccess: () => {
       toast.success("Dépense ajoutée !");
       setIsModalOpen(false);
       setReceipt(null);
    }
  });

  const handleSubmit = (formData: FormData) => {
     if (receipt) formData.append("receiptUrl", receipt);
     const isRecov = formData.get("isRecoverable") === "on";
     if (!isRecov) formData.delete("isRecoverable"); 
     else formData.set("isRecoverable", "true");
     
     execute(formData);
  };

  const expenses = initialData?.expenses || [];
  const stats = initialData?.stats || { totalAmount: 0, recoverableAmount: 0 };
  const recoverableRate = stats.totalAmount > 0 ? Math.round((stats.recoverableAmount / stats.totalAmount) * 100) : 0;

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dépenses & Charges</h1>
          <p className="text-slate-500">Suivi des coûts et de la rentabilité.</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 text-white shadow-lg" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} className="mr-2" /> Nouvelle Dépense
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="md:col-span-2 bg-slate-900 text-white border-none">
            <CardContent className="p-8 flex justify-between items-center">
               <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Total Dépenses (Global)</p>
                  <h3 className="text-4xl font-bold">{formatCurrency(stats.totalAmount)}</h3>
               </div>
               <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center text-red-400">
                  <TrendingUp size={32} />
               </div>
            </CardContent>
         </Card>

         <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
               <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Charges Récupérables</p>
               <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-bold text-slate-900">{recoverableRate}%</h3>
                  <span className="text-sm text-slate-500">du total</span>
               </div>
               <p className="text-xs text-blue-600 mt-2 font-medium">
                  {formatCurrency(stats.recoverableAmount)} à refacturer aux locataires.
               </p>
            </CardContent>
         </Card>
      </div>

      {/* LISTE */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
         <div className="divide-y divide-slate-100">
            {expenses.length === 0 ? (
               <div className="p-12 text-center text-slate-400">Aucune dépense enregistrée.</div>
            ) : expenses.map((exp: any) => {
               let Icon = FileText;
               let iconBg = "bg-slate-100 text-slate-500";
               if (exp.category === "MAINTENANCE") { Icon = Wrench; iconBg = "bg-orange-100 text-orange-600"; }
               if (exp.category === "UTILITIES") { Icon = Zap; iconBg = "bg-yellow-100 text-yellow-600"; }
               if (exp.category === "TAX") { Icon = Building; iconBg = "bg-blue-100 text-blue-600"; }

               return (
                  <div key={exp.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-50 transition-colors group gap-4">
                     <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
                           <Icon size={20} />
                        </div>
                        <div>
                           <p className="font-bold text-slate-900">{exp.title}</p>
                           <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                              {exp.propertyName} • {new Date(exp.date).toLocaleDateString()}
                              {exp.receiptUrl && <span className="text-blue-600 flex items-center"><FileText size={10} className="mr-1"/> Reçu</span>}
                           </p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="font-bold text-slate-900 text-lg">- {formatCurrency(exp.amount)}</p>
                        {exp.isRecoverable ? (
                           <span className="text-[10px] text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-full">Récupérable</span>
                        ) : (
                           <span className="text-[10px] text-slate-400">Charge Proprio</span>
                        )}
                     </div>
                  </div>
               );
            })}
         </div>
      </Card>

      {/* MODALE */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Nouvelle Dépense">
         <form action={handleSubmit} className="space-y-4">
             <div><Label required>Intitulé</Label><Input name="title" placeholder="Ex: Facture Senelec" required /></div>
             
             <div className="grid grid-cols-2 gap-4">
                <div><Label required>Montant</Label><CurrencyInput name="amount" placeholder="0" /></div>
                <div><Label required>Date</Label><Input name="date" type="date" required /></div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div>
                   <Label required>Bien concerné</Label>
                   <Select 
                      name="propertyId" 
                      options={properties.map(p => ({ label: p.title, value: p.id }))}
                      placeholder="Choisir..."
                   />
                </div>
                <div>
                   <Label required>Catégorie</Label>
                   <Select 
                      name="category" 
                      options={Object.entries(EXPENSE_CATEGORY_LABELS).map(([k, v]) => ({ label: v, value: k }))}
                      placeholder="Choisir..."
                   />
                </div>
             </div>

             <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <input type="checkbox" name="isRecoverable" id="recov" className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                <label htmlFor="recov" className="text-sm text-slate-700 cursor-pointer select-none flex-1">
                   Cette dépense est <span className="font-bold text-blue-600">récupérable</span> (Locataire)
                </label>
             </div>

             <div>
                <Label>Preuve (Photo/PDF)</Label>
                <div className="mt-1"><ImageUpload onUploadComplete={setReceipt} /></div>
             </div>

             <div className="pt-4 flex justify-end gap-2 border-t border-slate-100 mt-4">
                <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Annuler</Button>
                <Button type="submit" disabled={isPending} className="bg-slate-900 text-white">Sauvegarder</Button>
             </div>
         </form>
      </Modal>
    </div>
  );
}