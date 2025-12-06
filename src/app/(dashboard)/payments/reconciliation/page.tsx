"use client";

import React from "react";
import { UploadCloud, FileSpreadsheet } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function ReconciliationPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
       <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
          <FileSpreadsheet size={40} className="text-blue-600" />
       </div>
       <div>
          <h1 className="text-2xl font-bold text-slate-900">Import Bancaire</h1>
          <p className="text-slate-500 mt-2 max-w-md mx-auto">
             L'importation automatique des relevés bancaires (OFX/CSV) pour le lettrage des loyers sera disponible dans la prochaine mise à jour majeure.
          </p>
       </div>
       <Button disabled variant="outline" className="opacity-50 cursor-not-allowed">
          <UploadCloud size={18} className="mr-2"/> Fonctionnalité Bientôt Disponible
       </Button>
    </div>
  );
}