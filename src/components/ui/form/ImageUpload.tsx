"use client";

import React, { useState } from "react";
import { UploadCloud, X, Loader2, Image as ImageIcon } from "lucide-react";
import { createClient } from "@/lib/supabase"; // Notre client navigateur
import { toast } from "sonner";
import Button from "../Button";

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
  currentImage?: string;
}

export function ImageUpload({ onUploadComplete, currentImage }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      // 1. Création d'un nom unique (timestamp + nom nettoyé)
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      // 2. Upload vers Supabase Storage
      const supabase = createClient();
      const { error: uploadError } = await supabase.storage
        .from('properties') // Le nom de votre bucket
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // 3. Récupération de l'URL publique
      const { data } = supabase.storage
        .from('properties')
        .getPublicUrl(filePath);

      // 4. Succès
      setPreview(data.publicUrl);
      onUploadComplete(data.publicUrl); // On remonte l'URL au formulaire parent
      toast.success("Image téléchargée !");

    } catch (error: any) {
      toast.error("Erreur upload", { description: error.message });
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onUploadComplete(""); // On vide l'URL
  };

  return (
    <div className="space-y-4 w-full">
      <label className="text-sm font-medium text-slate-700 block">Photo principale</label>
      
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
                 <X size={16} className="mr-2"/> Supprimer la photo
              </Button>
           </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center hover:bg-slate-50 transition-colors relative cursor-pointer">
           <input 
              type="file" 
              accept="image/*" 
              onChange={handleUpload} 
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
              <p className="text-xs text-slate-400 mt-1">JPG, PNG (Max 2Mo)</p>
           </div>
        </div>
      )}
    </div>
  );
}