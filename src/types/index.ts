export interface UserProfile {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  role: string;
  avatar?: string | null;
}

export interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  status: "AVAILABLE" | "RENTED" | "MAINTENANCE";
  coverImage?: string | null;
}

export interface Tenant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}