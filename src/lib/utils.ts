import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formate un montant selon la devise et la locale demandée.
 * @param amount - Le montant (ex: 1500000)
 * @param currency - Le code devise ISO (ex: 'XOF', 'EUR', 'USD') - Défaut: 'XOF'
 * @param locale - Le code locale (ex: 'fr-SN', 'fr-FR', 'en-US') - Défaut: 'fr-SN'
 */
export function formatCurrency(amount: number, currency: string = "XOF", locale: string = "fr-SN") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0, // Pas de centimes pour l'immobilier généralement
    maximumFractionDigits: 0,
  }).format(amount);
}