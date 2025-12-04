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

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  // Click outside
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
    <div className={cn("relative w-full", className)} ref={containerRef}>

      {label && (
        <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
          {label}
        </label>
      )}

      <input type="hidden" name={name} value={selected} />

      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between h-11 rounded-xl border bg-white px-3 py-2 text-sm cursor-pointer",
          isOpen ? "border-blue-500 ring-4 ring-blue-500/10" : "border-slate-200 hover:border-slate-300",
          disabled && "opacity-50 cursor-not-allowed bg-slate-50",
          error && "border-red-500 bg-red-50/10"
        )}
      >
        <div className="flex items-center gap-2 truncate">
          {selectedOption?.icon && (
            <selectedOption.icon size={16} className="text-slate-500" />
          )}
          <span className={cn(!selected && "text-slate-400")}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <ChevronDown
          size={16}
          className={cn("text-slate-400 transition-transform", isOpen && "rotate-180")}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-xl border border-slate-100 bg-white shadow-xl animate-in fade-in zoom-in-95 duration-100 overflow-hidden">

          {(searchable || options.length > 8) && (
            <div className="p-2 border-b bg-white sticky top-0">
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-9 rounded-lg bg-slate-50 pl-8 pr-3 text-sm outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          )}

          <div className="max-h-60 overflow-y-auto p-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer",
                    selected === opt.value
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-slate-700 hover:bg-slate-50"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {opt.icon && (
                      <opt.icon
                        size={16}
                        className={selected === opt.value ? "text-blue-500" : "text-slate-400"}
                      />
                    )}
                    {opt.label}
                  </div>
                  {selected === opt.value && <Check size={16} className="text-blue-600" />}
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-xs text-slate-400">
                Aucun résultat.
              </div>
            )}
          </div>
        </div>
      )}

      {error && (
        <p className="text-[11px] text-red-500 flex items-center gap-1 mt-1.5">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}
