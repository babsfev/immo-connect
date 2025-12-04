import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { MessageCircle, User } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function InboxWidget() {
  const messages = [
    { id: 1, from: "Moussa Diop", subject: "Question quittance", time: "10:30", unread: true },
    { id: 2, from: "Fatou Sow", subject: "Problème digicode", time: "Hier", unread: false },
    { id: 3, from: "Senelec", subject: "Facture Communs", time: "20 Nov", unread: false },
  ];

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-base">
          <div className="flex items-center gap-2">
             <MessageCircle size={18} className="text-blue-600" /> Messagerie
          </div>
          <Badge variant="default" className="rounded-full px-2">1</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto pr-2">
        <div className="space-y-1">
           {messages.map((msg) => (
              <div key={msg.id} className={`p-3 rounded-lg cursor-pointer transition-colors flex gap-3 ${msg.unread ? "bg-blue-50 border border-blue-100" : "hover:bg-slate-50 border border-transparent"}`}>
                 <div className="relative">
                    <div className="h-10 w-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500">
                       <User size={16}/>
                    </div>
                    {msg.unread && <span className="absolute top-0 right-0 w-3 h-3 bg-orange-500 border-2 border-white rounded-full"></span>}
                 </div>
                 <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                       <p className={`text-sm truncate ${msg.unread ? "font-bold text-slate-900" : "font-medium text-slate-700"}`}>{msg.from}</p>
                       <span className="text-[10px] text-slate-400">{msg.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{msg.subject}</p>
                 </div>
              </div>
           ))}
        </div>
      </CardContent>
    </Card>
  );
}