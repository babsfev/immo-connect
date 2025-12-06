// 1. TRADUCTIONS & LABELS
export const PROPERTY_TYPE_LABELS: Record<string, string> = {
  APARTMENT: "Appartement",
  HOUSE: "Maison / Villa",
  STUDIO: "Studio",
  ROOM: "Chambre",
  OFFICE: "Bureau",
  RETAIL: "Commerce",
  WAREHOUSE: "Entrepôt",
  BUILDING: "Immeuble",
  LAND: "Terrain",
  PARKING: "Parking",
};

export const PROPERTY_STATUS_LABELS: Record<string, string> = {
  DRAFT: "Brouillon",
  AVAILABLE: "Vacant",
  RENTED: "Loué",
  MAINTENANCE: "Travaux",
  SOLD: "Vendu",
};

export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  PENDING: "En attente",
  PAID: "Payé",
  LATE: "En retard",
  PARTIAL: "Partiel",
  FAILED: "Échoué",
};

export const TICKET_PRIORITY_LABELS: Record<string, string> = {
  LOW: "Faible",
  MEDIUM: "Moyenne",
  HIGH: "Haute",
  CRITICAL: "Critique",
};

export const EXPENSE_CATEGORY_LABELS: Record<string, string> = {
  MAINTENANCE: "Entretien & Réparations",
  UTILITIES: "Charges (Eau, Elec)",
  TAX: "Impôts & Taxes",
  MANAGEMENT: "Frais de Gestion",
  LOAN: "Remboursement Prêt",
  OTHER: "Autre",
};

// 2. CONFIGURATION MÉTIER
export const COMMISSION_RATE = 0.07; // 7% par défaut
export const CURRENCY = "XOF";
export const LOCALE = "fr-SN";