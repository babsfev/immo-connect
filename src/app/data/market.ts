// Mock data pour le marché (en attendant la V2)
export const MARKET_LISTINGS = [
  { 
    id: "1",
    title: "Appartement Plateau", 
    address: "Dakar Plateau", 
    price: 450000, 
    status: "Disponible", 
    specs: { beds: 3, area: 120 }, 
    image: null 
  },
  { 
    id: "2",
    title: "Villa Saly", 
    address: "Saly Portudal", 
    price: 800000, 
    status: "Disponible", 
    specs: { beds: 5, area: 300 }, 
    image: null 
  },
];

export async function getMarketListings() {
  // Simulation délai réseau
  await new Promise(resolve => setTimeout(resolve, 500));
  return MARKET_LISTINGS;
}