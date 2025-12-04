"use client";

import React from "react";
import Image from "next/image";
import { Logo } from "@/components/ui/Logo";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-[#F8FAFC]">
      {/* LEFT VISUAL (desktop only) */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-slate-900 text-white relative h-screen top-0 px-12">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            alt="Background Immo"
            fill
            className="object-cover opacity-20"
            priority
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-linear-to-br from-blue-900/80 via-slate-900/90 to-black/95"></div>
        </div>

        <div className="relative z-10 max-w-lg text-center space-y-8">
          <div className="flex justify-center mb-6" style={{ transform: "scale(1.15)" }}>
            <Logo variant="white" />
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            L'immobilier,<br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">
              en toute sérénité.
            </span>
          </h2>

          <p className="text-lg text-slate-300/90 leading-relaxed max-w-md mx-auto">
            Rejoignez des milliers de gestionnaires qui pilotent leur parc avec simplicité.
          </p>

          <div className="flex items-center justify-center gap-6 pt-4 text-sm font-medium text-blue-100/80">
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md shadow-sm">
              <ShieldCheck size={18} className="text-green-400" />
              <span>Sécurisé & Chiffré</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md shadow-sm">
              <CheckCircle2 size={18} className="text-blue-400" />
              <span>Automatisé</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 text-xs text-slate-500 font-medium">
          © 2025 Immo-Connect
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 flex justify-center">
            <Logo />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
            <p className="text-slate-500 mt-2">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
