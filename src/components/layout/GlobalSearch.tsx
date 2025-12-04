"use client";

import React, { useState, useEffect } from "react";
import { Search, Building2, Users, FileText, ArrowRight } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import Input from "@/components/ui/form/Input";
import { useRouter } from "next/navigation";

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  // Raccourci clavier (Ctrl+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (!isOpen) onClose(); // En fait, ça devrait être onOpen, géré par le parent
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isOpen, onClose]);

  const handleNavigate = (path: string) => {
    onClose();
    router.push(path);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Recherche Rapide">
      <div className="space-y-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <Input
            placeholder="Tapez 'Villa', 'Moussa', 'Facture'..."
            className="pl-10 bg-slate-50 border-none focus:ring-2 focus:ring-blue-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
            Raccourcis
          </p>

          <div
            onClick={() => handleNavigate("/properties")}
            className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-lg cursor-pointer group transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-md">
                <Building2 size={16} />
              </div>
              <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">
                Mes Biens
              </span>
            </div>
            <ArrowRight
              size={14}
              className="text-slate-300 group-hover:text-blue-500"
            />
          </div>

          <div
            onClick={() => handleNavigate("/tenants")}
            className="flex items-center justify-between p-3 hover:bg-orange-50 rounded-lg cursor-pointer group transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 text-orange-600 rounded-md">
                <Users size={16} />
              </div>
              <span className="text-sm font-medium text-slate-700 group-hover:text-orange-700">
                Mes Locataires
              </span>
            </div>
            <ArrowRight
              size={14}
              className="text-slate-300 group-hover:text-orange-500"
            />
          </div>

          <div
            onClick={() => handleNavigate("/documents")}
            className="flex items-center justify-between p-3 hover:bg-green-50 rounded-lg cursor-pointer group transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 text-green-600 rounded-md">
                <FileText size={16} />
              </div>
              <span className="text-sm font-medium text-slate-700 group-hover:text-green-700">
                Documents
              </span>
            </div>
            <ArrowRight
              size={14}
              className="text-slate-300 group-hover:text-green-500"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
