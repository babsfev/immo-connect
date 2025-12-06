"use client";

import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  className
}: {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      {/* BACKDROP FLOU */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* CONTENU MODALE */}
      <div
        ref={modalRef}
        className={cn(
          "bg-white w-full max-w-lg rounded-3xl shadow-2xl shadow-slate-900/20 ring-1 ring-slate-900/5 relative flex flex-col max-h-[90vh] focus:outline-none animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 ease-out overflow-hidden",
          className
        )}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Header avec fond subtil */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          {title ? (
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h2>
          ) : <div />}

          <button
            onClick={onClose}
            className="p-2 -mr-2 rounded-full hover:bg-slate-200/50 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20}/>
          </button>
        </div>

        {/* Corps avec Scrollbar personnalisée */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {children}
        </div>
      </div>
    </div>
  );
}