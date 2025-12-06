"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// --- CONFIGURATION ---
// Mettez à true quand vous aurez le fichier (ex: public/logo.png)
const USE_REAL_LOGO_FILE = false; 
const LOGO_FILE_PATH = "/logo.png"; // Placez votre fichier dans le dossier public

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
  
  // Si on a le vrai fichier logo, on l'affiche
  if (USE_REAL_LOGO_FILE) {
    return (
      <div className={cn("relative flex items-center h-full select-none", className)}>
        <Image 
          src={LOGO_FILE_PATH} 
          alt="Immo-Connect Logo" 
          width={150} // Ajustez selon la taille réelle
          height={50}
          className={cn(
            "h-full w-auto object-contain",
            // Si variante blanche, on peut appliquer un filtre CSS (brightness)
            variant === "white" && "brightness-0 invert" 
          )}
          priority
        />
      </div>
    );
  }

  // SINON : On garde le Logo "Placeholder" SVG vectoriel (Optimisé)
  const HEX_BLUE = "#1d71b8";
  const HEX_ORANGE = "#e94e1b";
  const titleColor = variant === "white" ? "text-white" : "text-slate-900";

  return (
    <div className={cn("flex items-center gap-2.5 select-none h-full", className)}>
      
      {/* ICÔNE VECTORIELLE */}
      <svg
        viewBox="0 0 100 100" // Viewbox normalisée (0-100) pour être plus facile à gérer
        fill="none"
        className="h-full w-auto aspect-square shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        {/* Forme de maison abstraite / Hexagone simplifié */}
        <path
          d="M50 10 L90 35 V80 L50 95 L10 80 V35 L50 10Z"
          fill={variant === "white" ? "white" : HEX_ORANGE}
          className="transition-colors duration-300"
        />
        {/* Initiales "IC" stylisées à l'intérieur */}
        <path
          d="M35 70 L35 40 L65 40 M65 70 L65 55"
          stroke={variant === "white" ? "#0F172A" : "white"}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* TEXTE (TYPOGRAPHIE) */}
      {!iconOnly && showText && (
        <div className="flex flex-col justify-center leading-none">
          <span className={cn("font-black tracking-tighter text-xl md:text-2xl uppercase", titleColor)}>
            IMMO
          </span>
          <span className={cn("font-bold text-[10px] md:text-xs tracking-[0.2em] -mt-0.5 uppercase", "text-orange-500")}>
            Connect
          </span>
        </div>
      )}
    </div>
  );
}