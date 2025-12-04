export type PropertyStatus = "Vacant" | "Loué" | "Travaux";
export type TenantStatus = "À jour" | "En retard" | "En attente";
export type PaymentStatus = "Payé" | "Impayé" | "Retard";

export interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  currency: string; // NOUVEAU CHAMP (ex: 'XOF', 'EUR')
  status: PropertyStatus;
  type: string;
  specs: {
    beds: number;
    baths: number;
    area: number;
  };
  image?: string;
}

// Ajoute aussi currency ici si tu veux gérer des paiements multi-devises
export interface Payment {
  id: string;
  tenantId: string;
  propertyId: string;
  amount: number;
  currency: string; // NOUVEAU CHAMP
  date: string;
  status: PaymentStatus;
}

// ... reste du fichier (Tenant, etc.)
export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyId: string;
  status: TenantStatus;
  rentAmount: number;
  currency: string; // Utile pour savoir dans quelle devise il paie
}