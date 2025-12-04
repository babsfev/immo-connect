import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { MessageCircle, User } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function InboxWidget() {
  const messages = [
    { id: 1, from: "Moussa Diop", subject: "Question quittance de novembre", time: "10:30", unread: true },
    { id: 2, from: "Fatou Sow", subject: "Problème digicode entrée", time: "Hier", unread: false },
    { id: 3, from: "Agence Senelec", subject: "Facture Communs", time: "20 Nov", unread: false },
  ];

  return (
    <Card className="h-full flex flex-col border-slate-200 shadow-sm">
      <CardHeader className="pb-3 border-b border-slate-50">
        <CardTitle className="flex justify-between items-center text-base">
          <div className="flex items-center gap-2 text-slate-800">
             <MessageCircle size={18} className="text-blue-600" /> Messagerie
          </div>
          <Badge variant="danger" className="rounded-full px-1.5 py-0 h-5 min-w-5 flex items-center justify-center text-[10px]">1</Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto pr-1 pt-3 space-y-1">
         {messages.map((msg) => (
            <div key={msg.id} className={`p-3 rounded-xl cursor-pointer transition-all flex gap-3 group ${msg.unread ? "bg-blue-50 border border-blue-100" : "hover:bg-slate-50 border border-transparent"}`}>
               <div className="relative">
                  <div className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold ${msg.unread ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-white"}`}>
                     {msg.from.charAt(0)}
                  </div>
                  {msg.unread && <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-orange-500 border-2 border-white rounded-full"></span>}
               </div>
               
               <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                     <p className={`text-xs truncate ${msg.unread ? "font-bold text-slate-900" : "font-medium text-slate-700"}`}>{msg.from}</p>
                     <span className="text-[9px] text-slate-400">{msg.time}</span>
                  </div>
                  <p className={`text-xs truncate ${msg.unread ? "text-slate-600" : "text-slate-400"}`}>{msg.subject}</p>
               </div>
            </div>
         ))}
         
         <button className="w-full text-center text-xs text-blue-600 hover:underline pt-2 mt-2 border-t border-slate-50">
            Voir tous les messages
         </button>
      </CardContent>
    </Card>
  );
}