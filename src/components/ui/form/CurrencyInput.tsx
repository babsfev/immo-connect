"use client";

import React, { useState, useEffect } from "react";
// Import nommé correct
import { Input } from "./Input"; 

interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  currency?: string;
  label?: string;
  error?: string;
  // On ajoute onChange compatible avec HTML standard pour éviter les conflits
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // Optionnel : un handler spécifique pour la valeur numérique
  onValueChange?: (value: number) => void;
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ className, currency = "FCFA", onChange, onValueChange, value, ...props }, ref) => {
    
    // Gestion locale pour l'affichage (si besoin)
    const [displayValue, setDisplayValue] = useState(value?.toString() || "");

    useEffect(() => {
        if (value !== undefined) setDisplayValue(value.toString());
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setDisplayValue(val);
        
        // Propager l'événement standard
        if (onChange) onChange(e);
        
        // Propager la valeur numérique
        if (onValueChange) {
            const num = parseFloat(val.replace(/[^0-9.-]+/g, ""));
            if (!isNaN(num)) onValueChange(num);
        }
    };

    return (
        <Input 
            {...props}
            value={displayValue}
            onChange={handleChange}
            ref={ref} 
            type="number" // Force le clavier numérique sur mobile
            rightIcon={<span className="text-slate-400 text-xs font-bold">{currency}</span>}
            className={className}
        />
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";

// Export par défaut pour faciliter l'import dans index.ts
export default CurrencyInput;