"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "success";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Button({
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props
}: ButtonProps) {
  
  // Configuration des styles
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 active:scale-95 disabled:opacity-70 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20 focus:ring-slate-900",
    secondary: "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm focus:ring-slate-200",
    outline: "border-2 border-slate-200 text-slate-600 hover:border-slate-900 hover:text-slate-900 bg-transparent",
    ghost: "text-slate-500 hover:text-slate-900 hover:bg-slate-100",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20 focus:ring-red-500",
    success: "bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-600/20 focus:ring-green-600",
  };

  const sizes = {
    sm: "h-9 px-3 text-xs gap-2",
    md: "h-11 px-5 text-sm gap-2.5",
    lg: "h-14 px-8 text-base gap-3",
    icon: "h-11 w-11 p-0", // Carré pour les icônes seules
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        isLoading && "cursor-wait opacity-80",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Loader Automatique */}
      {isLoading && (
        <Loader2 className="animate-spin -ml-1" size={size === "sm" ? 14 : 18} />
      )}

      {/* Gestion intelligente des icônes et du contenu */}
      {!isLoading && leftIcon}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
}