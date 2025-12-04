"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/form/Input";
import { useAction } from "@/hooks/use-action";
import { updateProperty } from "@/app/actions/properties";
import { toast } from "sonner";
import { Property } from "@prisma/client"; // Import du type Prisma

interface EditPropertyFormProps {
  property: Property; // On reçoit les données réelles
}

export default function EditPropertyForm({ property }: EditPropertyFormProps) {
  const router = useRouter();

  // Le Hook gère la soumission
  const { execute, isPending } = useAction(updateProperty, {
    onSuccess: () => {
      toast.success("Modifications enregistrées !");
      router.push(`/properties/${property.id}`); // Retour à la fiche
      router.refresh(); // Rafraîchit les données affichées
    },
  });

  const handleSubmit = (formData: FormData) => {
    // On ajoute l'ID manquant dans le FormData car il n'est pas dans un input visible
    formData.append("id", property.id);
    execute(formData);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-6">
        <Link
          href={`/properties/${property.id}`}
          className="text-slate-500 hover:text-slate-800 text-sm flex items-center gap-1 mb-2"
        >
          <ArrowLeft size={16} /> Annuler et retour
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">
          Modifier : {property.title}
        </h1>
        <p className="text-slate-500">
          Mettez à jour les informations du bien.
        </p>
      </div>

      <form
        action={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6"
      >
        {/* Titre & Type */}
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="text-sm font-medium text-slate-700 mb-1 block">
              Nom du bien
            </label>
            <Input name="title" defaultValue={property.title} required />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">
              Type
            </label>
            <select
              name="type"
              defaultValue={property.type} // Pré-sélection
              className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="APARTMENT">Appartement</option>
              <option value="HOUSE">Maison / Villa</option>
              <option value="STUDIO">Studio</option>
              <option value="OFFICE">Bureau</option>
              <option value="RETAIL">Commerce</option>
              <option value="WAREHOUSE">Entrepôt</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">
              Loyer (FCFA)
            </label>
            <Input
              name="price"
              type="number"
              defaultValue={property.price}
              required
            />
          </div>
        </div>

        {/* Adresse & Ville */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <label className="text-sm font-medium text-slate-700 mb-1 block">
              Adresse
            </label>
            <div className="relative">
              <MapPin
                className="absolute left-3 top-3 text-slate-400"
                size={18}
              />
              <Input
                name="address"
                defaultValue={property.address}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">
              Ville
            </label>
            <Input name="city" defaultValue={property.city} required />
          </div>
        </div>

        {/* Détails */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">
              Surface (m²)
            </label>
            <Input
              name="surface"
              type="number"
              defaultValue={property.surface || ""}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">
              Pièces
            </label>
            <Input
              name="rooms"
              type="number"
              defaultValue={property.rooms || ""}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={() => router.back()}>
            Annuler
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="animate-spin mr-2" />
            ) : (
              <Save size={18} className="mr-2" />
            )}
            {isPending ? "Sauvegarde..." : "Enregistrer les modifications"}
          </Button>
        </div>
      </form>
    </div>
  );
}
