"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string | string[];
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    
    // Gestion propre de l'erreur (string ou tableau)
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
        
        <textarea
          className={cn(
            "flex min-h-20 w-full rounded-xl border bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-none",
            hasError 
              ? "border-red-300 focus-visible:ring-red-500/20 focus-visible:border-red-500 text-red-900" 
              : "border-slate-200 focus-visible:border-blue-500 focus-visible:ring-blue-500/20 hover:border-slate-300",
            className
          )}
          ref={ref}
          {...props}
        />

        {hasError && (
            <p className="text-[11px] font-medium text-red-600 animate-in slide-in-from-top-1">
               {errorMessage}
            </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

// 👇 C'EST ICI QUE ÇA SE JOUE : Export nommé !
export { Textarea };