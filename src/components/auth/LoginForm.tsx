"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Eye, EyeOff, Mail, Lock } from "lucide-react";
import Button from "@/components/ui/Button";
import { toast } from "sonner";
import { useAction } from "@/hooks/use-action";
import { loginUser } from "@/app/actions/auth";
import { SocialButtons } from "@/components/auth/SocialButtons";
import { isActionError } from "@/lib/utils";

export function LoginForm() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [shake, setShake] = useState(false);

  const { execute, isPending, result } = useAction(loginUser, {
    onSuccess: () => {
      toast.success("Connexion réussie");
      router.push("/dashboard");
      router.refresh();
    },
    onError: () => {
      setShake(true);
      setTimeout(() => setShake(false), 400);
    },
  });

  const handleSubmit = (formData: FormData) => {
    execute(formData);
  };

  const getFieldError = (field: string) => {
    if (isActionError(result)) return result.details?.[field]?.[0];
    return undefined;
  };

  return (
    <div className={`w-full ${shake ? "animate-[shake_0.4s]" : ""}`}>
      <form action={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label htmlFor="email" className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
            Email professionnel
          </label>
          <div className="mt-2 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Mail size={16} />
            </span>
            <input
              id="email"
              name="email"
              type="email"
              aria-label="Email"
              placeholder="nom@entreprise.com"
              required
              autoComplete="email"
              className="w-full pl-10 pr-3 h-12 border border-slate-200 rounded-lg bg-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
          {getFieldError("email") && <p className="text-xs text-red-600 mt-1">{getFieldError("email")}</p>}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
              Mot de passe
            </label>
            <Link href="/forgot-password" className="text-xs text-blue-600 hover:text-blue-700 font-semibold">
              Oublié ?
            </Link>
          </div>

          <div className="mt-2 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Lock size={16} />
            </span>
            <input
              id="password"
              name="password"
              type={showPass ? "text" : "password"}
              aria-label="Mot de passe"
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="w-full pl-10 pr-12 h-12 border border-slate-200 rounded-lg bg-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              aria-label={showPass ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {getFieldError("password") && <p className="text-xs text-red-600 mt-1">{getFieldError("password")}</p>}
        </div>

        {/* Global error */}
        {result && !result.ok && !result.details && (
          <div className="bg-red-50 text-red-700 text-sm p-3 rounded-md border border-red-100">
            {result.error}
          </div>
        )}

        {/* Submit */}
        <div>
          <Button
            type="submit"
            className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
            disabled={isPending}
          >
            {isPending ? <Loader2 className="animate-spin" /> : "Se connecter"}
          </Button>
        </div>
      </form>

      {/* Separator */}
      <div className="my-6 relative">
        <div className="absolute inset-0 flex items-center" aria-hidden>
          <span className="w-full border-t border-slate-200"></span>
        </div>
        <div className="relative flex justify-center text-xs font-bold text-slate-400 uppercase">
          <span className="bg-white px-3">Ou continuer avec</span>
        </div>
      </div>

      <SocialButtons />

      <p className="text-center text-sm text-slate-500 mt-6">
        Pas encore de compte ?{" "}
        <Link href="/register" className="text-blue-600 font-semibold hover:text-blue-700">
          Créer un compte
        </Link>
      </p>
    </div>
  );
}
