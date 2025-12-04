import { Building2, Home, MapPin, Warehouse } from "lucide-react";

export const MARKET_LISTINGS = [
  { 
    id: 1, 
    title: "Terrain Titre Foncier 300m²", 
    type: "Vente", 
    category: "Terrain", 
    price: 15000000, 
    location: "Diamniadio, Pôle Urbain", 
    description: "Magnifique terrain d'angle, viabilisé, situé en plein cœur du pôle urbain. Idéal pour projet résidentiel ou commercial. Papiers en règle (TF).",
    image: "bg-emerald-100", 
    icon: MapPin, 
    specs: { area: 300 }, 
    features: ["Viabilisé", "Titre Foncier", "Angle de rue", "Proche autoroute"],
    agent: { name: "Jean Dupont", phone: "+221 77 000 00 00", email: "jean@immo.sn" }
  },
  { 
    id: 2, 
    title: "Villa R+1 Haut Standing", 
    type: "Location", 
    category: "Maison", 
    price: 1200000, 
    location: "Ngor Almadies", 
    description: "Villa moderne avec piscine, groupe électrogène et finitions de luxe. 4 chambres avec salles de bain attenantes. Quartier calme et sécurisé.",
    image: "bg-orange-100", 
    icon: Home, 
    specs: { beds: 4, baths: 3, area: 250 }, 
    features: ["Piscine", "Groupe électrogène", "Cuisine équipée", "Garage double"],
    agent: { name: "Awa Diop", phone: "+221 76 111 11 11", email: "awa@immo.sn" }
  },
  { 
    id: 3, 
    title: "Plateau Bureau Open Space", 
    type: "Location", 
    category: "Bureau", 
    price: 850000, 
    location: "Plateau, Dakar", 
    description: "Espace de travail lumineux au 4ème étage d'un immeuble professionnel. Fibre optique installée, gardiennage 24/7.",
    image: "bg-blue-100", 
    icon: Building2, 
    specs: { area: 110 }, 
    features: ["Sécurité 24/7", "Fibre Optique", "Ascenseur", "Climatisation centrale"],
    agent: { name: "Jean Dupont", phone: "+221 77 000 00 00", email: "jean@immo.sn" }
  },
  { 
    id: 4, 
    title: "Appartement Meublé Mermoz", 
    type: "Location", 
    category: "Appartement", 
    price: 450000, 
    location: "Mermoz", 
    description: "Joli T3 meublé avec goût. Proche de toutes commodités (écoles, supermarchés). Idéal pour expatriés.",
    image: "bg-purple-100", 
    icon: Building2, 
    specs: { beds: 2, baths: 1, area: 85 }, 
    features: ["Meublé", "Canal+", "Wifi inclus", "Balcon"],
    agent: { name: "Paul Faye", phone: "+221 70 222 22 22", email: "paul@immo.sn" }
  },
  { 
    id: 5, 
    title: "Entrepôt Zone Industrielle", 
    type: "Vente", 
    category: "Local", 
    price: 125000000, 
    location: "Sodida", 
    description: "Grand hangar de stockage avec bureaux attenants. Accès gros porteurs facile. Hauteur sous plafond 8m.",
    image: "bg-slate-700", 
    icon: Warehouse, 
    specs: { area: 500 }, 
    features: ["Hangar", "Parking camions", "Bureaux", "Triphasé"],
    agent: { name: "Jean Dupont", phone: "+221 77 000 00 00", email: "jean@immo.sn" }
  }
];