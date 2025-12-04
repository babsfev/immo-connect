"use client";
import React, { useState } from "react";
import { User, Lock, Bell, CreditCard, Users, Save, Camera, Mail, Trash2, Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profil"); // Par défaut sur Profil

  const menu = [
     { id: "profil", label: "Mon Profil", icon: User },
     { id: "team", label: "Équipe & Rôles", icon: Users }, // ICI : Le menu équipe
     { id: "securite", label: "Sécurité", icon: Lock },
     { id: "notifs", label: "Notifications", icon: Bell },
     { id: "abo", label: "Abonnement", icon: CreditCard },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Paramètres</h1>
        <p className="text-slate-500">Configuration de votre espace de travail.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* MENU LATÉRAL (3 cols) */}
        <div className="lg:col-span-3 space-y-1">
           {menu.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                   activeTab === item.id 
                   ? "bg-blue-50 text-blue-700 border border-blue-100" 
                   : "text-slate-600 hover:bg-white hover:shadow-sm"
                }`}
              >
                 <item.icon size={18} /> {item.label}
              </button>
           ))}
        </div>

        {/* CONTENU (9 cols) */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* --- ONGLET PROFIL --- */}
          {activeTab === "profil" && (
            <Card>
              <CardHeader><CardTitle>Profil</CardTitle><CardDescription>Vos informations publiques.</CardDescription></CardHeader>
              <CardContent className="space-y-6">
                 <div className="flex items-center gap-6">
                    <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 border-4 border-white shadow-sm">JD</div>
                    <Button size="sm" variant="outline"><Camera size={14} className="mr-2"/> Modifier photo</Button>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1"><label className="text-sm font-medium">Prénom</label><Input defaultValue="Jean"/></div>
                    <div className="space-y-1"><label className="text-sm font-medium">Nom</label><Input defaultValue="Dupont"/></div>
                 </div>
              </CardContent>
              <CardFooter className="border-t border-slate-100 py-4 flex justify-end"><Button className="bg-blue-600 text-white">Enregistrer</Button></CardFooter>
            </Card>
          )}

          {/* --- ONGLET ÉQUIPE (NOUVEAU) --- */}
          {activeTab === "team" && (
            <Card>
               <CardHeader>
                  <div className="flex justify-between items-center">
                     <div><CardTitle>Gestion de l'équipe</CardTitle><CardDescription>Gérez les accès de vos collaborateurs.</CardDescription></div>
                     <Button size="sm" className="bg-blue-600 text-white"><Plus size={16} className="mr-2"/> Inviter</Button>
                  </div>
               </CardHeader>
               <CardContent>
                  <div className="space-y-3">
                     {[
                        { name: "Jean Dupont", role: "Propriétaire", email: "jean@immo.sn", status: "Actif" },
                        { name: "Awa Diop", role: "Agent", email: "awa@immo.sn", status: "Actif" },
                        { name: "Paul Faye", role: "Comptable", email: "paul@audit.sn", status: "Invité" },
                     ].map((user, i) => (
                        <div key={i} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                           <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs">
                                 {user.name.charAt(0)}
                              </div>
                              <div>
                                 <p className="text-sm font-bold text-slate-900">{user.name}</p>
                                 <p className="text-xs text-slate-500">{user.email}</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-4">
                              <Badge variant={user.role === "Propriétaire" ? "default" : "secondary"}>{user.role}</Badge>
                              <span className={`text-xs font-medium ${user.status === "Actif" ? "text-green-600" : "text-orange-500"}`}>{user.status}</span>
                              <button className="text-slate-400 hover:text-red-600"><Trash2 size={16}/></button>
                           </div>
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>
          )}

          {/* --- ONGLET SÉCURITÉ --- */}
          {activeTab === "securite" && (
             <Card>
                <CardHeader><CardTitle>Sécurité</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                   <div className="space-y-1"><label className="text-sm font-medium">Mot de passe actuel</label><Input type="password"/></div>
                   <div className="space-y-1"><label className="text-sm font-medium">Nouveau mot de passe</label><Input type="password"/></div>
                </CardContent>
                <CardFooter className="border-t border-slate-100 py-4 flex justify-end"><Button>Mettre à jour</Button></CardFooter>
             </Card>
          )}

        </div>
      </div>
    </div>
  );
}