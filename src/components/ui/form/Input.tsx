"use client";

import React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | string[];
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, icon, rightIcon, ...props }, ref) => {
    
    const errorMessage = Array.isArray(error) ? error[0] : error;
    const hasError = !!errorMessage;

    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <label 
            htmlFor={props.id || props.name}
            className={cn(
              "text-xs font-bold uppercase tracking-wider transition-colors",
              hasError ? "text-red-600" : "text-slate-500"
            )}
          >
            {label}
          </label>
        )}

        <div className="relative group">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-500 pointer-events-none">
              {icon}
            </div>
          )}

          <input
            type={type}
            className={cn(
              "flex h-11 w-full rounded-xl border bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
              icon && "pl-10",
              rightIcon || hasError ? "pr-10" : "",
              hasError 
                ? "border-red-300 focus-visible:ring-red-500/20 focus-visible:border-red-500 text-red-900 placeholder:text-red-300" 
                : "border-slate-200 focus-visible:border-blue-500 focus-visible:ring-blue-500/20 hover:border-slate-300",
              className
            )}
            ref={ref}
            {...props}
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {hasError ? (
              <AlertCircle className="h-5 w-5 text-red-500 animate-in zoom-in spin-in-90 duration-300" />
            ) : rightIcon ? (
              <div className="text-slate-400">{rightIcon}</div>
            ) : null}
          </div>
        </div>

        {hasError && (
            <p className="text-[11px] font-medium text-red-600 flex items-center gap-1.5 pt-1 animate-in slide-in-from-top-1">
               {errorMessage}
            </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input }; // Export nommé CRUCIAL
export default Input; // Export par défaut AJOUTÉ pour compatibilité maximale (pour sauver les meubles)