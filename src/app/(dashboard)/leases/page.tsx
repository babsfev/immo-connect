import React from "react";
import { FileText, Search, Filter, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";
import { getLeases } from "@/app/data/leases";

export default async function LeasesPage() {
  const leases = await getLeases();

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Contrats & Baux</h1>
          <p className="text-slate-500">Gestion des {leases.length} contrats locatifs.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline"><Filter size={16} className="mr-2"/> Filtrer</Button>
           <Button variant="ghost"><Search size={16}/></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
         {leases.length === 0 ? (
            <div className="p-12 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
               <FileText size={32} className="mx-auto mb-3 opacity-50"/>
               <p>Aucun contrat enregistré.</p>
            </div>
         ) : (
            leases.map(lease => (
               <Card key={lease.id} className="p-4 hover:border-blue-300 transition-all cursor-pointer group">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                     
                     <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                           <FileText size={20}/>
                        </div>
                        <div>
                           <h4 className="font-bold text-slate-900">{lease.property}</h4>
                           <p className="text-sm text-slate-500">Locataire : {lease.tenant}</p>
                        </div>
                     </div>

                     <div className="flex items-center gap-6 text-sm text-slate-600">
                        <div>
                           <span className="block text-[10px] text-slate-400 uppercase font-bold">Loyer</span>
                           <span className="font-mono font-bold">{formatCurrency(lease.rent)}</span>
                        </div>
                        <div className="hidden md:block">
                           <span className="block text-[10px] text-slate-400 uppercase font-bold">Fin Bail</span>
                           <span>{lease.endDate}</span>
                        </div>
                        <div>
                           {lease.daysLeft < 30 && lease.status === 'ACTIVE' ? (
                              <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                                 Expire bientôt
                              </Badge>
                           ) : (
                              <Badge variant={lease.status === 'ACTIVE' ? 'success' : 'secondary'}>
                                 {lease.status}
                              </Badge>
                           )}
                        </div>
                     </div>

                  </div>
               </Card>
            ))
         )}
      </div>
    </div>
  );
}