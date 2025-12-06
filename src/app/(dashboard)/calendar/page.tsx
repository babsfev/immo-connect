import React from "react";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function CalendarPage() {
  const events = [
    { date: "2023-11-25", title: "Loyer M. Diop", type: "Paiement" },
    { date: "2023-11-28", title: "Fin de bail Mme Sow", type: "Contrat" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
       <h1 className="text-2xl font-bold text-slate-900">Calendrier</h1>
       
       <div className="space-y-4">
          {events.map((evt, i) => (
             <Card key={i} className="flex items-center p-4 gap-4">
                <div className="bg-blue-50 text-blue-600 p-3 rounded-xl font-bold text-center w-16">
                   <span className="block text-xs uppercase">{new Date(evt.date).toLocaleString('default', { month: 'short' })}</span>
                   <span className="text-xl">{new Date(evt.date).getDate()}</span>
                </div>
                <div>
                   <h3 className="font-bold text-slate-900">{evt.title}</h3>
                   <Badge variant="secondary" size="sm" className="mt-1">{evt.type}</Badge>
                </div>
             </Card>
          ))}
       </div>
    </div>
  );
}