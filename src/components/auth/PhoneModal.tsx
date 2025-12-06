"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/form/Input";
import Button from "@/components/ui/Button";
import { Phone, Lock, Shield } from "lucide-react";
import { useAction } from "@/hooks/use-action";
import { updateUserPhone } from "@/app/actions/user";
import { toast } from "sonner";
import { formatSenegalPhone } from "@/lib/utils";

export function PhoneModal({ isOpen }: { isOpen: boolean }) {
  // On ne peut pas fermer cette modale tant que ce n'est pas fait !
  const [phone, setPhone] = useState("");

  const { execute, isPending } = useAction(updateUserPhone, {
    onSuccess: () => {
      toast.success("Profil mis à jour !");
      // Le parent (Layout) gérera la fermeture via le re-render des données utilisateur
    },
    onError: (err) => toast.error(err)
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    execute({ phone });
  };

  return (
    <Modal isOpen={isOpen} onClose={() => {}} className="max-w-md">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <Smartphone size={32} />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Sécurisez votre compte</h2>
        <p className="text-sm text-slate-500 mt-2">
          Pour des raisons de sécurité et pour recevoir vos notifications de paiement, nous avons besoin d'un numéro valide.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex gap-3 text-left">
           <Shield size={20} className="text-green-600 shrink-0 mt-0.5" />
           <p className="text-xs text-slate-600">
             Votre numéro ne sera jamais partagé publiquement. Il sert uniquement à la validation des transactions Wave/OM.
           </p>
        </div>

        <div>
          <Input
            name="phone"
            placeholder="77 000 00 00"
            value={phone}
            onChange={(e) => setPhone(formatSenegalPhone(e.target.value))}
            icon={<Phone size={18} />}
            required
            autoFocus
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
          isLoading={isPending}
        >
          Confirmer mon numéro
        </Button>
      </form>
    </Modal>
  );
}

// Petit helper icône manquant
import { Smartphone } from "lucide-react";