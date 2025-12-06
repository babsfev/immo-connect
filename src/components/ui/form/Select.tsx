"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Search, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ElementType;
}

interface SelectProps {
  name: string;
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  defaultValue?: string;
  error?: string;
  searchable?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function Select({
  name,
  label,
  options,
  placeholder = "Sélectionner...",
  defaultValue = "",
  error,
  searchable = false,
  onChange,
  disabled = false,
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === selected);
  
  // Filtrage intelligent
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    setSearch("");
    onChange?.(value);
  };

  return (
    <div className={cn("space-y-1.5 w-full", className)} ref={containerRef}>
      
      {/* Label identique à Input.tsx */}
      {label && (
        <label className={cn(
          "text-xs font-bold uppercase tracking-wider block",
          error ? "text-red-600" : "text-slate-500"
        )}>
          {label}
        </label>
      )}

      {/* Input caché pour les formulaires HTML/Server Actions */}
      <input type="hidden" name={name} value={selected} />

      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={cn(
            "flex items-center justify-between w-full h-11 rounded-xl border px-3 py-2 text-sm transition-all outline-none",
            isOpen ? "border-slate-900 ring-2 ring-slate-900/10" : "border-slate-200 hover:border-slate-300",
            disabled && "opacity-50 cursor-not-allowed bg-slate-50",
            error && "border-red-300 focus:border-red-500 text-red-900 bg-red-50/5",
            !selected && "text-slate-400",
            "bg-white text-left"
          )}
        >
          <div className="flex items-center gap-2.5 truncate">
            {selectedOption?.icon && (
              <selectedOption.icon size={16} className="text-slate-500 shrink-0" />
            )}
            <span className={cn("truncate", !selectedOption && "text-slate-400")}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>

          <ChevronDown
            size={16}
            className={cn("text-slate-400 shrink-0 transition-transform duration-200", isOpen && "rotate-180")}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-50 mt-1.5 w-full rounded-xl border border-slate-100 bg-white shadow-xl shadow-slate-200/50 animate-in fade-in zoom-in-95 duration-200 overflow-hidden ring-1 ring-slate-900/5">
            
            {(searchable || options.length > 6) && (
              <div className="p-2 border-b border-slate-50 bg-slate-50/50 sticky top-0">
                <div className="relative">
                  <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Filtrer..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                    className="w-full h-8 rounded-lg bg-white border border-slate-200 pl-8 pr-3 text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-slate-300"
                  />
                </div>
              </div>
            )}

            <div className="max-h-60 overflow-y-auto p-1.5 space-y-0.5 custom-scrollbar">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => (
                  <div
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors",
                      selected === opt.value
                        ? "bg-slate-900 text-white font-medium"
                        : "text-slate-700 hover:bg-slate-50"
                    )}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      {opt.icon && (
                        <opt.icon
                          size={16}
                          className={cn(selected === opt.value ? "text-white/70" : "text-slate-400")}
                        />
                      )}
                      <span className="truncate">{opt.label}</span>
                    </div>
                    {selected === opt.value && <Check size={14} className="text-white" />}
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-slate-400 italic">
                  Aucun résultat.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Message d'erreur */}
      {error && (
        <p className="text-[11px] font-medium text-red-600 flex items-center gap-1.5 animate-in slide-in-from-top-1">
           <span className="w-1 h-1 rounded-full bg-red-500 inline-block" /> 
           {error}
        </p>
      )}
    </div>
  );
}