"use client";

import React from "react";
import Link from "next/link";
import {
  MapPinOff,
  ArrowLeft,
  Search,
  Home,
  FileText,
  HelpCircle,
  LayoutDashboard,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/form";import { Card } from "@/components/ui/Card";
import { Logo } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] p-4 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Logo discret */}
      <div className="mb-8">
        <Logo className="h-10" />
      </div>

      <div className="max-w-md w-full text-center space-y-8">
        {/* Visuel 404 */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-blue-100 rounded-full blur-2xl opacity-50 animate-pulse"></div>
          <div className="relative bg-white p-6 rounded-full shadow-xl shadow-slate-200 border border-slate-100">
            <MapPinOff size={48} className="text-orange-500" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Page introuvable
          </h1>
          <p className="text-slate-500">
            Il semble que ce bien ou cette page ait été retiré du marché... ou
            n'a jamais existé.
          </p>
        </div>

        {/* Barre de Recherche de Secours */}
        <div className="relative group">
          <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-orange-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <div className="relative bg-white rounded-xl p-1 flex shadow-sm border border-slate-200">
            <Input
              placeholder="Rechercher un bien, un client..."
              className="border-none shadow-none focus:ring-0 bg-transparent h-12"
              autoFocus
            />
            <Button
              size="icon"
              className="h-12 w-12 bg-slate-900 hover:bg-blue-600 rounded-lg transition-colors"
            >
              <Search size={18} className="text-white" />
            </Button>
          </div>
        </div>

        {/* Raccourcis Intelligents */}
        <div className="grid grid-cols-2 gap-3 text-left">
          <Link href="/dashboard">
            <Card className="p-3 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <LayoutDashboard size={18} />
                </div>
                <div>
                  <p className="font-bold text-sm">Dashboard</p>
                  <p className="text-[10px] text-slate-400">Vue d'ensemble</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/market">
            <Card className="p-3 hover:border-orange-300 hover:shadow-md transition-all cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <Home size={18} />
                </div>
                <div>
                  <p className="font-bold text-sm">Marketplace</p>
                  <p className="text-[10px] text-slate-400">
                    Voir les annonces
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-center gap-6 text-sm text-slate-500 pt-4">
          <Link
            href="#"
            className="hover:text-slate-900 flex items-center gap-1"
          >
            <HelpCircle size={14} /> Centre d'aide
          </Link>
          <Link
            href="#"
            className="hover:text-slate-900 flex items-center gap-1"
          >
            <FileText size={14} /> Signaler un bug
          </Link>
        </div>
      </div>
    </div>
  );
}
