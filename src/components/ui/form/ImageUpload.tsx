"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

interface ImageUploadProps {
  name: string;
  label?: string;
  defaultValue?: string | null;
  error?: string;
  onChange?: (file: File | null) => void;
}

export function ImageUpload({ name, label, defaultValue, error, onChange }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(defaultValue || null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onChange?.(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
    onChange?.(null);
  };

  return (
    <div className="space-y-2">
      {label && <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</span>}
      
      {/* Input caché mais présent pour le formulaire HTML standard */}
      <input
        type="hidden"
        name={name} // Astuce : on envoie l'URL existante si pas de nouveau fichier
        value={preview || ""} 
      />
      
      <div className={cn(
        "relative border-2 border-dashed rounded-xl transition-all h-48 flex flex-col items-center justify-center overflow-hidden bg-slate-50 group",
        error ? "border-red-300 bg-red-50/10" : "border-slate-300 hover:border-slate-400 hover:bg-slate-100"
      )}>
        
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          // Note: le 'name' ici n'est pas celui envoyé au serveur directement si on utilise un upload cloud séparé
          // Mais pour un formulaire simple multipart, on peut le mettre
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        {preview ? (
          <>
            {/* Aperçu Image */}
            <img src={preview} alt="Aperçu" className="w-full h-full object-cover" />
            
            {/* Bouton supprimer (z-20 pour être au dessus de l'input file) */}
            <div className="absolute top-2 right-2 z-20">
              <Button 
                type="button" 
                variant="danger" 
                size="icon" 
                className="h-8 w-8 rounded-full shadow-md"
                onClick={(e) => {
                  e.preventDefault(); // Empêche d'ouvrir le sélecteur de fichier
                  handleRemove();
                }}
              >
                <X size={14} />
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-3 text-slate-400 group-hover:scale-110 transition-transform">
              <UploadCloud size={24} />
            </div>
            <p className="text-sm font-medium text-slate-700">Cliquez pour ajouter une photo</p>
            <p className="text-xs text-slate-400 mt-1">JPG, PNG (Max 5Mo)</p>
          </div>
        )}
      </div>

      {error && (
        <p className="text-[11px] font-medium text-red-600 flex items-center gap-1.5 animate-in slide-in-from-top-1">
           {error}
        </p>
      )}
    </div>
  );
}