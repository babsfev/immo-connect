"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { toast } from "sonner";
import Button from "../Button";

// 👇 CORRECTION : Ajout de 'name' et 'label' (optionnels mais utiles)
interface ImageUploadProps {
  onUploadComplete?: (url: string) => void;
  // onChange pour récupérer le fichier brut (si pas d'upload auto)
  onChange?: (file: File | null) => void; 
  currentImage?: string;
  name?: string;  // <--- AJOUT
  label?: string; // <--- AJOUT
  error?: string; // <--- AJOUT pour afficher l'erreur
}

export function ImageUpload({ onUploadComplete, onChange, currentImage, name, label, error }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Prévisualisation immédiate
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // 2. Propagation au parent (Fichier brut)
    if (onChange) onChange(file);

    // 3. Upload Auto (si onUploadComplete est fourni)
    if (onUploadComplete) {
      try {
        setUploading(true);
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        const supabase = createClient();
        const { error: uploadError } = await supabase.storage
          .from('properties')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('properties').getPublicUrl(filePath);
        onUploadComplete(data.publicUrl);
        toast.success("Image téléchargée !");
      } catch (err: any) {
        toast.error("Erreur upload", { description: err.message });
      } finally {
        setUploading(false);
      }
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
    if (onChange) onChange(null);
    if (onUploadComplete) onUploadComplete("");
  };

  return (
    <div className="space-y-2 w-full">
      {label && <label className="text-sm font-medium text-slate-700 block uppercase tracking-wider">{label}</label>}
      
      {/* Input caché pour le formulaire HTML standard */}
      {name && <input type="hidden" name={name} value={preview || ""} />}

      {preview ? (
        <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-slate-200 group">
           <img src={preview} alt="Aperçu" className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button 
                type="button"
                variant="danger" 
                size="sm"
                onClick={handleRemove}
                className="bg-white text-red-600 hover:bg-red-50"
              >
                 <X size={16} className="mr-2"/> Supprimer
              </Button>
           </div>
        </div>
      ) : (
        <div className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center hover:bg-slate-50 transition-colors relative cursor-pointer ${error ? "border-red-300 bg-red-50/10" : "border-slate-300"}`}>
           <input 
              ref={inputRef}
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              disabled={uploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
           />
           
           <div className="bg-blue-50 p-4 rounded-full mb-3 text-blue-600">
              {uploading ? <Loader2 size={24} className="animate-spin"/> : <UploadCloud size={24}/>}
           </div>
           
           <div className="text-center">
              <p className="text-sm font-bold text-slate-700">
                 {uploading ? "Téléchargement..." : "Cliquez pour ajouter une photo"}
              </p>
              <p className="text-xs text-slate-400 mt-1">JPG, PNG (Max 5Mo)</p>
           </div>
        </div>
      )}
      
      {error && <p className="text-[11px] text-red-600 font-medium">{error}</p>}
    </div>
  );
}