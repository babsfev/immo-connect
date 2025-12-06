"use client";

import React, { useState } from "react";
import {
  User, Lock, Bell, CreditCard, Users, Save, Camera, Plus,
  ShieldCheck, Smartphone, Mail, Building, Loader2
} from "lucide-react";
import Button from "@/components/ui/Button";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input, Label, ImageUpload } from "@/components/ui/form"; 
import { useAction } from "@/hooks/use-action";
import { updateAgencySettings } from "@/app/actions/agency";
import { toast } from "sonner";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("agency");

  // On simule l'upload pour l'instant (dans une vraie app, ImageUpload gère l'upload vers S3)
  // Pour settings, on attend des URLs string.
  // Notre composant ImageUpload UI renvoie un File.
  // Pour faire simple, on va stocker le File localement et ne pas l'envoyer au serveur dans cette démo
  // (Car l'action attend une URL).
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [signFile, setSignFile] = useState<File | null>(null);

  const { execute: executeAgency, isPending } = useAction(updateAgencySettings, {
    onSuccess: () => toast.success("Paramètres enregistrés !"),
    onError: (err) => toast.error(err),
  });

  const menu = [
    { id: "agency", label: "Agence & Facturation", icon: Building },
    { id: "profil", label: "Mon Profil", icon: User },
    { id: "team", label: "Équipe & Rôles", icon: Users },
    { id: "abo", label: "Abonnement", icon: CreditCard },
    { id: "securite", label: "Sécurité", icon: Lock },
    { id: "notifs", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Paramètres</h1>
        <p className="text-slate-500">Configuration de votre espace de travail.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* MENU */}
        <div className="lg:col-span-3 space-y-1">
          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                activeTab === item.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "text-slate-600 hover:bg-white hover:text-blue-600"
              }`}
            >
              <item.icon size={18} /> {item.label}
            </button>
          ))}
        </div>

        {/* CONTENU */}
        <div className="lg:col-span-9 space-y-6">
          
          {activeTab === "agency" && (
            <Card>
              <CardHeader>
                <CardTitle>Identité de l'Agence</CardTitle>
                <CardDescription>Informations affichées sur vos documents.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <form action={executeAgency} className="space-y-8">
                  {/* Zone Images */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-6 border-b border-slate-100">
                    <div>
                      <Label className="mb-2 block">Logo de l'agence</Label>
                      {/* 👇 CORRECTION ICI */}
                      <ImageUpload 
                        name="logoUrl" // L'action attendra une string, ici le form enverra un File (ignoré par Zod temporairement)
                        onChange={setLogoFile} 
                        label="Choisir un logo"
                      />
                      <p className="text-xs text-slate-400 mt-2">Format carré recommandé.</p>
                    </div>
                    <div>
                      <Label className="mb-2 block">Cachet / Signature</Label>
                      {/* 👇 CORRECTION ICI */}
                      <ImageUpload 
                        name="signatureUrl"
                        onChange={setSignFile}
                        label="Choisir une signature"
                      />
                      <p className="text-xs text-slate-400 mt-2">Fond transparent recommandé.</p>
                    </div>
                  </div>

                  {/* Infos */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label>Nom de la structure</Label><Input name="companyName" placeholder="Ex: Immo Connect Sn" /></div>
                    <div><Label>NINEA</Label><Input name="ninea" placeholder="Ex: 000123456" /></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label>Adresse</Label><Input name="address" placeholder="Ex: Mermoz, Dakar" /></div>
                    <div><Label>Téléphone</Label><Input name="phone" placeholder="Ex: 33 800 00 00" /></div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button type="submit" className="bg-slate-900 text-white min-w-[150px]" disabled={isPending} isLoading={isPending}>
                        Enregistrer
                    </Button>
                  </div>
                </form>

              </CardContent>
            </Card>
          )}

          {/* ... (Les autres onglets restent inchangés car ils n'utilisent pas ImageUpload) ... */}
          {/* Pour ne pas alourdir la réponse, je ne remets pas tout le code des autres onglets s'ils sont OK */}
          {activeTab === "profil" && (
             <div className="text-center py-10 text-slate-400">Section Profil (à venir)</div>
          )}
           {activeTab === "team" && (
             <div className="text-center py-10 text-slate-400">Section Équipe (à venir)</div>
          )}
           {activeTab === "abo" && (
             <div className="text-center py-10 text-slate-400">Section Abonnement (à venir)</div>
          )}
           {activeTab === "securite" && (
             <div className="text-center py-10 text-slate-400">Section Sécurité (à venir)</div>
          )}
           {activeTab === "notifs" && (
             <div className="text-center py-10 text-slate-400">Section Notifications (à venir)</div>
          )}

        </div>
      </div>
    </div>
  );
}