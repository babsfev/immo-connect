"use client";

import React from "react";
import Link from "next/link";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { MoreHorizontal, MessageCircle, Phone } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

// Type des données
type TenantRow = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  property: string;
  rent: number;
  status: string;
  joinedDate: string;
};

export function TenantsTable({ data }: { data: TenantRow[] }) {
  
  const columns: Column<TenantRow>[] = [
    {
      header: "Identité",
      cell: (row) => (
        <div className="flex items-center gap-3">
          {/* Avatar avec Initiales */}
          <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 border border-blue-200">
            {row.firstName[0]}{row.lastName[0]}
          </div>
          <div>
            <div className="font-bold text-slate-900">{row.firstName} {row.lastName}</div>
            <div className="text-xs text-slate-500">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Bien Loué",
      accessorKey: "property",
      className: "hidden sm:table-cell text-slate-600 font-medium",
    },
    {
      header: "Loyer",
      className: "hidden md:table-cell font-mono text-slate-600",
      cell: (row) => formatCurrency(row.rent),
    },
    {
      header: "Contact",
      className: "hidden lg:table-cell",
      cell: (row) => (
         <div className="flex gap-2">
            <a href={`tel:${row.phone}`} className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
               <Phone size={14} />
            </a>
            <a href={`https://wa.me/${row.phone.replace(/\s/g,'')}`} target="_blank" className="p-1.5 rounded-md hover:bg-green-50 text-slate-400 hover:text-green-600 transition-colors">
               <MessageCircle size={14} />
            </a>
         </div>
      )
    },
    {
      header: "Statut",
      cell: (row) => (
        <Badge variant={row.status === "En cours" ? "success" : "secondary"} size="sm" dot>
          {row.status}
        </Badge>
      ),
    },
    {
      header: <div className="text-right">Actions</div>,
      className: "text-right",
      cell: (row) => (
        <div className="flex justify-end">
          <Link href={`/tenants/${row.id}`}>
             <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-blue-600">
                <MoreHorizontal size={16} />
             </Button>
          </Link>
        </div>
      ),
    },
  ];

  return <DataTable data={data} columns={columns} emptyMessage="Aucun locataire trouvé." />;
}