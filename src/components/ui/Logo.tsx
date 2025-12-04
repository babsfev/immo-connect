"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: "color" | "white";
}

export function Logo({ className, showText = true, variant = "color" }: LogoProps) {
  const titleColorClass = variant === "white" ? "text-white" : "text-slate-900";

  return (
    <div className={cn("flex items-center gap-3 select-none", className)} style={{ height: 48 }}>
      <svg viewBox="0 0 500 500" fill="none" className="h-full w-auto shrink-0" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M250 50 L400 150 V350 L250 450 L100 350 V150 L250 50Z" fill={variant === "white" ? "#FFFFFF" : "#F97316"} stroke={variant === "white" ? "none" : "#F97316"} strokeWidth="20" />
        <path d="M180 400 L320 250 M180 300 L320 150" stroke={variant === "white" ? "#0F172A" : "#FFFFFF"} strokeWidth="30" strokeLinecap="round" />
      </svg>

      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <span className={`font-extrabold tracking-tight text-2xl ${titleColorClass}`}>IMMO</span>
          <span className="font-medium text-sm tracking-widest text-orange-500 uppercase">Connect</span>
        </div>
      )}
    </div>
  );
}
