"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, User, Mail, Phone, Lock, ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/form/Input";
import { toast } from "sonner";
import { useAction } from "@/hooks/use-action";
import { registerUser } from "@/app/actions/auth";
import { SocialButtons } from "@/components/auth/SocialButtons";
import { formatSenegalPhone, isActionError } from "@/lib/utils";

// Définition des props attendues
interface RegisterFormProps {
  role?: "AGENCY" | "OWNER"; 
  onBack?: () => void;
}

export function RegisterForm({ role = "OWNER", onBack }: RegisterFormProps) {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);

  // État du formulaire local
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirm: ""
  });

  const { execute, isPending, result } = useAction(registerUser, {
    onSuccess: () => {
      toast.success("Compte créé avec succès !");
      router.push("/dashboard"); 
    },
    onError: (err) => toast.error(err),
  });

  // Gestion des changements de champs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => { // Correction ici: e.preventDefault
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
    });
    // On force le rôle sélectionné dans les données envoyées
    data.append("role", role);
    execute(data);
  };

  const getError = (field: string) => {
    if (isActionError(result)) return result.details?.[field]?.[0];
    return undefined;
  };

  // Logique mot de passe
  const pass = formData.password;
  const isPasswordValid = pass.length >= 8; // Simplifié pour l'exemple
  const isPassMatch = formData.password === formData.confirm && formData.password.length > 0;

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      
      {/* Bouton Retour (si onBack existe) */}
      {onBack && (
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 text-slate-400 hover:text-slate-600 transition-colors"
          title="Retour au choix"
        >
          <ArrowLeft size={20} />
        </button>
      )}

      <div className="text-center mb-8">
         <h2 className="text-2xl font-bold text-slate-900">Créer un compte {role === "AGENCY" ? "Agence" : "Propriétaire"}</h2>
         <p className="text-sm text-slate-500 mt-2">Rejoignez la communauté Immo-Connect</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Nom & Prénom */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            name="firstName"
            placeholder="Prénom"
            icon={<User size={18} />}
            value={formData.firstName}
            onChange={handleChange}
            error={getError("firstName")} // ✅ CORRIGÉ (error au lieu de errorMessage)
            required
          />
          <Input
            name="lastName"
            placeholder="Nom"
            value={formData.lastName}
            onChange={handleChange}
            error={getError("lastName")} // ✅ CORRIGÉ
            required
          />
        </div>

        {/* Contact */}
        <Input
          name="email"
          type="email"
          placeholder="Email professionnel"
          icon={<Mail size={18} />}
          value={formData.email}
          onChange={handleChange}
          error={getError("email")} // ✅ CORRIGÉ
          required
        />

        <Input
          name="phone"
          placeholder="77 000 00 00"
          icon={<Phone size={18} />}
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: formatSenegalPhone(e.target.value)})}
          error={getError("phone")} // ✅ CORRIGÉ
          required
        />

        {/* Mot de passe */}
        <div className="relative">
          <Input
            name="password"
            type={showPass ? "text" : "password"}
            placeholder="Mot de passe (8+ caractères)"
            icon={<Lock size={18} />}
            value={formData.password}
            onChange={handleChange}
            error={getError("password")} // ✅ CORRIGÉ
            required
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 transition-colors z-10"
          >
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Confirmation Mot de passe */}
         <Input
            name="confirm"
            type="password"
            placeholder="Confirmer mot de passe"
            value={formData.confirm}
            onChange={handleChange}
            className={isPassMatch ? "border-green-500 focus:ring-green-100" : ""}
            required
          />

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white shadow-lg h-12 rounded-xl"
            isLoading={isPending}
          >
            S'inscrire
          </Button>
        </div>
      </form>

      {/* Footer */}
      <div className="mt-8">
        <div className="relative flex py-2 items-center">
          <div className="grow border-t border-slate-100"></div>
          <span className="shrink-0 mx-4 text-xs font-bold text-slate-300 uppercase tracking-wider">Ou</span>
          <div className="grow border-t border-slate-100"></div>
        </div>

        <div className="mt-4">
          <SocialButtons />
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Déjà inscrit ?{" "}
          <Link href="/login" className="text-blue-600 font-bold hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}