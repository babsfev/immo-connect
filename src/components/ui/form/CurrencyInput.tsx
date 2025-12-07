"use client";

import React, { useState, useEffect } from "react";
import { Input } from "./Input"; // Assurez-vous que Input a bien un export nommé { Input }

interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  currency?: string;
  label?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValueChange?: (value: number) => void;
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ className, currency = "FCFA", onChange, onValueChange, value, error, ...props }, ref) => {
    
    const [displayValue, setDisplayValue] = useState(value?.toString() || "");

    useEffect(() => {
        if (value !== undefined) setDisplayValue(value.toString());
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setDisplayValue(val);
        
        if (onChange) onChange(e);
        
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
            type="number"
            error={error}
            rightIcon={<span className="text-slate-400 text-xs font-bold">{currency}</span>}
            className={className}
        />
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";

// 👇 IMPORTANT : Export par défaut
export default CurrencyInput;