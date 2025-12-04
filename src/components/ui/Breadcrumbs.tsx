import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center text-sm text-slate-500 mb-4">
      <Link href="/dashboard" className="hover:text-blue-600 transition-colors">
        <Home size={14} />
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight size={14} className="mx-2 text-slate-300" />
          {item.href ? (
            <Link href={item.href} className="hover:text-blue-600 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-slate-900">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}