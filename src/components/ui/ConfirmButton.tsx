"use client";
import React, { useState } from "react";
import Button from "./Button";
import { Trash2, AlertTriangle } from "lucide-react";

export function ConfirmButton({ onClick, children, ...props }: React.ComponentProps<typeof Button>) {
  const [step, setStep] = useState<"idle" | "confirm">("idle");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Empêche le submit si dans un form
    if (step === "idle") {
      setStep("confirm");
      // Reset automatique après 3 secondes si pas de clic
      setTimeout(() => setStep("idle"), 3000);
    } else {
      if (onClick) onClick(e);
      setStep("idle");
    }
  };

  if (step === "confirm") {
    return (
      <Button variant="danger" size="sm" onClick={handleClick} className="animate-in zoom-in duration-200">
        <AlertTriangle size={16} className="mr-2" />
        Confirmer ?
      </Button>
    );
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleClick} className="text-slate-400 hover:text-red-600 transition-colors" {...props}>
      <Trash2 size={18} />
    </Button>
  );
}