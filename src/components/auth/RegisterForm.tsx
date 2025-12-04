"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Loader2, Check } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/form/Input"; // Utilise votre Input "Premium"
import { registerUser } from "@/app/actions/auth";
import { SocialButtons } from "@/components/auth/SocialButtons";
import { formatSenegalPhone, isActionError } from "@/lib/utils";
import { FeedbackModal } from "@/components/ui/FeedbackModal";
import { useAction } from "@/hooks/use-action"; // <-- L'arme secrète

interface RegisterFormProps {
  role: "OWNER" | "AGENCY";
  onBack: () => void;
}

export function RegisterForm({ role, onBack }: RegisterFormProps) {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);

  // 1. État pour la Modale Feedback (Succès / Erreur critique)
  const [feedback, setFeedback] = useState<{
    show: boolean;
    type: "success" | "error" | "loading";
    title: string;
    message: string;
  }>({ show: false, type: "loading", title: "", message: "" });

  // 2. État du formulaire
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });

  // 3. LE HOOK MAGIQUE (Gère le cycle de vie)
  const { execute, isPending, result } = useAction(registerUser, {
    onSuccess: () => {
      // A. On affiche la Modale de Succès
      setFeedback({
        show: true,
        type: "success",
        title: "Compte créé !",
        message: "Redirection vers la vérification email...",
      });

      // B. On redirige après un petit délai pour l'effet "Whaou"
      setTimeout(() => {
        router.push(
          `/verify-email?email=${encodeURIComponent(formData.email)}`
        );
      }, 2000);
    },
    onError: (error) => {
      // C. On affiche la Modale d'Erreur (si c'est une erreur générale)
      setFeedback({
        show: true,
        type: "error",
        title: "Oups !",
        message: error,
      });
      // On la ferme auto après 3s
      setTimeout(() => setFeedback((prev) => ({ ...prev, show: false })), 3000);
    },
  });

  // --- LOGIQUE SÉCURITÉ (MDP) ---
  const pass = formData.password;
  const checks = {
    minLen: pass.length >= 8,
    hasUpper: /[A-Z]/.test(pass),
    hasNumber: /[0-9]/.test(pass),
    hasSpecial: /[^a-zA-Z0-9]/.test(pass),
  };
  const isPasswordValid =
    checks.minLen && checks.hasUpper && checks.hasNumber && checks.hasSpecial;
  const isPasswordStrong = isPasswordValid && pass.length >= 10;
  const isPassMatch =
    formData.password === formData.confirm && formData.password.length > 0;

  const getBarColor = () => {
    if (!pass) return "bg-slate-200";
    if (!isPasswordValid) return "bg-red-500";
    if (isPasswordStrong) return "bg-green-500";
    return "bg-orange-500";
  };

  const getStrengthLabel = () => {
    if (!pass) return "";
    if (!isPasswordValid) return "Insuffisant";
    if (isPasswordStrong) return "Excellent";
    return "Moyen";
  };

  const Requirement = ({ met, label }: { met: boolean; label: string }) => (
    <div
      className={`flex items-center gap-1.5 text-[11px] ${
        met ? "text-green-600" : "text-slate-400"
      }`}
    >
      {met ? (
        <Check size={12} strokeWidth={3} />
      ) : (
        <div className="w-1 h-1 rounded-full bg-slate-300" />
      )}
      {label}
    </div>
  );

  // --- GESTION FORMULAIRE ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setFormData((prev) => ({ ...prev, phone: formatSenegalPhone(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation Client Rapide
    if (!isPasswordValid) {
      setFeedback({
        show: true,
        type: "error",
        title: "Sécurité",
        message: "Mot de passe trop faible.",
      });
      setTimeout(() => setFeedback((prev) => ({ ...prev, show: false })), 3000);
      return;
    }
    if (!isPassMatch) {
      setFeedback({
        show: true,
        type: "error",
        title: "Erreur",
        message: "Les mots de passe ne correspondent pas.",
      });
      setTimeout(() => setFeedback((prev) => ({ ...prev, show: false })), 3000);
      return;
    }

    // Préparation et Envoi (Via le Hook)
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => data.append(key, val));
    data.append("role", role);

    execute(data);
  };

  // Helper pour les erreurs inline (Zod)
  const getError = (field: string) => {
    if (isActionError(result)) {
      return result.details?.[field]?.[0];
    }
    return undefined;
  };

  return (
    <>
      <FeedbackModal
        isOpen={feedback.show}
        type={feedback.type}
        title={feedback.title}
        message={feedback.message}
      />

      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="text-slate-400 hover:text-slate-600 flex items-center gap-1 text-sm font-medium transition-colors"
          >
            <ArrowLeft size={16} /> Changer de rôle
          </button>
          <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded uppercase">
            {role === "OWNER" ? "Propriétaire" : "Agence"}
          </span>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-1">
          Créer votre compte
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          Remplissez vos informations ci-dessous.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">
                Prénom
              </label>
              <Input
                name="firstName"
                required
                placeholder="Votre Prenom"
                value={formData.firstName}
                onChange={handleChange}
                className="bg-slate-50"
                errorMessage={getError("firstName")} // Erreur Inline Zod
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">
                Nom
              </label>
              <Input
                name="lastName"
                required
                placeholder="Votre Nom"
                value={formData.lastName}
                onChange={handleChange}
                className="bg-slate-50"
                errorMessage={getError("lastName")}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">
              Email
            </label>
            <Input
              name="email"
              type="email"
              required
              placeholder="votre@email.com"
              value={formData.email}
              onChange={handleChange}
              className="bg-slate-50"
              errorMessage={getError("email")}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">
              Téléphone
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3 flex items-center gap-2 border-r border-slate-200 pr-3 h-6">
                <img
                  src="/flags/sn.svg"
                  alt="SN"
                  className="h-4 w-6 object-cover rounded-xs"
                />
                <span className="font-mono font-medium text-sm text-slate-900">
                  +221
                </span>
              </div>

              <Input
                name="phone"
                type="tel"
                required
                placeholder="77 123 45 67"
                value={formData.phone}
                onChange={handleChange}
                className="bg-slate-50 pl-24 font-mono text-base tracking-wide placeholder:text-slate-400"
                errorMessage={getError("phone")}
              />
            </div>
          </div>

          <div className="space-y-3 pt-1">
            <div className="relative">
              <label className="text-xs font-bold text-slate-500 uppercase">
                Mot de passe
              </label>
              <Input
                name="password"
                type={showPass ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Mot de passe"
                className={`bg-slate-50 pr-10 ${
                  !isPasswordValid && pass.length > 0
                    ? "border-red-300 focus:ring-red-100"
                    : "focus:ring-blue-100"
                }`}
                errorMessage={getError("password")}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-3 text-slate-400"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="space-y-2">
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${getBarColor()}`}
                  style={{
                    width: isPasswordStrong
                      ? "100%"
                      : isPasswordValid
                      ? "66%"
                      : pass.length > 0
                      ? "33%"
                      : "0%",
                  }}
                />
              </div>
              <div className="flex justify-between items-start">
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <Requirement met={checks.minLen} label="8 car. min" />
                  <Requirement met={checks.hasUpper} label="1 Majuscule" />
                  <Requirement met={checks.hasNumber} label="1 Chiffre" />
                  <Requirement met={checks.hasSpecial} label="1 Spécial" />
                </div>
                <span
                  className={`text-xs font-bold ${
                    isPasswordStrong
                      ? "text-green-600"
                      : isPasswordValid
                      ? "text-orange-500"
                      : "text-red-500"
                  }`}
                >
                  {getStrengthLabel()}
                </span>
              </div>
            </div>
            <label className="text-xs font-bold text-slate-500 uppercase">
              Confimer Mot de passe
            </label>
            <Input
              name="confirm"
              type="password"
              value={formData.confirm}
              onChange={handleChange}
              placeholder="Confirmer"
              className={`bg-slate-50 ${
                isPassMatch && formData.confirm ? "border-green-500" : ""
              }`}
            />
          </div>

          <Button
            type="submit"
            disabled={isPending || !isPasswordValid || !isPassMatch}
            className={`w-full h-12 text-white mt-4 shadow-md ${
              isPasswordValid && isPassMatch
                ? "bg-slate-900 hover:bg-slate-800"
                : "bg-slate-300 cursor-not-allowed"
            }`}
          >
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Créer mon compte"
            )}
          </Button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200"></span>
          </div>
          <div className="relative flex justify-center text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span className="bg-white px-3">Ou continuer avec</span>
          </div>
        </div>

        <SocialButtons />
      </div>
    </>
  );
}
