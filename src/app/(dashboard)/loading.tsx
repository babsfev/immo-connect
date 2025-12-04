import React from "react";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center min-h-[50vh]">
      <Loader2 size={40} className="text-blue-600 animate-spin mb-4" />
      <p className="text-slate-500 text-sm animate-pulse">Chargement des données...</p>
    </div>
  );
}