import { 
  LayoutDashboard, Building2, Users, CreditCard, Sparkles, Settings, 
  Wrench, Calendar, FileText, Briefcase, Wallet, UserPlus 
} from "lucide-react";

export const MENU_ITEMS = [
  { category: "Pilotage", items: [
      { label: "Tableau de bord", icon: LayoutDashboard, href: "/dashboard" },
      { label: "Agenda", icon: Calendar, href: "/calendar" },
  ]},
  { category: "Gestion", items: [
      { label: "Candidatures", icon: UserPlus, href: "/applications" },
      { label: "Mes Biens", icon: Building2, href: "/properties" },
      { label: "Locataires", icon: Users, href: "/tenants" },
  ]},
  { category: "Finances", items: [
      { label: "Paiements", icon: CreditCard, href: "/payments" },
      { label: "Dépenses", icon: Wallet, href: "/expenses" },
      // Ajout Ventes ici si tu veux
  ]},
  { category: "Opérations", items: [
      { label: "Maintenance", icon: Wrench, href: "/maintenance" },
      { label: "Documents", icon: FileText, href: "/documents" },
      { label: "Conseiller IA", icon: Sparkles, href: "/ai-advisor", highlight: true },
  ]},
  { category: "Admin", items: [
      { label: "Propriétaires", icon: Briefcase, href: "/landlords" },
      { label: "Paramètres", icon: Settings, href: "/settings" },
  ]},
];