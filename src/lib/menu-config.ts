import { 
  LayoutDashboard, Building2, Wallet, Users, Wrench, 
  FileText, Settings, BarChart3, Globe 
} from "lucide-react";

export type Role = "AGENCY" | "OWNER" | "TENANT" | "PROSPECT";

// Structure statique utilisée par les composants
export const MENU_ITEMS = [
  {
    category: "Gestion",
    items: [
      { label: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
      { label: "Mes Biens", href: "/properties", icon: Building2 },
      { label: "Locataires", href: "/tenants", icon: Users },
      { label: "Finances", href: "/payments", icon: Wallet },
    ]
  },
  {
    category: "Opérations",
    items: [
      { label: "Maintenance", href: "/maintenance", icon: Wrench },
      { label: "Documents", href: "/documents", icon: FileText },
      { label: "Rapports", href: "/reports", icon: BarChart3 },
    ]
  },
  {
    category: "Marketplace",
    items: [
      { label: "Opportunités", href: "/market", icon: Globe, highlight: true },
    ]
  }
];

// Helper pour récupérer une liste plate (utile pour la navbar mobile simplifiée)
export const getNavItems = (role: string) => {
  // Pour l'instant on retourne tout, on filtrera par rôle plus tard si besoin
  return MENU_ITEMS.flatMap(group => group.items);
};

// Configuration pour la Landing Page
export const LANDING_MENU = [
  { label: "Fonctionnalités", href: "/#features" },
  { label: "Tarifs", href: "/#pricing" },
  { label: "Marketplace", href: "/market" },
];