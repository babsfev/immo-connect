"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/form/Input";
import { ArrowLeft, Loader2, CheckCircle2, Lock } from "lucide-react";
import { resetPassword } from "@/app/actions/auth";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    const result = await resetPassword(formData);
    setIsLoading(false);

    // CORRECTION ICI
    if (result && !result.ok) {
      toast.error(result.error);
    } else {
      setIsSent(true);
      toast.success("Email envoyé !");
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-64 bg-linear-to-b from-blue-50 to-transparent -z-10"></div>
      <div className="mb-8"><Logo className="h-12 w-auto" /></div>

      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-slate-100 text-center">
         
         {!isSent ? (
           <>
             <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6"><Lock size={32} /></div>
             <h1 className="text-2xl font-bold text-slate-900 mb-2">Mot de passe oublié ?</h1>
             <p className="text-slate-500 text-sm mb-8">Entrez votre email pour recevoir un lien de réinitialisation.</p>

             <form action={handleSubmit} className="space-y-4 text-left">
                <div className="space-y-1">
                   <label className="text-xs font-bold text-slate-700 uppercase">Email pro</label>
                   <Input name="email" type="email" required autoFocus className="bg-slate-50"/>
                </div>
                <Button type="submit" className="w-full h-12 bg-slate-900 text-white hover:bg-slate-800" disabled={isLoading}>
                   {isLoading ? <Loader2 className="animate-spin"/> : "Envoyer le lien"}
                </Button>
             </form>
           </>
         ) : (
           <div className="animate-in zoom-in duration-300">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={32} /></div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Email envoyé !</h2>
              <p className="text-slate-500 text-sm mb-8">Vérifiez votre boîte mail. Vous y trouverez un lien pour créer un nouveau mot de passe.</p>
              <Button variant="outline" className="w-full" onClick={() => setIsSent(false)}>Renvoyer l'email</Button>
           </div>
         )}

         <div className="mt-8 pt-6 border-t border-slate-100">
            <Link href="/login" className="text-sm text-slate-500 hover:text-slate-900 flex items-center justify-center gap-2 font-medium transition-colors">
               <ArrowLeft size={16}/> Retour à la connexion
            </Link>
         </div>
      </div>
    </div>
  );
}