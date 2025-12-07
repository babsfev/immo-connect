"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search, Send, Paperclip, Phone, MoreVertical, CheckCircle2
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/form/Input";
import Button from "@/components/ui/Button";
import { useAction } from "@/hooks/use-action";
import { sendMessage } from "@/app/actions/messages";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Conversation = {
  id: string;
  name: string;
  lastMsg: string;
  time: Date;
  unread: boolean;
  avatar: string | null;
};

type Message = {
  id: string;
  content: string;
  createdAt: Date;
  userId: string;
  user: { firstName: string | null; lastName: string | null };
};

interface ChatInterfaceProps {
  conversations: Conversation[];
  currentUser: { id: string; role: string };
}

export function ChatInterface({ conversations: initialConvs, currentUser }: ChatInterfaceProps) {
  const [activeId, setActiveId] = useState<string>(initialConvs[0]?.id || "");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { execute, isPending } = useAction(sendMessage, {
    onSuccess: () => {
      setInputValue("");
      const newMsg = {
        id: Date.now().toString(),
        content: inputValue,
        createdAt: new Date(),
        userId: currentUser.id,
        user: { firstName: "Moi", lastName: "" }
      };
      setMessages(prev => [...prev, newMsg]);
      setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    },
    onError: () => toast.error("Erreur d'envoi")
  });

  const handleSend = () => {
    if (!inputValue.trim()) return;
    execute({ content: inputValue });
  };

  const activeConv = initialConvs.find(c => c.id === activeId);

  return (
    <div className="h-[calc(100vh-8rem)] grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* LISTE CONVERSATIONS */}
      <Card className="flex flex-col overflow-hidden border-slate-200 shadow-sm">
        <div className="p-4 border-b border-slate-100 bg-white">
          <Input
            placeholder="Rechercher..."
            icon={<Search size={16} />} // ✅ Syntaxe Correcte
            className="bg-slate-50 border-transparent focus:bg-white"
          />
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
          {initialConvs.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setActiveId(conv.id)}
              className={cn(
                "p-3 flex gap-3 cursor-pointer transition-all rounded-xl relative group",
                activeId === conv.id
                  ? "bg-slate-900 text-white shadow-md"
                  : "hover:bg-slate-50 text-slate-700"
              )}
            >
              <div className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border-2",
                activeId === conv.id ? "bg-white/10 border-transparent text-white" : "bg-blue-100 border-white text-blue-700"
              )}>
                {conv.name.slice(0, 2).toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className={cn("text-sm font-bold truncate", activeId === conv.id ? "text-white" : "text-slate-900")}>
                    {conv.name}
                  </h4>
                  <span className={cn("text-[10px]", activeId === conv.id ? "text-slate-400" : "text-slate-400")}>
                    {new Date(conv.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
                <p className={cn("text-xs truncate", activeId === conv.id ? "text-slate-300" : "text-slate-500")}>
                  {conv.lastMsg}
                </p>
              </div>
            </div>
          ))}
          {initialConvs.length === 0 && (
             <div className="p-8 text-center text-slate-400 text-xs">Aucune conversation.</div>
          )}
        </div>
      </Card>

      {/* ZONE DE CHAT */}
      <Card className="lg:col-span-2 flex flex-col overflow-hidden border-slate-200 shadow-md bg-white">
        {activeConv ? (
          <>
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white/80 backdrop-blur-sm z-10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 border border-slate-200">
                  {activeConv.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{activeConv.name}</h3>
                  <p className="text-[10px] text-green-600 flex items-center gap-1 font-medium bg-green-50 px-2 py-0.5 rounded-full w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    En ligne
                  </p>
                </div>
              </div>
              <div className="flex gap-1 text-slate-400">
                <Button variant="ghost" size="icon"><Phone size={18} /></Button>
                <Button variant="ghost" size="icon"><MoreVertical size={18} /></Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
              {/* Messages affichés ici */}
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex", msg.userId === currentUser.id ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "p-3 px-4 rounded-2xl max-w-sm text-sm shadow-sm relative pb-5",
                    msg.userId === currentUser.id 
                      ? "bg-slate-900 text-white rounded-tr-none" 
                      : "bg-white border border-slate-200 text-slate-700 rounded-tl-none"
                  )}>
                    {msg.content}
                    <div className="absolute bottom-1 right-3 flex items-center gap-1 opacity-70">
                        <span className="text-[9px]">{msg.createdAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={scrollRef} />
            </div>

            <div className="p-4 bg-white border-t border-slate-100">
              <div className="flex gap-3 items-end bg-slate-50 p-2 rounded-2xl border border-slate-200 focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-100 transition-all">
                <Button variant="ghost" size="icon" className="text-slate-400 mb-0.5"><Paperclip size={20} /></Button>
                
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  placeholder="Écrivez votre message..."
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm resize-none max-h-32 py-2.5 custom-scrollbar outline-none"
                  rows={1}
                />
                
                <Button 
                  onClick={handleSend}
                  disabled={isPending || !inputValue.trim()}
                  className={cn(
                    "rounded-xl h-10 w-10 p-0 flex items-center justify-center transition-all duration-300",
                    inputValue.trim() ? "bg-blue-600 text-white shadow-lg" : "bg-slate-200 text-slate-400"
                  )}
                >
                  <Send size={18} className={inputValue.trim() ? "ml-0.5" : ""} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
             <p>Sélectionnez une conversation pour commencer</p>
          </div>
        )}
      </Card>
    </div>
  );
}