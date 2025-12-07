import React from "react";
import Link from "next/link";
import { Plus, UploadCloud } from "lucide-react";
import Button from "@/components/ui/Button";
import { getTenants } from "@/app/data/tenants";
import { TenantsTable } from "@/components/tenants/TenantsTable";

export default async function TenantsPage() {
  const tenants = await getTenants();

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mes Locataires</h1>
          <p className="text-slate-500">Gérez vos contrats ({tenants.length} actifs).</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white border-slate-200 text-slate-600">
            <UploadCloud size={18} className="mr-2" /> Importer
          </Button>
          <Link href="/tenants/new">
            <Button className="bg-slate-900 text-white shadow-lg hover:bg-slate-800">
               <Plus size={18} className="mr-2" /> Nouveau
            </Button>
          </Link>
        </div>
      </div>

      {/* LISTE (Gérée par le composant intelligent) */}
      <TenantsTable data={tenants} />
    </div>
  );
}