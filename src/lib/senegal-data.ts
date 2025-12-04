// Données de référence pour le Sénégal
export const SENEGAL_REGIONS = [
  "Dakar", "Thiès", "Saint-Louis", "Diourbel", "Ziguinchor", 
  "Kaolack", "Tambacounda", "Louga", "Fatick", "Kolda", 
  "Matam", "Kaffrine", "Kédougou", "Sédhiou"
];

// Quartiers de Dakar (Pour l'autocomplétion)
export const DAKAR_QUARTIERS = [
  "Almadies", "Plateau", "Point E", "Fann Résidence", "Mermoz", 
  "Sacré-Cœur", "Yoff", "Ouakam", "Ngor", "Virage",
  "Parcelles Assainies", "Grand Dakar", "Hann Maristes", 
  "Corniche Ouest", "Mamelles", "Sicap Liberté"
];

export const CURRENCY = {
  code: "XOF",
  symbol: "FCFA",
  locale: "fr-SN"
};

// Helper pour formater un numéro de téléphone au format local (+221)
export function formatPhoneNumber(phone: string) {
  // Nettoie tout ce qui n'est pas chiffre
  const cleaned = phone.replace(/\D/g, '');
  // Si ça commence par 77, 76, 75, 70, 78... on ajoute +221
  if (cleaned.length === 9 && (cleaned.startsWith('7'))) {
    return `+221 ${cleaned.substring(0, 2)} ${cleaned.substring(2, 5)} ${cleaned.substring(5, 7)} ${cleaned.substring(7)}`;
  }
  return phone;
}