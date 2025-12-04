import React from "react";
import { AlertCircle } from "lucide-react";

export function ErrorMessage({ message }: { message?: string }) {
  if (!message) return null;
  
  return (
    <p className="text-[11px] font-medium text-red-500 flex items-center gap-1 mt-1.5 animate-in slide-in-from-top-1">
      <AlertCircle size={12} /> {message}
    </p>
  );
}