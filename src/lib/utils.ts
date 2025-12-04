import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { type ActionResult } from "@/lib/safe-action";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number | string, currency: "XOF" | "EUR" | "USD" = "XOF", locale: string = "fr-SN") {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  const maximumFractionDigits = currency === "XOF" ? 0 : 2;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits,
    minimumFractionDigits: 0,
  }).format(numAmount);
}

export function formatPhoneNumber(phone: string) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 9 && cleaned.startsWith("7")) {
    return `221${cleaned}`;
  }
  return cleaned;
}

export const CURRENT_YEAR = new Date().getFullYear();
export const CURRENT_MONTH = new Date().toLocaleString("fr-FR", { month: "long" });
export const TODAY_DATE = new Date().toISOString().split("T")[0];

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function formatSenegalPhone(value: string) {
  const number = value.replace(/\D/g, '').slice(0, 9);
  if (number.length === 0) return "";
  if (number.length <= 2) return number;
  if (number.length <= 5) return `${number.slice(0, 2)} ${number.slice(2)}`;
  if (number.length <= 7) return `${number.slice(0, 2)} ${number.slice(2, 5)} ${number.slice(5)}`;
  return `${number.slice(0, 2)} ${number.slice(2, 5)} ${number.slice(5, 7)} ${number.slice(7, 9)}`;
}

export function isActionError(result: ActionResult<any> | null | undefined): result is { ok: false; error: string; details?: Record<string, string[]>; status: number } {
  return !!result && !result.ok;
}