import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "danger";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "border-transparent bg-blue-600 text-white hover:bg-blue-700",
    secondary: "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200",
    outline: "text-slate-900 border-slate-200",
    success: "border-transparent bg-green-100 text-green-700 hover:bg-green-200",
    warning: "border-transparent bg-orange-100 text-orange-700 hover:bg-orange-200",
    danger: "border-transparent bg-red-100 text-red-700 hover:bg-red-200",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };