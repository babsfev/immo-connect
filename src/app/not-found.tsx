import React from "react";
import Link from "next/link";
import { MapPinOff, ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <div className="bg-blue-100 p-6 rounded-full mb-6">
        <MapPinOff size={48} className="text-blue-600" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-2">404</h1>
      <h2 className="text-xl font-semibold text-slate-700 mb-4">Page introuvable</h2>
      <p className="text-slate-500 max-w-md mb-8">
        Oups ! La propriété ou la page que vous recherchez semble avoir été retirée du marché ou n'existe pas.
      </p>
      <Link href="/dashboard">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <ArrowLeft size={18} className="mr-2" />
          Retour au Dashboard
        </Button>
      </Link>
    </div>
  );
}