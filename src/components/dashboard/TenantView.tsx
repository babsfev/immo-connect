"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { User, UserPlus } from "lucide-react";
import Button from "@/components/ui/Button";

type TenantItem = {
  id: string;
  name: string;
  property: string;
  status: string;
};

export function TenantView({ tenants }: { tenants: TenantItem[] }) {
  return (
    <Card className="h-full border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <CardHeader className="pb-3 border-b border-slate-50">
        <CardTitle className="text-base flex justify-between items-center">
            <span className="font-bold text-slate-800 flex items-center gap-2">
                <User size={18} className="text-blue-500"/> Derniers Locataires
            </span>
            <Link href="/tenants" className="text-xs font-medium text-blue-600 hover:underline">Voir tout</Link>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0 flex-1 overflow-y-auto custom-scrollbar">
        {tenants && tenants.length > 0 ? (
            <div className="divide-y divide-slate-50">
                {tenants.map((tenant) => (
                    <div key={tenant.id} className="flex items-center justify-between group py-3 hover:bg-slate-50 transition-colors px-1 -mx-1 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="h-9 w-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold text-xs group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                {tenant.name.charAt(0)}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900 leading-none group-hover:text-blue-700 transition-colors">{tenant.name}</p>
                                <p className="text-xs text-slate-500 mt-1 truncate max-w-[120px]">{tenant.property}</p>
                            </div>
                        </div>
                        <Badge variant={tenant.status === "À jour" ? "success" : "secondary"} size="sm" dot>
                            {tenant.status}
                        </Badge>
                    </div>
                ))}
            </div>
        ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-8 text-slate-400">
                <div className="bg-slate-50 p-3 rounded-full mb-2">
                    <UserPlus size={24} className="opacity-50"/>
                </div>
                <p className="text-sm font-medium text-slate-600">Aucun locataire</p>
                <p className="text-xs mb-4">Commencez par ajouter un dossier.</p>
                <Link href="/tenants">
                    <Button size="sm" variant="outline">Ajouter</Button>
                </Link>
            </div>
        )}
      </CardContent>
    </Card>
  );
}