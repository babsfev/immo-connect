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

  // GESTION CLAVIER (Echap + Focus Trap)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      // 1. Fermeture Echap
      if (e.key === "Escape") onClose();

      // 2. Focus Trap (Garder la navigation dans la modale)
      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          // Shift + Tab : Si on est sur le premier, on va au dernier
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab : Si on est sur le dernier, on va au premier
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Bloque le scroll arrière
    }
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef} // Référence pour le Focus Trap
        className={cn(
          "bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 animate-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh] focus:outline-none",
          className
        )}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1} // Permet de donner le focus à la div elle-même
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 shrink-0">
          {title ? (
            <h2 id="modal-title" className="text-lg font-bold text-slate-900">{title}</h2>
          ) : (
            <div />
          )}

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-slate-100"
            aria-label="Fermer"
          >
            <X size={18}/>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto -mr-2 pr-2">
            {children}
        </div>
      </div>
    </div>
  );
}