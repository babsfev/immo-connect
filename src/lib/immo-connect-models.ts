// --- TYPES GLOBAUX ---

export type Currency = "XOF" | "EUR" | "USD";
export type Locale = "fr-SN" | "fr-FR" | "en-US";

// --- IMMOBILIER (Stock) ---
export type PropertyStatus = "Vacant" | "Loué" | "Travaux" | "Vente";
export type PropertyType = "Appartement" | "Villa" | "Studio" | "Bureau" | "Local" | "Terrain";

export interface Property {
  id: string | number;
  title: string;
  address: string;
  price: number;
  currency: Currency;
  locale: Locale;
  status: PropertyStatus;
  type: PropertyType;
  image?: string;
  specs: {
    beds?: number;
    baths?: number;
    area: number;
    built?: number; // Année construction
  };
  features?: string[];
  tenantId?: string | number;
  financials?: {
    yield: number; // Rentabilité %
    occupancyRate: number; // Taux occupation %
  };
}

// --- LOCATAIRES (Clients) ---
export type TenantStatus = "À jour" | "En retard" | "En attente" | "Contentieux";

export interface Tenant {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  property: string; // Nom du bien loué
  status: TenantStatus;
  rentAmount: number;
  deposit?: number;
  leaseStart?: string;
  leaseEnd: string;
  riskScore?: number; // Score IA (0-100)
  paymentMethod?: string;
  avatar?: string; // Classe CSS couleur (ex: bg-blue-100)
}

// --- FINANCE (Cashflow) ---
export type PaymentStatus = "Payé" | "Impayé" | "Retard" | "En attente";
export type ExpenseCategory = "Maintenance" | "Énergie" | "Impôts" | "Gestion" | "Autre";

export interface Transaction {
  id: string | number;
  date: string;
  amount: number;
  status: PaymentStatus;
  type: "income" | "expense";
  category?: ExpenseCategory;
  label: string; // Description (ex: Loyer Nov)
  relatedTo?: string; // Nom du locataire ou du bien
  recoverable?: boolean; // Charge récupérable ?
}

// --- CRM (Candidatures) ---
export type ApplicationStatus = "Nouveau" | "Visite" | "Analyse" | "Offre" | "Signé" | "Rejeté";

export interface Application {
  id: string | number;
  name: string;
  job: string;
  income: number;
  property: string;
  date: string;
  score: number; // Scoring IA
  status: ApplicationStatus;
  tags?: string[];
  aiInsight?: string;
  documents?: { name: string; valid: boolean }[];
}

// --- MAINTENANCE (Tickets) ---
export type TicketPriority = "Faible" | "Moyenne" | "Urgente" | "Critique";
export type TicketStatus = "todo" | "progress" | "done";

export interface Ticket {
  id: string | number;
  title: string;
  property: string;
  tenant?: string;
  date: string;
  priority: TicketPriority;
  status: TicketStatus;
  provider?: string; // Prestataire assigné
  aiCostEstimation?: number;
  sla?: string; // Temps restant
}
// --- COLOCATION & CO-LIVING ---

export interface RoomAmenities {
  hasBalcony: boolean;
  hasPrivateBath: boolean;
  hasAC: boolean; // Climatisation
  furnished: boolean; // Meublé
  size: number; // m²
}

export interface LifestyleProfile {
  smoker: boolean;
  petsAllowed: boolean;
  genderPreference: "mixed" | "female_only" | "male_only";
  occupation: "student" | "professional" | "any";
}

export interface ColocListing {
  id: string;
  propertyId: string; // Lien vers le bien parent
  pricePerRoom: number;
  availableRooms: number;
  totalRooms: number;
  
  // Les détails qui tuent
  amenities: RoomAmenities;
  lifestyle: LifestyleProfile;
  
  // Gestion des charges (Spécifique Afrique)
  utilities: {
    woyofal: "included" | "shared"; // Électricité
    water: "included" | "shared";
    internet: "included" | "shared";
    cleaning: "included" | "shared"; // Femme de ménage
  };

  images: string[]; // Photos spécifiques de la chambre
}