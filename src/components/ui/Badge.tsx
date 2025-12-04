import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "danger" | "auto"; // Ajout de "auto"
}

// Dictionnaire d'intelligence
const STATUS_COLORS: Record<string, string> = {
  // Positif
  "Payé": "bg-green-100 text-green-700 border-green-200",
  "À jour": "bg-green-100 text-green-700 border-green-200",
  "Loué": "bg-green-100 text-green-700 border-green-200",
  "Signé": "bg-green-100 text-green-700 border-green-200",
  "Validé": "bg-green-100 text-green-700 border-green-200",
  
  // Attention
  "En attente": "bg-orange-100 text-orange-700 border-orange-200",
  "Travaux": "bg-orange-100 text-orange-700 border-orange-200",
  "Retard": "bg-orange-100 text-orange-700 border-orange-200",
  
  // Critique
  "Impayé": "bg-red-100 text-red-700 border-red-200",
  "Exprié": "bg-red-100 text-red-700 border-red-200",
  "Urgent": "bg-red-100 text-red-700 border-red-200",
  "Vacant": "bg-slate-100 text-slate-600 border-slate-200",
};

function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  let computedClass = "";

  // Si variant est "auto", le composant décide de la couleur selon le texte
  if (variant === "auto" && typeof children === "string") {
    // On cherche si le texte contient un mot clé (ex: "En retard (J+5)" -> contient "Retard")
    const key = Object.keys(STATUS_COLORS).find(k => children.includes(k));
    computedClass = key ? STATUS_COLORS[key] : "bg-slate-100 text-slate-700";
  } else {
    // Logique standard
    const variants = {
      default: "border-transparent bg-blue-600 text-white hover:bg-blue-700",
      secondary: "border-transparent bg-slate-100 text-slate-900",
      outline: "text-slate-900 border-slate-200",
      success: "border-transparent bg-green-100 text-green-700",
      warning: "border-transparent bg-orange-100 text-orange-700",
      danger: "border-transparent bg-red-100 text-red-700",
      auto: "", 
    };
    computedClass = variants[variant];
  }

  return (
    <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors", computedClass, className)} {...props}>
      {children}
    </div>
  );
}

export { Badge };