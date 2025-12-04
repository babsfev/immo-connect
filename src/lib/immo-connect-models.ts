// src/lib/immo-connect-models.ts
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'owner' | 'tenant' | 'manager';
}

export interface Property {
  id: string;
  title: string;
  description: string;
  type: 'apartment' | 'house' | 'studio' | 'villa';
  price: number;
  city: string;
  address: string;
  status: 'available' | 'occupied' | 'maintenance';
  ownerId: string;
}

export interface Tenant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyId: string;
  isActive: boolean;
}

export interface Lease {
  id: string;
  propertyId: string;
  tenantId: string;
  startDate: string;
  endDate: string;
  rent: number;
  status: 'active' | 'expired' | 'terminated';
}

export interface Payment {
  id: string;
  leaseId: string;
  tenantId: string;
  propertyId: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'overdue' | 'pending';
  paidDate?: string;
}

export const UserMock: User[] = [
  {
    id: '1',
    firstName: 'Marie',
    lastName: 'Lambert',
    email: 'marie.lambert@example.com',
    phone: '+221 77 123 45 67',
    role: 'owner'
  }
];

export const PropertyMock: Property[] = [
  {
    id: '1',
    title: 'Villa Almadies',
    description: 'Belle villa avec vue sur mer',
    type: 'villa',
    price: 450000,
    city: 'Dakar',
    address: 'Almadies, Dakar',
    status: 'occupied',
    ownerId: '1'
  },
  {
    id: '2',
    title: 'Appartement Sacré-Coeur',
    description: 'Appartement moderne 3 pièces',
    type: 'apartment',
    price: 250000,
    city: 'Dakar',
    address: 'Sacré-Coeur, Dakar',
    status: 'available',
    ownerId: '1'
  }
];

export const TenantMock: Tenant[] = [
  {
    id: '1',
    firstName: 'Abdoulaye',
    lastName: 'Diop',
    email: 'abdoulaye.diop@example.com',
    phone: '+221 76 543 21 00',
    propertyId: '1',
    isActive: true
  }
];

export const PaymentMock: Payment[] = [
  {
    id: '1',
    leaseId: '1',
    tenantId: '1',
    propertyId: '1',
    amount: 450000,
    dueDate: '2024-01-05',
    status: 'paid',
    paidDate: '2024-01-01'
  }
];