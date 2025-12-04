import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Styles de base (hauteur, padding, bordure, fond)
          "flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900",
          // Placeholder
          "placeholder:text-slate-400",
          // Focus (Anneau bleu/indigo selon ton thème)
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent",
          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-100",
          // Gestion des fichiers
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          // État d'erreur (Optionnel : bordure rouge si error={true})
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export default Input;