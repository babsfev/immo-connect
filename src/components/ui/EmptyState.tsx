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
    <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
      <div className="bg-white p-4 rounded-full shadow-sm mb-4 border border-slate-100">
        <Icon size={32} className="text-slate-400" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm max-w-xs mb-6 leading-relaxed">{description}</p>
      
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline" className="bg-white hover:bg-slate-50">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}