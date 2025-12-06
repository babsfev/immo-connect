"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  Bot,
  TrendingUp,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  Copy,
  RefreshCw,
  FileText,
  Search,
  User,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {Input} from "@/components/ui/form/Input";
import { toast } from "sonner";

// Types
type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
  time: string;
  attachment?: string;
};

// --- CERVEAU ARTIFICIEL (Règles Logiques) ---
function getAIResponse(input: string) {
  const text = input.toLowerCase();

  const intents = [
    {
      keys: ["impayé", "retard", "dette", "payer"],
      reply:
        "Pour un impayé, la procédure est la suivante : 1. Relance amiable (J+5). 2. Mise en demeure (J+15). Voulez-vous que je génère le courrier ?",
      doc: "Modele_Lettre_Relance.pdf",
    },
    {
      keys: ["bail", "contrat", "signer", "location"],
      reply:
        "J'ai préparé un modèle de bail d'habitation conforme au droit sénégalais. Vous pouvez le télécharger ci-dessous.",
      doc: "Bail_Habitation_Standard.pdf",
    },
    {
      keys: ["travaux", "fuite", "plombier", "réparation"],
      reply:
        "C'est une urgence technique. Je vous recommande de contacter 'Plomberie Express' (noté 4.8/5) ou de créer un ticket de maintenance.",
      doc: null,
    },
    {
      keys: ["révision", "loyer", "prix", "marché"],
      reply:
        "Le marché aux Almadies est en hausse de +8%. Une révision de +15.000 FCFA semble justifiée à la prochaine échéance.",
      doc: "Etude_Marche_2025.pdf",
    },
    {
      keys: ["bonjour", "salut", "hello", "coucou"],
      reply:
        "Bonjour ! Je suis l'IA Immo-Connect. Je peux vous aider sur la gestion, le juridique ou la finance. Par quoi commençons-nous ?",
      doc: null,
    },
  ];

  const match = intents.find((i) => i.keys.some((k) => text.includes(k)));

  if (match) {
    return { content: match.reply, attachment: match.doc };
  }

  if (text.endsWith("?")) {
    return {
      content:
        "C'est une question intéressante. Je consulte la base de connaissances... (Simulation : Essayez 'bail' ou 'loyer' pour voir les documents).",
      attachment: null,
    };
  }

  return {
    content:
      "Je ne suis pas sûr de comprendre. Je peux vous aider sur les contrats, les loyers ou la maintenance.",
    attachment: null,
  };
}

