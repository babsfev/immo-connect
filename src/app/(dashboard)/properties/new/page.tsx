"use client";

import React, { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, Grid, MapPin, Building, Home, Warehouse, Store } from "lucide-react";
import Button from "@/components/ui/Button";
// On utilise les composants du dossier 'form' pour garantir le style unifié
import { Input, CurrencyInput, ImageUpload, Label, ErrorMessage } from "@/components/ui/form";
import { Select } from "@/components/ui/form/Select";
import { useAction } from "@/hooks/use-action";
import { createProperty } from "@/app/actions/properties";
import { toast } from "sonner";

function NewPropertyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Gestion du mode "Ajout de Lot"
  const parentId = searchParams.get("parentId");
  const parentName = searchParams.get("parentName");

  // State pour l'image
  const [coverImage, setCoverImage] = useState<string | null>(null);

  // Hook d'action sécurisée
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
    if (coverImage) formData.append("coverImage", coverImage);
    execute(formData);
  };

  // Helper CORRIGÉ pour TypeScript
  const getError = (field: string) => {
    if (result && !result.ok && result.details) {
       return result.details[field]?.[0];
    }
    return null;
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-0">
      
      {/* --- HEADER --- */}
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
         
         {/* MESSAGE CONTEXTUEL */}
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
            <Label>Photo de couverture</Label>
            <div className="mt-2">
                <ImageUpload 
                    onUploadComplete={setCoverImage} 
                    currentImage={coverImage || undefined} 
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
                    placeholder={parentId ? "Ex: Appartement 1A, Boutique RDC..." : "Ex: Résidence les Almadies"} 
                    errorMessage={getError("title")}
                 />
             </div>
             
             <div>
                 <Label required>Type de bien</Label>
                 <Select 
                    name="type"
                    placeholder="Choisir le type..."
                    error={getError("type")}
                    options={[
                        { value: "APARTMENT", label: "Appartement", icon: Building },
                        { value: "HOUSE", label: "Maison / Villa", icon: Home },
                        { value: "STUDIO", label: "Studio" },
                        { value: "ROOM", label: "Chambre simple" },
                        { value: "RETAIL", label: "Commerce / Boutique", icon: Store },
                        { value: "OFFICE", label: "Bureau" },
                        { value: "WAREHOUSE", label: "Entrepôt", icon: Warehouse },
                        ...(!parentId ? [{ value: "BUILDING", label: "Immeuble entier", icon: Grid }] : [])
                    ]}
                 />
             </div>
             
             <div>
                 <Label required>Loyer Mensuel</Label>
                 <CurrencyInput 
                    id="price" 
                    name="price" 
                    placeholder="0" 
                 />
                 {getError("price") && <ErrorMessage message={getError("price")} />}
             </div>
         </div>

         {/* 3. LOCALISATION */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
             <div className="md:col-span-2">
                 <Label htmlFor="address" required>Adresse complète</Label>
                 <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-slate-400 pointer-events-none" size={18}/>
                    <Input 
                        id="address" 
                        name="address" 
                        placeholder="Quartier, Rue, Numéro..." 
                        className="pl-10" 
                        errorMessage={getError("address")}
                    />
                 </div>
             </div>
             <div>
                 <Label htmlFor="city" required>Ville</Label>
                 <Input 
                    id="city" 
                    name="city" 
                    placeholder="Dakar" 
                    errorMessage={getError("city")}
                 />
             </div>
         </div>

         {/* 4. DÉTAILS TECHNIQUES */}
         <div className="grid grid-cols-2 gap-6 pt-2">
             <div>
                 <Label htmlFor="surface">Surface (m²)</Label>
                 <Input id="surface" name="surface" type="number" placeholder="Ex: 120" />
             </div>
             <div>
                 <Label htmlFor="rooms">Nombre de pièces</Label>
                 <Input id="rooms" name="rooms" type="number" placeholder="Ex: 4" />
             </div>
         </div>

         {/* FOOTER ACTIONS */}
         <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
             <Button type="button" variant="ghost" onClick={() => router.back()}>Annuler</Button>
             <Button type="submit" className="bg-slate-900 text-white hover:bg-slate-800 shadow-lg min-w-40" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin mr-2"/> : <Save size={18} className="mr-2"/>}
                {isPending ? "Enregistrement..." : parentId ? "Ajouter le lot" : "Créer le bien"}
             </Button>
         </div>

         {/* Erreur Globale */}
         {result && !result.ok && result.error && !result.details && (
            <div className="text-red-600 text-sm bg-red-50 p-4 rounded-xl border border-red-100 text-center animate-in fade-in slide-in-from-top-2">
               ⚠️ {result.error}
            </div>
         )}

      </form>
    </div>
  );
}

// Wrapper Suspense
export default function NewPropertyPage() {
   return (
      <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="animate-spin text-blue-600" size={32}/></div>}>
         <NewPropertyForm />
      </Suspense>
   );
}