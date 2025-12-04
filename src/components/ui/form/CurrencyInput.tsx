"use client";

import React, { useState, useEffect } from "react";
import Input from "./Input"; // Ton Input de base
interface CurrencyInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  currency?: string;
  onValueChange?: (value: number) => void;
}

export function CurrencyInput({
  className,
  currency = "FCFA",
  onValueChange,
  value,
  ...props
}: CurrencyInputProps) {
  // On gère l'affichage (string formaté) séparément de la valeur réelle (number)
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    if (value !== undefined && value !== null) {
      setDisplayValue(new Intl.NumberFormat("fr-FR").format(Number(value)));
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 1. On garde que les chiffres
    const rawValue = e.target.value.replace(/\D/g, "");

    // 2. On remonte la vraie valeur numérique au parent
    if (onValueChange) {
      onValueChange(Number(rawValue));
    }

    // 3. On formate pour l'affichage (ex: 1 000 000)
    if (rawValue) {
      const formatted = new Intl.NumberFormat("fr-FR").format(Number(rawValue));
      setDisplayValue(formatted);
    } else {
      setDisplayValue("");
    }
  };

  return (
    <div className="relative">
      <Input
        {...props}
        type="text" // On utilise "text" pour permettre les espaces
        value={displayValue}
        onChange={handleChange}
        className={`${className} pr-12 font-mono font-bold tracking-wide`} // Police mono pour aligner les chiffres
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 pointer-events-none">
        {currency}
      </div>
    </div>
  );
}
