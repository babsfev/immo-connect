"use client";

import React, { useState } from "react";
import {
  User,
  Lock,
  Bell,
  CreditCard,
  Users,
  Save,
  Camera,
  Plus,
  ShieldCheck,
  Smartphone,
  Mail,
  Building,
  Loader2
} from "lucide-react";
import Button from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input, Label, ImageUpload } from "@/components/ui/form"; // Import unifié
import { useAction } from "@/hooks/use-action";
import { updateAgencySettings } from "@/app/actions/agency";
import { toast } from "sonner";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("agency"); // Par défaut sur Agence pour tester

  // États pour les images de l'agence
  const [logo, setLogo] = useState<string | null>(null);
  const [sign, setSign] = useState<string | null>(null);

  // Hook pour l'action serveur Agence
  const { execute: executeAgency, isPending } = useAction(updateAgencySettings, {
    onSuccess: () => toast.success("Paramètres de l'agence enregistrés !"),
    onError: (err) => toast.error(err),
  });

  // Menu latéral
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
        <p className="text-slate-500">
          Configuration de votre espace de travail.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* MENU LATÉRAL */}
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

        {/* CONTENU PRINCIPAL */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* --- ONGLET AGENCE (Le plus important) --- */}
          {activeTab === "agency" && (
            <Card>
              <CardHeader>
                <CardTitle>Identité de l'Agence</CardTitle>
                <CardDescription>
                  Ces informations (Logo, NINEA, Signature) apparaîtront automatiquement sur vos quittances et avis d'échéance.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <form 
                  action={(formData) => {
                    // On ajoute manuellement les URLs des images au FormData
                    if (logo) formData.append("logoUrl", logo);
                    if (sign) formData.append("signatureUrl", sign);
                    executeAgency(formData);
                  }} 
                  className="space-y-8"
                >
                  {/* Zone Images */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-6 border-b border-slate-100">
                    <div>
                      <Label className="mb-2 block">Logo de l'agence</Label>
                      <ImageUpload 
                        onUploadComplete={setLogo} 
                        currentImage={logo || undefined} 
                      />
                      <p className="text-xs text-slate-400 mt-2">Apparaîtra en haut à gauche des PDF.</p>
                    </div>
                    <div>
                      <Label className="mb-2 block">Cachet / Signature</Label>
                      <ImageUpload 
                        onUploadComplete={setSign} 
                        currentImage={sign || undefined} 
                      />
                      <p className="text-xs text-slate-400 mt-2">Sera apposé au bas des documents officiels.</p>
                    </div>
                  </div>

                  {/* Infos Légales */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Nom de la structure</Label>
                      <Input name="companyName" placeholder="Ex: Immo Connect Sn" />
                    </div>
                    <div>
                      <Label>NINEA (Fiscal)</Label>
                      <Input name="ninea" placeholder="Ex: 000123456" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Adresse du siège</Label>
                      <Input name="address" placeholder="Ex: Mermoz, Dakar" />
                    </div>
                    <div>
                      <Label>Téléphone Pro</Label>
                      <Input name="phone" placeholder="Ex: 33 800 00 00" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                       <Label>Email Contact</Label>
                       <Input name="email" placeholder="contact@agence.sn" />
                    </div>
                    <div>
                       <Label>Site Web</Label>
                       <Input name="website" placeholder="https://..." />
                    </div>
                  </div>
                  
                  {/* Bouton Sauvegarde */}
                  <div className="pt-4 flex justify-end">
                    <Button type="submit" className="bg-slate-900 text-white min-w-[150px]" disabled={isPending}>
                        {isPending ? <Loader2 className="animate-spin mr-2"/> : <Save className="mr-2" size={18}/>}
                        {isPending ? "Enregistrement..." : "Enregistrer"}
                    </Button>
                  </div>
                </form>

              </CardContent>
            </Card>
          )}

          {/* --- ONGLET PROFIL --- */}
          {activeTab === "profil" && (
            <Card>
              <CardHeader>
                <CardTitle>Profil Personnel</CardTitle>
                <CardDescription>Vos informations de connexion.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="h-24 w-24 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold text-white border-4 border-white shadow-lg">
                      JD
                    </div>
                    <button className="absolute bottom-0 right-0 p-2 bg-white text-slate-600 rounded-full shadow-md hover:text-blue-600 border border-slate-100">
                      <Camera size={14} />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">
                      Jean Dupont
                    </h3>
                    <p className="text-slate-500 text-sm">
                      Gestionnaire Principal
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Prénom</Label><Input defaultValue="Jean" /></div>
                  <div><Label>Nom</Label><Input defaultValue="Dupont" /></div>
                </div>
                <div><Label>Email</Label><Input defaultValue="jean@immo.sn" disabled className="bg-slate-50" /></div>
              </CardContent>
              <CardFooter className="border-t border-slate-100 py-4 flex justify-end">
                <Button className="bg-blue-600 text-white">Mettre à jour</Button>
              </CardFooter>
            </Card>
          )}

          {/* --- ONGLET SÉCURITÉ --- */}
          {activeTab === "securite" && (
            <div className="space-y-6">
              <Card className="bg-slate-900 text-white border-none">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
                      Santé du compte
                    </p>
                    <h3 className="text-2xl font-bold text-green-400 flex items-center gap-2">
                      <ShieldCheck /> Sécurisé à 85%
                    </h3>
                    <p className="text-slate-300 text-sm mt-2">
                      Activez la double authentification (2FA) pour atteindre 100%.
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-white text-slate-900 hover:bg-blue-50 border-none"
                  >
                    Activer 2FA
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Changer de mot de passe</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div><Label>Mot de passe actuel</Label><Input type="password" /></div>
                  <div><Label>Nouveau mot de passe</Label><Input type="password" /></div>
                </CardContent>
                <CardFooter className="border-t border-slate-100 py-4 flex justify-end">
                  <Button>Mettre à jour</Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {/* --- ONGLET ABONNEMENT --- */}
          {activeTab === "abo" && (
            <div className="space-y-6">
              <Card className="border-blue-200 bg-blue-50/50">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-blue-900">Plan Pro</h3>
                      <p className="text-blue-600 text-sm">Renouvellement le 01 Déc. 2025</p>
                    </div>
                    <Badge className="bg-blue-600 text-white border-none">Actif</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-slate-600">Utilisation Biens</span>
                      <span className="text-blue-700">8 / 20</span>
                    </div>
                    <div className="w-full bg-white h-3 rounded-full border border-blue-100 overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: "40%" }}></div>
                    </div>
                    <p className="text-xs text-slate-500">Il vous reste 12 emplacements disponibles.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* --- ONGLET TEAM --- */}
          {activeTab === "team" && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div><CardTitle>Équipe</CardTitle><CardDescription>Gérez les accès.</CardDescription></div>
                  <Button size="sm" className="bg-blue-600 text-white"><Plus size={16} className="mr-2" /> Inviter</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[{ name: "Jean Dupont", role: "Admin" }, { name: "Awa Diop", role: "Agent" }].map((user, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs">{user.name.charAt(0)}</div>
                        <div><p className="text-sm font-bold text-slate-900">{user.name}</p><p className="text-xs text-slate-500">{user.role}</p></div>
                      </div>
                      <Badge variant="secondary" className="text-green-600 bg-green-50">Actif</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* --- ONGLET NOTIFICATIONS --- */}
          {activeTab === "notifs" && (
            <Card>
              <CardHeader><CardTitle>Préférences</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-50 rounded-lg text-slate-600"><Mail size={18} /></div>
                      <div><p className="text-sm font-bold text-slate-900">Alertes Email</p><p className="text-xs text-slate-500">Recevoir les quittances.</p></div>
                    </div>
                    <div className="w-11 h-6 bg-blue-600 rounded-full relative cursor-pointer"><div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full shadow-sm"></div></div>
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}