// Ré-exporte tout depuis tes modèles pour n'avoir qu'un seul import
export * from "@/lib/immo-connect-models";

// Ajouts spécifiques pour l'UI (qui ne sont pas dans la DB)
export interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  highlight?: boolean;
}

export interface SidebarGroup {
  category: string;
  items: NavItem[];
}

// Types pour les formulaires
export interface PropertyFormData {
  title: string;
  type: string;
  address: string;
  price: number;
  surface: number;
}

// Types pour l'API (Réponses standard)
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}