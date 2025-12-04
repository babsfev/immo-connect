import React from "react";

interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
}

export function DataTable<T extends { id: string | number }>({ data, columns }: DataTableProps<T>) {
  return (
    <div className="w-full overflow-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className={`px-4 py-3 ${col.className || ""}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
              {columns.map((col, idx) => (
                <td key={idx} className={`px-4 py-3 ${col.className || ""}`}>
                  {col.cell ? col.cell(item) : String(item[col.accessorKey as keyof T])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}