"use client";

import React from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

import { Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Bon retour 👋"
      subtitle="Connectez-vous pour gérer votre patrimoine."
    >
      <LoginForm />

      <p className="mt-8 text-xs text-slate-400 flex items-center justify-center gap-1">
        <Lock size={12} /> Connexion sécurisée et chiffrée.
      </p>
    </AuthLayout>
  );
}
