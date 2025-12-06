"use client";

import React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  error?: string | string[] | null;
}

export function ErrorMessage({ error, className, ...props }: ErrorMessageProps) {
  if (!error) return null;

  const message = Array.isArray(error) ? error[0] : error;

  return (
    <p
      className={cn(
        "text-[11px] font-medium text-red-600 flex items-center gap-1.5 mt-1.5 animate-in slide-in-from-top-1",
        className
      )}
      {...props}
    >
      <AlertCircle size={12} />
      {message}
    </p>
  );
}