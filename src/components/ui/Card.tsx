import React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        // Base
        "relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white",
        // Ombre douce et colorée
        "shadow-sm shadow-slate-200/50",
        // Interaction : Lève légèrement + Ombre bleue très subtile
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-200",
        className
      )}
      {...props}
    >
      {/* Petit éclat lumineux en haut à droite (Esthétique) */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 rounded-full bg-gradient-to-br from-blue-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />
      {props.children}
    </div>
  )
);
Card.displayName = "Card";

// ... (Garde CardHeader, CardTitle, etc. comme avant, ils sont très bien)
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-lg font-bold leading-none tracking-tight text-slate-900", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-slate-500", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };