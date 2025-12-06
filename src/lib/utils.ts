import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { type ActionResult } from "@/lib/safe-action";
import { formatDistanceToNow, parseISO } from "date-fns"; 
import { fr } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number | string | null | undefined, currency = "XOF") {
  if (amount === null || amount === undefined) return "-";
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("fr-SN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(num);
}

export function formatRelativeDate(date: Date | string | null) {
  if (!date) return "";
  const d = typeof date === "string" ? parseISO(date) : date;
  try {
    return formatDistanceToNow(d, { addSuffix: true, locale: fr });
  } catch (e) {
    return "";
  }
}

export function formatSenegalPhone(value: string) {
  if (!value) return "";
  const clean = value.replace(/\D/g, '').slice(0, 9);
  if (clean.length < 2) return clean;
  // Format: 77 123 45 67
  return clean.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4").trim();
}

export const CURRENT_YEAR = new Date().getFullYear();
export const CURRENT_MONTH = new Date().toLocaleString("fr-FR", { month: "long" });

export function isActionError(result: any): result is { ok: false; error: string; details?: any } {
  return !!result && result.ok === false;
}