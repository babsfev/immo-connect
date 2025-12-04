"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: "color" | "white";
  iconOnly?: boolean;
}

export function Logo({
  className,
  showText = true,
  variant = "color",
  iconOnly = false,
}: LogoProps) {
  // Couleurs officielles
  const HEX_BLUE = "#1d71b8";
  const HEX_ORANGE = "#e94e1b";

  const mainColor = variant === "white" ? "white" : HEX_BLUE;
  const titleColor = variant === "white" ? "text-white" : "text-slate-900";

  return (
    // IMPORTANT : C'est un DIV, pas un LINK.
    <div className={cn("flex items-center gap-2 select-none h-full", className)}>
      <svg
        viewBox="0 0 500 500"
        fill="none"
        className="h-full w-auto shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M250 50 L400 150 V350 L250 450 L100 350 V150 L250 50Z"
          fill={variant === "white" ? "white" : HEX_ORANGE}
          stroke={variant === "white" ? "none" : HEX_ORANGE}
          strokeWidth="20"
        />
        <path
          d="M180 400 L320 250 M180 300 L320 150"
          stroke={variant === "white" ? "#0F172A" : "white"}
          strokeWidth="30"
          strokeLinecap="round"
        />
      </svg>

      {!iconOnly && showText && (
        <div className="flex flex-col justify-center leading-none">
          <span className={cn("font-extrabold tracking-tight text-2xl uppercase", titleColor)}>
            IMMO
          </span>
          <span className={cn("font-medium text-sm tracking-wide -mt-1", "text-orange-500")}>
            Connect
          </span>
        </div>
      )}
    </div>
  );
}