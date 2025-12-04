"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import Input from "@/components/ui/form/Input";
import Button from "@/components/ui/Button";
import { Phone, Loader2 } from "lucide-react";
import { updateUserPhone } from "@/app/actions/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function PhoneModal({ isOpen }: { isOpen: boolean }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    const result = await updateUserPhone(formData);

    // CORRECTION ICI : On vérifie explicitement !result.ok
    if (!result.ok) {
      // Maintenant TypeScript sait que 'error' existe car on est dans le cas 'false'
      toast.error(result.error);
      setIsLoading(false);
    } else {
      toast.success("Profil complété !", {
        description: "Merci, vous pouvez accéder à votre espace.",
      });
      router.refresh();
    }
  }

  // On force isOpen à true et on empêche la fermeture (pas de onClose)
  return (
    <Modal isOpen={isOpen} onClose={() => {}} title="Dernière étape">
      <div className="space-y-4">
        <div className="bg-blue-50 text-blue-700 p-3 rounded-lg text-sm border border-blue-100">
          Pour sécuriser votre compte et activer les paiements, nous avons
          besoin de votre numéro de mobile.
        </div>

        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700">
              Numéro de téléphone
            </label>
            <div className="relative">
              <Phone
                className="absolute left-3 top-3 text-slate-400"
                size={18}
              />
              <Input
                name="phone"
                type="tel"
                placeholder="77 000 00 00"
                className="pl-10"
                required
                autoFocus
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-slate-900 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin mr-2" />
            ) : (
              "Valider et Entrer"
            )}
          </Button>
        </form>
      </div>
    </Modal>
  );
}
