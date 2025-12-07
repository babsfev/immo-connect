"use client";

import React, { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, Grid, MapPin, Building, Home, Warehouse, Store } from "lucide-react";
import Button from "@/components/ui/Button";
import { Input, CurrencyInput, ImageUpload, Label } from "@/components/ui/form";
import { Select } from "@/components/ui/form/Select";
import { useAction } from "@/hooks/use-action";
import { createProperty } from "@/app/actions/properties";
import { toast } from "sonner";

function NewPropertyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const parentId = searchParams.get("parentId");
  const parentName = searchParams.get("parentName");

  const [imageFile, setImageFile] = useState<File | null>(null);

  const { execute, isPending, result } = useAction(createProperty, {
    onSuccess: () => {
      if (parentId) {
         toast.success("Lot ajouté avec succès !");
         router.push(`/properties/${parentId}`);
      } else {
         toast.success("Bien créé avec succès !");
         router.push("/properties");
      }
      router.refresh();
    }
  });

  const handleSubmit = (formData: FormData) => {
    if (parentId) formData.append("parentId", parentId);
    execute(formData);
  };

  const getError = (field: string) => {
    if (result && !result.ok && result.details) {
       return result.details[field]?.[0];
    }
    return undefined;
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-0 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="mb-8">
         <Link 
            href={parentId ? `/properties/${parentId}` : "/properties"} 
            className="text-slate-500 hover:text-slate-800 text-sm flex items-center gap-1 mb-2 transition-colors"
         >
            <ArrowLeft size={16}/> {parentId ? `Retour à ${parentName}` : "Retour à la liste"}
         </Link>
         
         <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            {parentId ? `Ajouter un lot` : "Nouveau Bien"}
         </h1>
         <p className="text-slate-500 mt-1">
            {parentId 
              ? `Configuration de l'unité pour "${parentName}"` 
              : "Créez un bien individuel ou un immeuble entier."
            }
         </p>
      </div>

      <form action={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-8">
         
         {parentId && (
            <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm flex items-start gap-3 border border-blue-100">
               <Grid size={18} className="mt-0.5 shrink-0"/>
               <div>
                  <p className="font-bold">Mode Multi-Lots activé</p>
                  <p className="opacity-90">Ce bien sera automatiquement rattaché à <strong>{parentName}</strong>.</p>
               </div>
            </div>
         )}

         {/* 1. PHOTO DE COUVERTURE */}
         <div>
            {/* Le label est géré à l'intérieur de ImageUpload maintenant */}
            <div className="mt-2">
                <ImageUpload 
                    name="coverImage"
                    // 👇 CORRECTION : Typer explicitement 'file'
                    onChange={(file: File | null) => setImageFile(file)} 
                    label="Photo de couverture"
                />
            </div>
         </div>

         {/* 2. INFORMATIONS PRINCIPALES */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="md:col-span-2">
                 <Label htmlFor="title" required>Nom du bien</Label>
                 <Input 
                    id="title" 
                    name="title" 
                    placeholder={parentId ? "Ex: Appartement 1A" : "Ex: Résidence les Almadies"} 
                    error={getError("title")}
                 />
             </div>
             
             <div>
                 <Label required>Type de bien</Label>
                 <Select 
                    name="type"
                    placeholder="Choisir..."
                    error={getError("type")}
                    options={[
                        { value: "APARTMENT", label: "Appartement", icon: Building },
                        { value: "HOUSE", label: "Maison / Villa", icon: Home },
                        { value: "STUDIO", label: "Studio" },
                        { value: "ROOM", label: "Chambre simple" },
                        { value: "RETAIL", label: "Commerce", icon: Store },
                        { value: "OFFICE", label: "Bureau" },
                        { value: "WAREHOUSE", label: "Entrepôt", icon: Warehouse },
                        ...(!parentId ? [{ value: "BUILDING", label: "Immeuble entier", icon: Grid }] : [])
                    ]}
                 />
             </div>
             
             <div>
                 <Label required>Loyer Mensuel</Label>
                 {/* 👇 CORRECTION : 'error' est maintenant accepté */}
                 <CurrencyInput 
                    id="price" 
                    name="price" 
                    placeholder="0" 
                    error={getError("price")}
                 />
             </div>
         </div>

         {/* 3. LOCALISATION */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
             <div className="md:col-span-2">
                 <Label htmlFor="address" required>Adresse complète</Label>
                 <Input 
                    id="address" 
                    name="address" 
                    placeholder="Quartier, Rue..." 
                    icon={<MapPin size={18} />}
                    error={getError("address")}
                 />
             </div>
             <div>
                 <Label htmlFor="city" required>Ville</Label>
                 <Input 
                    id="city" 
                    name="city" 
                    placeholder="Dakar" 
                    error={getError("city")}
                 />
             </div>
         </div>

         {/* 4. DÉTAILS */}
         <div className="grid grid-cols-2 gap-6 pt-2">
             <div>
                 <Label htmlFor="surface">Surface (m²)</Label>
                 <Input id="surface" name="surface" type="number" placeholder="Ex: 120" />
             </div>
             <div>
                 <Label htmlFor="rooms">Pièces</Label>
                 <Input id="rooms" name="rooms" type="number" placeholder="Ex: 4" />
             </div>
         </div>

         {/* FOOTER */}
         <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
             <Button type="button" variant="ghost" onClick={() => router.back()}>Annuler</Button>
             {/* 👇 CORRECTION : min-w-[160px] -> min-w-40 (Tailwind standard) */}
             <Button type="submit" className="bg-slate-900 text-white min-w-40" disabled={isPending} isLoading={isPending}>
                {parentId ? "Ajouter le lot" : "Créer le bien"}
             </Button>
         </div>

         {/* Erreur Globale */}
         {result && !result.ok && !result.details && (
            <div className="text-red-600 text-sm bg-red-50 p-4 rounded-xl border border-red-100 text-center animate-in fade-in">
               ⚠️ {result.error}
            </div>
         )}

      </form>
    </div>
  );
}

export default function NewPropertyPage() {
   return (
      <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="animate-spin text-slate-400" size={32}/></div>}>
         <NewPropertyForm />
      </Suspense>
   );
}