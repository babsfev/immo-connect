import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string; // Si pas de href, c'est la page active
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center text-sm text-slate-500 mb-6">
      <Link href="/dashboard" className="hover:text-blue-600 transition-colors p-1 rounded-md hover:bg-slate-100">
        <Home size={16} />
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight size={14} className="mx-2 text-slate-300" />
          {item.href ? (
            <Link href={item.href} className="hover:text-blue-600 transition-colors hover:underline font-medium">
              {item.label}
            </Link>
          ) : (
            <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md text-xs">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}