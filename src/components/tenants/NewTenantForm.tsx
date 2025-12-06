"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Wallet, Building2, Save, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import {
  Input,
  CurrencyInput,
  Label,
  ErrorMessage,
} from "@/components/ui/form";
import { Select } from "@/components/ui/form/Select";
import { useAction } from "@/hooks/use-action";
import { createTenant } from "@/app/actions/tenants";
import { formatSenegalPhone, isActionError } from "@/lib/utils";
import { toast } from "sonner";

interface Prop {
  id: string;
  title: string;
  price: number;
  type: string;
}

export function NewTenantForm({ properties }: { properties: Prop[] }) {
  const router = useRouter();
  const [selectedPropPrice, setSelectedPropPrice] = useState<number>(0);

  const { execute, isPending, result } = useAction(createTenant, {
    onSuccess: () => {
      toast.success("Dossier locataire créé !");
      router.push("/tenants");
      router.refresh();
    },
  });

  const getError = (field: string): string | undefined => {
    if (isActionError(result) && result.details?.[field]) {
      return result.details[field][0];
    }
    return undefined;
  };

  const handleSubmit = (formData: FormData) => {
    execute(formData);
  };

  return (
    <form
      action={handleSubmit}
      className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-8"
    >
      {/* 1. SÉLECTION DU BIEN */}
      <div className="space-y-4 pb-6 border-b border-slate-100">
        <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wide flex items-center gap-2">
          <Building2 size={16} /> Le Logement
        </h3>

        {properties.length === 0 ? (
          <div className="text-center p-4 bg-orange-50 text-orange-700 rounded-lg text-sm">
            Aucun bien vacant disponible. <br />
            <a href="/properties/new" className="underline font-bold">
              Créer un bien d'abord
            </a>
            .
          </div>
        ) : (
          <div>
            <Label required>Bien à louer</Label>
            <Select
              name="propertyId"
              placeholder="Choisir un bien vacant..."
              options={properties.map((p) => ({
                value: p.id,
                label: `${p.title} (${p.price.toLocaleString()} FCFA)`,
              }))}
              searchable
              onChange={(val) => {
                const prop = properties.find((p) => p.id === val);
                if (prop) setSelectedPropPrice(prop.price);
              }}
              error={getError("propertyId")}
            />
          </div>
        )}
      </div>

      {/* 2. LE LOCATAIRE */}
      <div className="space-y-4 pb-6 border-b border-slate-100">
        <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wide flex items-center gap-2">
          <User size={16} /> Le Locataire
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label required>Prénom</Label>
            {/* 👇 CORRECTION : error au lieu de errorMessage */}
            <Input
              name="firstName"
              placeholder="Moussa"
              error={getError("firstName")}
            />
          </div>
          <div>
            <Label required>Nom</Label>
            <Input
              name="lastName"
              placeholder="Diop"
              error={getError("lastName")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label required>Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="client@gmail.com"
              error={getError("email")}
            />
          </div>
          <div>
            <Label required>Téléphone</Label>
            <Input
              name="phone"
              placeholder="77 000 00 00"
              onChange={(e) =>
                (e.target.value = formatSenegalPhone(e.target.value))
              }
              error={getError("phone")}
            />
          </div>
        </div>
      </div>

      {/* 3. LE BAIL & PAIEMENT */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wide flex items-center gap-2">
          <Wallet size={16} /> Conditions Financières
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label required>Date d'entrée</Label>
            <Input
              name="startDate"
              type="date"
              error={getError("startDate")}
            />
          </div>
          <div>
            <Label>Caution (Optionnel)</Label>
            <CurrencyInput name="deposit" placeholder="0" />
          </div>
        </div>

        <div>
          <Label required>Loyer Mensuel</Label>
          <CurrencyInput
            name="rentAmount"
            value={selectedPropPrice}
            onValueChange={setSelectedPropPrice}
          />
          <p className="text-xs text-slate-400 mt-1">
            Le premier paiement sera généré automatiquement avec ce montant.
          </p>
          {getError("rentAmount") && (
            <ErrorMessage error={getError("rentAmount")} />
          )}
        </div>
      </div>

      <div className="pt-4 flex justify-end gap-3">
        <Button type="button" variant="ghost" onClick={() => router.back()}>
          Annuler
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="bg-slate-900 text-white hover:bg-slate-800 shadow-lg min-w-[180px]"
        >
          {isPending ? (
            <Loader2 className="animate-spin mr-2" />
          ) : (
            <Save size={18} className="mr-2" />
          )}
          Signer le bail
        </Button>
      </div>
    </form>
  );
}