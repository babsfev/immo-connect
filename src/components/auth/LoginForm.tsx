"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/form/Input"; // Nouvel Input
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
        
        <Input 
          label="Email professionnel"
          name="email"
          type="email"
          placeholder="nom@entreprise.com"
          icon={<Mail size={18} />}
          required
          autoComplete="email"
          error={getFieldError("email")}
        />

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Mot de passe
            </label>
            <Link href="/forgot-password" className="text-xs text-blue-600 hover:text-blue-700 font-semibold">
              Oublié ?
            </Link>
          </div>
          <div className="relative">
             <Input
                id="password"
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                icon={<Lock size={18} />}
                required
                autoComplete="current-password"
                error={getFieldError("password")}
                // Bouton "Oeil" intégré manuellement ou via rightIcon si Input le supporte avec interactivité
                className="pr-10" 
             />
             <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 z-10"
             >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
             </button>
          </div>
        </div>

        {/* Global error */}
        {result && !result.ok && !result.details && (
          <div className="bg-red-50 text-red-700 text-sm p-3 rounded-xl border border-red-100 flex items-center justify-center">
            {result.error}
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          className="w-full bg-slate-900 hover:bg-slate-800 text-white shadow-lg"
          size="lg"
          isLoading={isPending}
        >
          Se connecter
        </Button>
      </form>

      {/* Separator */}
      <div className="my-8 relative">
        <div className="absolute inset-0 flex items-center" aria-hidden>
          <span className="w-full border-t border-slate-200"></span>
        </div>
        <div className="relative flex justify-center text-xs font-bold text-slate-400 uppercase tracking-wider">
          <span className="bg-white px-3">Ou continuer avec</span>
        </div>
      </div>

      <SocialButtons />

      <p className="text-center text-sm text-slate-500 mt-8">
        Pas encore de compte ?{" "}
        <Link href="/register" className="text-blue-600 font-bold hover:text-blue-700 hover:underline">
          Créer un compte
        </Link>
      </p>
    </div>
  );
}