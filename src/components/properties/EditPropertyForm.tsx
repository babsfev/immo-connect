"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, MapPin, Building, Home, Warehouse, Store } from "lucide-react";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/form/Input";
import { Select } from "@/components/ui/form/Select"; // Nouveau Select
import { useAction } from "@/hooks/use-action";
import { updateProperty } from "@/app/actions/properties";
import { toast } from "sonner";
import { Property } from "@prisma/client";

interface EditPropertyFormProps {
  property: Property;
}

export default function EditPropertyForm({ property }: EditPropertyFormProps) {
  const router = useRouter();

  const { execute, isPending } = useAction(updateProperty, {
    onSuccess: () => {
      toast.success("Modifications enregistrées !");
      router.push(`/properties/${property.id}`);
      router.refresh();
    },
  });

  const handleSubmit = (formData: FormData) => {
    formData.append("id", property.id);
    execute(formData);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-0">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/properties/${property.id}`}
          className="text-slate-500 hover:text-slate-800 text-sm flex items-center gap-1 mb-2 transition-colors font-medium"
        >
          <ArrowLeft size={16} /> Annuler
        </Link>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Modifier le bien
        </h1>
        <p className="text-slate-500 mt-1">
          Mise à jour des informations pour <span className="font-semibold text-slate-700">{property.title}</span>.
        </p>
      </div>

      <form
        action={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6"
      >
        {/* Section 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Input label="Nom du bien" name="title" defaultValue={property.title} required />
          </div>

          <Select
            label="Type de bien"
            name="type"
            defaultValue={property.type}
            options={[
                { value: "APARTMENT", label: "Appartement", icon: Building },
                { value: "HOUSE", label: "Maison / Villa", icon: Home },
                { value: "STUDIO", label: "Studio" },
                { value: "OFFICE", label: "Bureau" },
                { value: "RETAIL", label: "Commerce", icon: Store },
                { value: "WAREHOUSE", label: "Entrepôt", icon: Warehouse },
            ]}
          />

          <Input
            label="Loyer (FCFA)"
            name="price"
            type="number"
            defaultValue={property.price}
            required
            // rightIcon={<span className="text-xs font-bold text-slate-400">FCFA</span>} // Si Input le supporte, sinon CurrencyInput
          />
        </div>

        {/* Section 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Input
                label="Adresse"
                name="address"
                defaultValue={property.address}
                icon={<MapPin size={18} />}
                required
            />
          </div>
          <Input label="Ville" name="city" defaultValue={property.city} required />
        </div>

        {/* Section 3 */}
        <div className="grid grid-cols-2 gap-6">
          <Input label="Surface (m²)" name="surface" type="number" defaultValue={property.surface || ""} />
          <Input label="Pièces" name="rooms" type="number" defaultValue={property.rooms || ""} />
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={() => router.back()}>
            Annuler
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg min-w-40"
            isLoading={isPending}
          >
            <Save size={18} className="mr-2" /> Enregistrer
          </Button>
        </div>
      </form>
    </div>
  );
}