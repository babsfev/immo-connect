import React from "react";
import { LucideIcon } from "lucide-react";
import Button from "@/components/ui/Button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center border border-dashed border-slate-200 rounded-2xl bg-slate-50/30">
      <div className="bg-white p-4 rounded-2xl shadow-sm mb-4 border border-slate-100 ring-4 ring-slate-50">
        <Icon size={28} className="text-slate-400" />
      </div>
      <h3 className="text-base font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-slate-500 text-sm max-w-xs mb-6 leading-relaxed">{description}</p>
      
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline" size="sm" className="bg-white shadow-sm hover:border-slate-300">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}