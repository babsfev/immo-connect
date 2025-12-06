"use client";

import React, { useState, useEffect } from "react";
import { Search, Home, User, FileText, ArrowRight, Command } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Raccourci Clavier (Ctrl+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        // Si fermé, on devrait l'ouvrir via un prop remonté, mais ici on gère l'état interne si besoin
        // Pour l'instant, on suppose que le parent gère l'ouverture
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleNavigate = (path: string) => {
    router.push(path);
    onClose();
  };

  // Résultats simulés (à connecter à une API de recherche réelle plus tard)
  const results = [
    { type: "Bien", title: "Villa Corniche", href: "/properties/1", icon: Home },
    { type: "Locataire", title: "Moussa Diop", href: "/tenants/1", icon: User },
    { type: "Document", title: "Bail #4402", href: "/documents/1", icon: FileText },
  ].filter(r => r.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="p-0 overflow-hidden max-w-xl bg-white/90 backdrop-blur-xl border-slate-200">
        {/* Champ de recherche style "Spotlight" */}
        <div className="flex items-center border-b border-slate-100 px-4 py-3">
            <Search className="mr-3 h-5 w-5 text-slate-400" />
            <input
                className="flex h-10 w-full rounded-md bg-transparent py-3 text-base outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Tapez une commande ou recherchez..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
            />
            <div className="hidden sm:flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                <span className="text-xs">ESC</span>
            </div>
        </div>

        {/* Liste des résultats */}
        <div className="max-h-[300px] overflow-y-auto p-2">
            {results.length > 0 ? (
                <div className="space-y-1">
                    {results.map((result, i) => (
                        <button
                            key={i}
                            onClick={() => handleNavigate(result.href)}
                            className="w-full flex items-center gap-3 px-3 py-3 text-sm text-slate-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors group text-left"
                        >
                            <div className="p-2 bg-slate-100 text-slate-500 rounded-md group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                <result.icon size={16} />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">{result.title}</p>
                                <p className="text-[10px] text-slate-400 uppercase tracking-wider">{result.type}</p>
                            </div>
                            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        </button>
                    ))}
                </div>
            ) : query ? (
                <div className="py-12 text-center text-sm text-slate-500">
                    Aucun résultat pour "{query}".
                </div>
            ) : (
                <div className="py-8 px-4">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-3">Suggestions</p>
                    <div className="flex gap-2">
                        <button onClick={() => handleNavigate('/properties/new')} className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-md text-xs font-medium text-slate-600 border border-slate-200 transition-colors">
                            + Nouveau Bien
                        </button>
                        <button onClick={() => handleNavigate('/payments')} className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-md text-xs font-medium text-slate-600 border border-slate-200 transition-colors">
                            Encaisser
                        </button>
                    </div>
                </div>
            )}
        </div>
        
        {/* Footer */}
        <div className="bg-slate-50 px-4 py-2 text-[10px] text-slate-400 border-t border-slate-100 flex justify-between">
            <span>Utilisez les flèches pour naviguer</span>
            <span className="flex items-center gap-1"><Command size={10}/> Immo-Connect</span>
        </div>
    </Modal>
  );
}