"use client";

import React from "react";
import { cn } from "@/lib/utils";

// L'interface doit inclure hoverEffect et glass
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean; 
  glass?: boolean;       
}

export function Card({ className, hoverEffect = false, glass = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-sm overflow-hidden",
        // La classe magique qui manquait :
        hoverEffect && "transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-slate-300",
        glass && "bg-white/80 backdrop-blur-md border-white/20 shadow-xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 p-6 pb-2", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("font-bold leading-none tracking-tight text-lg", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-slate-500", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center p-6 pt-0 bg-slate-50/50 mt-auto border-t border-slate-100", className)} {...props} />;
}