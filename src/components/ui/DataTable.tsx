"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Loader2, SearchX } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState"; // Notre composant EmptyState

export interface Column<T> {
  header: React.ReactNode;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
  isLoading?: boolean;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
}

export function DataTable<T extends { id: string | number }>({ 
  data, 
  columns, 
  className,
  isLoading = false,
  onRowClick,
  emptyMessage = "Aucune donnée trouvée."
}: DataTableProps<T>) {

  // Squelette de chargement (Skeleton)
  if (isLoading) {
    return (
      <div className={cn("w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm", className)}>
        <div className="p-4 space-y-4">
           {[...Array(5)].map((_, i) => (
             <div key={i} className="flex items-center gap-4 animate-pulse">
                <div className="h-10 w-10 bg-slate-100 rounded-full shrink-0"></div>
                <div className="h-4 bg-slate-100 rounded w-1/4"></div>
                <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                <div className="h-4 bg-slate-100 rounded w-1/4"></div>
             </div>
           ))}
        </div>
      </div>
    );
  }

  // État Vide
  if (!isLoading && data.length === 0) {
    return (
      <div className={cn("rounded-2xl border border-slate-200 bg-white overflow-hidden", className)}>
         <EmptyState 
            icon={SearchX} 
            title="C'est vide ici" 
            description={emptyMessage} 
         />
      </div>
    );
  }

  return (
    <div className={cn("w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all", className)}>
      <div className="overflow-x-auto custom-scrollbar"> 
        <table className="w-full text-sm text-left whitespace-nowrap"> 
          
          {/* En-tête */}
          <thead className="bg-slate-50/50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className={cn("px-6 py-4 font-semibold select-none", col.className)}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          
          {/* Corps */}
          <tbody className="divide-y divide-slate-100">
            {data.map((item) => (
              <tr 
                key={item.id} 
                onClick={() => onRowClick && onRowClick(item)}
                className={cn(
                  "group transition-colors",
                  onRowClick ? "cursor-pointer hover:bg-slate-50" : "hover:bg-slate-50/50"
                )}
              >
                {columns.map((col, idx) => (
                  <td key={idx} className={cn("px-6 py-4", col.className)}>
                    {col.cell ? col.cell(item) : String(item[col.accessorKey as keyof T] || "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}