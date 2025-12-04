import React from "react";
import { Badge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { MoreHorizontal } from "lucide-react";
import { formatCurrency } from "@/lib/utils"; // CORRECTION : Import de la nouvelle fonction

// Définition simple des colonnes compatible avec notre DataTable
export const paymentColumns = [
  {
    header: "Locataire",
    accessorKey: "tenant" as const,
    className: "font-medium text-slate-900"
  },
  {
    header: "Bien",
    accessorKey: "property" as const,
    className: "text-slate-500 hidden sm:table-cell"
  },
  {
    header: "Date",
    accessorKey: "date" as const,
    className: "text-slate-500"
  },
  {
    header: "Montant",
    accessorKey: "amount" as const,
    // CORRECTION : Utilisation de formatCurrency
    cell: (item: any) => (
      <span className="font-bold">
        {formatCurrency(item.amount)}
      </span>
    )
  },
  {
    header: "Statut",
    accessorKey: "status" as const,
    cell: (item: any) => {
      let variant: "success" | "warning" | "danger" = "success";
      if (item.status === "Retard") variant = "warning";
      if (item.status === "Impayé") variant = "danger";
      
      return <Badge variant={variant}>{item.status}</Badge>;
    }
  },
  {
    header: "Actions",
    className: "text-right",
    cell: () => (
      <div className="text-right">
        <Button variant="ghost" size="sm"><MoreHorizontal size={16} /></Button>
      </div>
    )
  }
];