"use client";
import React, { useState } from "react";
import {
  Search,
  Send,
  Paperclip,
  Phone,
  MoreVertical,
  Circle,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import Input from "@/components/ui/form/Input";
import Button from "@/components/ui/Button";

const conversations = [
  {
    id: 1,
    name: "Moussa Diop",
    lastMsg: "Est-ce que le plombier est passé ?",
    time: "10:30",
    unread: true,
    avatar: "MD",
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: 2,
    name: "Fatou Sow",
    lastMsg: "Merci pour la quittance !",
    time: "Hier",
    unread: false,
    avatar: "FS",
    color: "bg-green-100 text-green-700",
  },
  {
    id: 3,
    name: "Senelec Support",
    lastMsg: "Votre facture #4599 est disponible.",
    time: "20 Nov",
    unread: false,
    avatar: "S",
    color: "bg-orange-100 text-orange-700",
  },
];

export default function MessagesPage() {
  const [activeId, setActiveId] = useState(1);

  return (
    <div className="h-[calc(100vh-8rem)] grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* LISTE DES CONVERSATIONS */}
      <Card className="flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <Input
            placeholder="Rechercher un message..."
            leftIcon={Search}
            className="bg-slate-50"
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setActiveId(conv.id)}
              className={`p-4 flex gap-3 cursor-pointer transition-colors hover:bg-slate-50 ${
                activeId === conv.id
                  ? "bg-blue-50/50 border-l-4 border-blue-600"
                  : "border-l-4 border-transparent"
              }`}
            >
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${conv.color}`}
              >
                {conv.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h4
                    className={`text-sm truncate ${
                      conv.unread
                        ? "font-bold text-slate-900"
                        : "font-medium text-slate-700"
                    }`}
                  >
                    {conv.name}
                  </h4>
                  <span className="text-[10px] text-slate-400">
                    {conv.time}
                  </span>
                </div>
                <p
                  className={`text-xs truncate mt-0.5 ${
                    conv.unread
                      ? "text-slate-800 font-medium"
                      : "text-slate-500"
                  }`}
                >
                  {conv.lastMsg}
                </p>
              </div>
              {conv.unread && (
                <Circle size={8} className="text-blue-600 fill-blue-600 mt-2" />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* ZONE DE CHAT */}
      <Card className="lg:col-span-2 flex flex-col overflow-hidden border-slate-200 shadow-lg">
        {/* Header Chat */}
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">
              MD
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Moussa Diop</h3>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>{" "}
                En ligne
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Phone size={18} />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical size={18} />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
          <div className="flex justify-center">
            <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
              Aujourd'hui
            </span>
          </div>

          <div className="flex justify-end">
            <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-none max-w-sm text-sm">
              Bonjour Moussa, le plombier m'a confirmé son passage pour 14h.
            </div>
          </div>

          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 text-slate-700 p-3 rounded-2xl rounded-tl-none max-w-sm text-sm shadow-sm">
              Est-ce que le plombier est passé ? Je n'étais pas là.
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="flex gap-2 items-center">
            <Button variant="ghost" size="icon" className="text-slate-400">
              <Paperclip size={20} />
            </Button>
            <Input
              placeholder="Écrivez votre message..."
              className="flex-1 border-slate-200 bg-slate-50"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-10 w-10 p-0 flex items-center justify-center">
              <Send size={18} className="ml-0.5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
