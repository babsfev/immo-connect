import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "danger" | "info" | "brand" | "auto";
  size?: "sm" | "md"; // Ajout de la prop size
  dot?: boolean;
}

const STATUS_CONFIG: Record<string, { color: string; dot: string }> = {
  // Positif
  "Payé": { color: "bg-green-50 text-green-700 border-green-200 ring-green-600/20", dot: "bg-green-500" },
  "À jour": { color: "bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-600/20", dot: "bg-emerald-500" },
  "Loué": { color: "bg-blue-50 text-blue-700 border-blue-200 ring-blue-600/20", dot: "bg-blue-500" },
  
  // Attention
  "En attente": { color: "bg-amber-50 text-amber-700 border-amber-200 ring-amber-600/20", dot: "bg-amber-500 animate-pulse" },
  "Retard": { color: "bg-rose-50 text-rose-700 border-rose-200 ring-rose-600/20", dot: "bg-rose-500 animate-pulse" },
  "Partiel": { color: "bg-yellow-50 text-yellow-700 border-yellow-200 ring-yellow-600/20", dot: "bg-yellow-500" },
  
  // Critique
  "Impayé": { color: "bg-red-50 text-red-700 border-red-200 ring-red-600/20", dot: "bg-red-500" },
};

function Badge({ className, variant = "default", size = "md", dot = false, children, ...props }: BadgeProps) {
  let computedClass = "";
  let dotColor = "";

  if (variant === "auto" && typeof children === "string") {
    const key = Object.keys(STATUS_CONFIG).find(k => children.includes(k));
    if (key) {
      computedClass = STATUS_CONFIG[key].color;
      dotColor = STATUS_CONFIG[key].dot;
    } else {
      computedClass = "bg-slate-100 text-slate-700 border-slate-200";
      dotColor = "bg-slate-400";
    }
  } else {
    const variants = {
      default: "bg-slate-900 text-white border-transparent shadow-sm",
      secondary: "bg-slate-100 text-slate-900 border-slate-200",
      outline: "bg-transparent text-slate-900 border-slate-200",
      success: "bg-green-50 text-green-700 border-green-200",
      warning: "bg-amber-50 text-amber-700 border-amber-200",
      danger: "bg-red-50 text-red-700 border-red-200",
      info: "bg-blue-50 text-blue-700 border-blue-200", // Ajout de la variante info
      brand: "bg-blue-600 text-white border-transparent shadow-sm shadow-blue-500/30",
      auto: "",
    };
    computedClass = variants[variant];
  }

  const sizes = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-0.5 text-xs",
  };

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 rounded-full border font-semibold transition-all duration-300",
      sizes[size], // Application de la taille
      computedClass,
      className
    )} {...props}>
      {(dot || variant === "auto") && dotColor && (
        <span className={cn("w-1.5 h-1.5 rounded-full", dotColor)} />
      )}
      {children}
    </div>
  );
}

export { Badge };