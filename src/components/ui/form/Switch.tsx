"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SwitchProps {
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export function Switch({
  name,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  label,
  className,
}: SwitchProps) {
  // Gestion interne de l'état si non contrôlé
  const [isChecked, setIsChecked] = React.useState(defaultChecked || false);

  // Synchronisation si contrôlé
  React.useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [checked]);

  const handleToggle = () => {
    if (disabled) return;
    const newValue = !isChecked;
    setIsChecked(newValue);
    onCheckedChange?.(newValue);
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Input caché pour les formulaires HTML */}
      <input type="hidden" name={name} value={isChecked ? "on" : "off"} />

      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        onClick={handleToggle}
        disabled={disabled}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          isChecked ? "bg-slate-900" : "bg-slate-200"
        )}
      >
        <span
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
            isChecked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
      
      {label && (
        <span 
            onClick={handleToggle}
            className={cn("text-sm font-medium cursor-pointer select-none", disabled ? "text-slate-400" : "text-slate-700")}
        >
          {label}
        </span>
      )}
    </div>
  );
}