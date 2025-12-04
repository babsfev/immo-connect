"use client";

import React, { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  leftIcon?: React.ComponentType<{ size?: number }>;
  errorMessage?: string | undefined;
  label?: string;
  wrapperClassName?: string;
};

export default function Input({
  leftIcon: LeftIcon,
  errorMessage,
  label,
  wrapperClassName,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <div className={cn("w-full", wrapperClassName)}>
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold text-slate-700 uppercase tracking-wide ml-1">
          {label}
        </label>
      )}

      <div className="relative mt-2">
        {LeftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <LeftIcon size={16} />
          </span>
        )}

        <input
          id={inputId}
          {...props}
          className={cn(
            "w-full h-12 rounded-lg px-3 text-sm placeholder:text-slate-400 focus:outline-none",
            LeftIcon ? "pl-10" : "pl-3",
            errorMessage ? "border border-red-100 bg-red-50" : "border border-slate-200 bg-white",
            className
          )}
          aria-invalid={!!errorMessage}
          aria-describedby={errorMessage ? `${inputId}-error` : undefined}
        />
      </div>

      {errorMessage && (
        <p id={`${inputId}-error`} role="alert" className="text-xs text-red-600 mt-1">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
