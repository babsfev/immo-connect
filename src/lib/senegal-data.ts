// Données constantes pour le contexte Sénégalais
export const CURRENCY = "FCFA";
export const LOCALE = "fr-SN";

export const SENEGAL_REGIONS = [
  "Dakar", "Thiès", "Saint-Louis", "Diourbel", "Ziguinchor", 
  "Kaolack", "Tambacounda", "Louga", "Fatick", "Kolda", 
  "Matam", "Kaffrine", "Kédougou", "Sédhiou"
];

export const DAKAR_DISTRICTS = [
  "Almadies", "Plateau", "Point E", "Fann", "Mermoz", 
  "Sacré-Cœur", "Yoff", "Ouakam", "Ngor", "Parcelles Assainies",
  "Grand Dakar", "Hann Maristes", "Corniche Ouest"
];

export const PROPERTY_TYPES = [
  "Appartement", "Villa", "Studio", "Bureau", "Local Commercial", "Terrain"
];

// Helper pour formatter les prix selon le standard local
export const formatCFA = (amount: number) => {
  return new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: "XOF",
    minimumFractionDigits: 0,
  }).format(amount).replace("XOF", "FCFA");
};