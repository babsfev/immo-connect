import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string; 
}

export function Breadcrumbs({ items, className }: { items: BreadcrumbItem[], className?: string }) {
  return (
    <nav className={cn("flex items-center text-sm mb-6 overflow-x-auto no-scrollbar", className)} aria-label="Breadcrumb">
      <Link 
        href="/dashboard" 
        className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all shrink-0"
        title="Retour au tableau de bord"
      >
        <Home size={16} />
      </Link>
      
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={index} className="flex items-center shrink-0 animate-in fade-in slide-in-from-left-2 duration-300" style={{ animationDelay: `${index * 50}ms` }}>
            <ChevronRight size={14} className="mx-2 text-slate-300" />
            
            {item.href && !isLast ? (
              <Link 
                href={item.href} 
                className="text-slate-500 hover:text-slate-900 hover:underline decoration-slate-300 underline-offset-4 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-bold text-slate-900 bg-white border border-slate-200 px-2.5 py-0.5 rounded-md shadow-sm text-xs tracking-wide">
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}