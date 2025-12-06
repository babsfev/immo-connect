"use client";

import React, { useState, useEffect } from "react";
import Button from "./Button";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfirmButtonProps extends React.ComponentProps<typeof Button> {
  onConfirm: () => void;
  confirmLabel?: string;
  isDeleting?: boolean;
}

export function ConfirmButton({ onConfirm, confirmLabel = "Confirmer ?", isDeleting, className, ...props }: ConfirmButtonProps) {
  const [step, setStep] = useState<"idle" | "confirm">("idle");

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (step === "confirm") {
      timeout = setTimeout(() => setStep("idle"), 3000); // Reset auto après 3s
    }
    return () => clearTimeout(timeout);
  }, [step]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation(); // Important pour ne pas déclencher le clic de la carte parente

    if (step === "idle") {
      setStep("confirm");
    } else {
      onConfirm();
      // On ne repasse pas à idle tout de suite pour laisser le loader apparaître si géré par le parent
    }
  };

  if (step === "confirm" || isDeleting) {
    return (
      <Button 
        variant="danger" 
        size="sm" 
        onClick={handleClick} 
        disabled={isDeleting}
        className={cn("animate-in zoom-in duration-200 min-w-[100px]", className)}
        {...props}
      >
        {isDeleting ? (
           <Loader2 size={16} className="animate-spin" />
        ) : (
           <>
             <AlertTriangle size={16} className="mr-1.5" />
             {confirmLabel}
           </>
        )}
      </Button>
    );
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={handleClick} 
      className={cn("text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors", className)}
      title="Supprimer"
      {...props}
    >
      <Trash2 size={18} />
    </Button>
  );
}