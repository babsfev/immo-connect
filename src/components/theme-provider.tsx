"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
// Si vous avez une erreur de type ici, installez : npm i next-themes
// et assurez-vous que les types sont inclus (généralement inclus dans la v0.3+)
// Sinon, utilisez : React.ComponentProps<typeof NextThemesProvider>

// Définition manuelle des props si l'import de type échoue
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}