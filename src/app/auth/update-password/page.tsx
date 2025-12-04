"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/form/Input";
import { Lock, Eye, EyeOff, Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import { useAction } from "@/hooks/use-action";
import { updateUserPassword } from "@/app/actions/auth"; // Nouvelle action

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  
  // États du formulaire
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // Hook Magique
  const { execute, isPending } = useAction(updateUserPassword, {
    onSuccess: () => {
      toast.success("Succès !", { description: "Votre mot de passe a été modifié." });
      setTimeout(() => router.push("/dashboard"), 1500);
    }
  });

  // --- LOGIQUE SÉCURITÉ (Réutilisée) ---
  const checks = {
    minLen: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^a-zA-Z0-9]/.test(password),
  };
  const isPasswordValid = checks.minLen && checks.hasUpper && checks.hasNumber && checks.hasSpecial;
  const isPasswordStrong = isPasswordValid && password.length >= 10;
  const isPassMatch = password === confirm && password.length > 0;

  const getBarColor = () => {
    if (!password) return "bg-slate-200";
    if (!isPasswordValid) return "bg-red-500";
    if (isPasswordStrong) return "bg-green-500";
    return "bg-orange-500";
  };

  const Requirement = ({ met, label }: { met: boolean, label: string }) => (
    <div className={`flex items-center gap-1.5 text-[11px] ${met ? "text-green-600" : "text-slate-400"}`}>
      {met ? <Check size={12} strokeWidth={3} /> : <div className="w-1 h-1 rounded-full bg-slate-300" />}
      {label}
    </div>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordValid || !isPassMatch) return;
    execute({ password });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-6 relative overflow-hidden">
      
      {/* Fond décoratif */}
      <div className="absolute top-0 left-0 w-full h-64 bg-linear-to-b from-blue-50 to-transparent -z-10"></div>

      <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
         <Logo className="h-12 w-auto" />
      </div>

      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-slate-100 animate-in zoom-in-95 duration-300">
         
         <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100 shadow-sm">
               <Lock size={32} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Nouveau mot de passe</h1>
            <p className="text-slate-500 text-sm mt-2">Sécurisez votre compte avec un code fort.</p>
         </div>

         <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Nouveau MDP */}
            <div className="space-y-3">
               <div className="relative">
                  <Input 
                     type={showPass ? "text" : "password"} 
                     placeholder="Nouveau mot de passe" 
                     value={password} 
                     onChange={(e) => setPassword(e.target.value)}
                     className={`bg-slate-50 pr-10 ${!isPasswordValid && password.length > 0 ? "border-red-300 focus:ring-red-100" : "focus:ring-blue-100"}`}
                     autoFocus
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition-colors">
                     {showPass ? <EyeOff size={18}/> : <Eye size={18}/>}
                  </button>
               </div>

               {/* Jauge */}
               <div className="space-y-2">
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                     <div className={`h-full transition-all duration-500 ${getBarColor()}`} style={{ width: isPasswordStrong ? "100%" : isPasswordValid ? "66%" : password.length > 0 ? "33%" : "0%" }}></div>
                  </div>
                  <div className="grid grid-cols-2 gap-y-1">
                     <Requirement met={checks.minLen} label="8 car. min" />
                     <Requirement met={checks.hasUpper} label="1 Majuscule" />
                     <Requirement met={checks.hasNumber} label="1 Chiffre" />
                     <Requirement met={checks.hasSpecial} label="1 Spécial" />
                  </div>
               </div>
            </div>

            {/* Confirmation */}
            <div className="relative">
               <Input 
                  type="password" 
                  placeholder="Confirmer le mot de passe" 
                  value={confirm} 
                  onChange={(e) => setConfirm(e.target.value)}
                  className={`bg-slate-50 ${isPassMatch && confirm ? "border-green-500 focus:ring-green-200" : ""}`}
               />
               {isPassMatch && confirm && <Check size={18} className="text-green-500 absolute right-3 top-3.5" />}
            </div>

            <Button 
               type="submit" 
               className={`w-full h-12 text-white shadow-md transition-all ${isPasswordValid && isPassMatch ? "bg-slate-900 hover:bg-slate-800" : "bg-slate-300 cursor-not-allowed"}`} 
               disabled={isPending || !isPasswordValid || !isPassMatch}
            >
               {isPending ? <Loader2 className="animate-spin"/> : "Mettre à jour"}
            </Button>
         </form>
      </div>
    </div>
  );
}