export default function AIAdvisorPage() {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content:
        "Bonjour Jean ! Je suis prêt à analyser votre portefeuille. Une question sur vos locataires ou vos contrats ?",
      time: "09:00",
    },
  ]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;

    // Si on est sur mobile et que le menu est ouvert, on le ferme pour voir la réponse
    setShowInsights(false);

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(text);
      setIsTyping(false);

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: response.content,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        attachment: response.attachment || undefined,
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1200);
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col lg:flex-row gap-6 animate-in fade-in duration-500 overflow-hidden">
      {/* --- GAUCHE : INSIGHTS (ACCORDÉON MOBILE) --- */}
      <div
        className={`
            flex flex-col gap-4 transition-all duration-300 bg-slate-50 lg:bg-transparent rounded-xl lg:rounded-none border lg:border-none border-slate-200 lg:p-0
            ${
              showInsights
                ? "max-h-[40vh] p-4 shadow-lg"
                : "max-h-14 p-0 lg:max-h-full lg:w-1/3 overflow-hidden"
            }
         `}
      >
        {/* Bouton Déplier (Mobile Only) */}
        <button
          className="lg:hidden flex items-center justify-between w-full p-4 bg-white lg:bg-transparent font-bold text-slate-900"
          onClick={() => setShowInsights(!showInsights)}
        >
          <span className="flex items-center gap-2">
            <Sparkles size={16} className="text-purple-600" /> Suggestions IA
          </span>
          {showInsights ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {/* Contenu Scrollable */}
        <div
          className={`flex-col gap-4 overflow-y-auto ${
            showInsights ? "flex" : "hidden lg:flex"
          }`}
        >
          <div className="hidden lg:block mb-2">
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="text-purple-600 fill-purple-100" />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-purple-600 to-blue-600">
                Immo-Assistant
              </span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Analyse proactive de votre patrimoine.
            </p>
          </div>

          <Card className="bg-linear-to-br from-blue-50 to-white border-blue-100 hover:border-blue-300 transition-all cursor-pointer group shadow-sm shrink-0">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm text-blue-800 font-bold">
                <TrendingUp size={16} /> Opportunité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-3">
                Le loyer moyen aux <strong>Almadies</strong> a augmenté. Votre
                bien "Studio Meublé" est éligible à une révision.
              </p>
              <Button
                size="sm"
                className="w-full bg-white border border-blue-200 text-blue-700 hover:bg-blue-50"
                onClick={() =>
                  handleSend("Comment réviser le loyer du Studio ?")
                }
              >
                Simuler révision
              </Button>
            </CardContent>
          </Card>

          <div className="mt-2 shrink-0">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Prompts Rapides
            </p>
            <div className="flex flex-col gap-2">
              {[
                { icon: FileText, text: "Rédiger un bail" },
                { icon: Search, text: "Chercher un artisan" },
                { icon: AlertTriangle, text: "Gérer un impayé" },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(item.text)}
                  className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 hover:border-purple-300 hover:bg-purple-50/50 transition-all text-left group"
                >
                  <div className="p-1.5 bg-slate-100 rounded-lg group-hover:bg-white group-hover:text-purple-600 transition-colors">
                    <item.icon size={14} />
                  </div>
                  {item.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- DROITE : CHAT --- */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-xl flex flex-col overflow-hidden relative h-full min-h-0">
        <div className="p-4 border-b border-slate-100 bg-white/80 backdrop-blur z-10 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white shadow-lg">
              <Bot size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                Assistant Virtuel
              </p>
              <p className="text-[10px] text-slate-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>{" "}
                En ligne
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-400"
            onClick={() => setMessages([])}
          >
            <RefreshCw size={16} />
          </Button>
        </div>

        <div
          className="flex-1 p-4 space-y-6 overflow-y-auto bg-slate-50/30 scroll-smooth"
          ref={scrollRef}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${
                msg.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center mt-1 shadow-sm ${
                  msg.role === "ai"
                    ? "bg-white border border-slate-200 text-purple-600"
                    : "bg-slate-900 text-white"
                }`}
              >
                {msg.role === "ai" ? (
                  <Sparkles size={14} />
                ) : (
                  <User size={14} />
                )}
              </div>
              <div className={`max-w-[85%] lg:max-w-[70%] space-y-2`}>
                <div
                  className={`p-3.5 rounded-2xl shadow-sm text-sm leading-relaxed ${
                    msg.role === "ai"
                      ? "bg-white border border-slate-100 text-slate-700 rounded-tl-none"
                      : "bg-slate-900 text-white rounded-tr-none"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.attachment && (
                  <div
                    className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:border-purple-300 cursor-pointer transition-colors"
                    onClick={() => toast.success("Document téléchargé")}
                  >
                    <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                      <FileText size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-800 truncate">
                        {msg.attachment}
                      </p>
                      <p className="text-xs text-slate-500">PDF • 120 KB</p>
                    </div>
                  </div>
                )}
                <p
                  className={`text-[10px] text-slate-400 ${
                    msg.role === "user" ? "text-right" : ""
                  }`}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-white border border-slate-200 text-purple-600 flex items-center justify-center">
                <Sparkles size={14} />
              </div>
              <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none flex gap-1 w-14 items-center justify-center">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
        </div>

        <div className="p-3 bg-white border-t border-slate-200 shrink-0">
          <form
            className="flex gap-2 items-end bg-slate-50 p-1.5 rounded-xl border border-slate-200 focus-within:ring-2 focus-within:ring-purple-100 transition-all"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <Input
              className="flex-1 bg-transparent border-none shadow-none focus:ring-0 text-sm h-10 px-3 resize-none"
              placeholder="Posez une question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              type="submit"
              size="icon"
              className={`h-10 w-10 rounded-lg transition-all ${
                input.trim()
                  ? "bg-purple-600 text-white"
                  : "bg-slate-200 text-slate-400"
              }`}
              disabled={!input.trim() || isTyping}
            >
              <Send size={16} className={input.trim() ? "ml-0.5" : ""} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
