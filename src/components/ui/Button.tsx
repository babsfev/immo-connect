import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils"; // Ton helper pour fusionner les classes

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "default" | "sm" | "lg" | "icon";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", isLoading, children, ...props }, ref) => {
    
    // 1. Styles de base (communs à tous les boutons)
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-white";

    // 2. Définition des Variantes (Couleurs)
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md focus-visible:ring-blue-600",
      secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:ring-slate-500",
      outline: "border border-slate-200 bg-transparent hover:bg-slate-50 text-slate-700 focus-visible:ring-slate-500",
      ghost: "bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900",
      danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm focus-visible:ring-red-600",
    };

    // 3. Définition des Tailles
    const sizes = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-8 px-3 text-xs",
      lg: "h-12 px-8 text-base",
      icon: "h-10 w-10",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className // Permet de surcharger les styles si besoin
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;