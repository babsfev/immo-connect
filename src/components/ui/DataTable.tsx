import React from "react";
import { cn } from "@/lib/utils";

// Définition générique d'une colonne
export interface Column<T> {
  header: React.ReactNode;
  accessorKey?: keyof T; // La clé de l'objet (ex: "amount")
  cell?: (item: T) => React.ReactNode; // Une fonction pour un rendu custom
  className?: string; // Pour le style CSS
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
}

// Le <T> rend ce composant compatible avec n'importe quel type de données
export function DataTable<T extends { id: string | number }>({ data, columns, className }: DataTableProps<T>) {
  return (
    // OPTIMISATION MOBILE : Le wrapper permet le scroll horizontal sur petit écran
    <div className={cn("w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm", className)}>
      <div className="overflow-x-auto"> 
        <table className="w-full text-sm text-left whitespace-nowrap"> 
          {/* En-tête */}
          <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className={cn("px-6 py-4 font-semibold", col.className)}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          
          {/* Corps */}
          <tbody className="divide-y divide-slate-100">
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                  {columns.map((col, idx) => (
                    <td key={idx} className={cn("px-6 py-4", col.className)}>
                      {/* Affiche le contenu personnalisé (cell) ou la valeur brute */}
                      {col.cell ? col.cell(item) : String(item[col.accessorKey as keyof T] || "")}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-400 italic">
                  Aucune donnée disponible.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}