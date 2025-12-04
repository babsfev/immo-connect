import React from "react";
import Link from "next/link";
import { Search, MapPin, BedDouble, Bath, Maximize, ArrowRight, Filter } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import { formatCurrency } from "@/lib/utils";

// Mock Data Publique
const listings = [
  { id: 1, title: "Terrain 300m² - Titre Foncier", type: "Vente", category: "Terrain", price: 15000000, location: "Diamniadio", image: "bg-emerald-100", tags: ["Viabilisé", "TF"] },
  { id: 2, title: "Villa R+1 Standing", type: "Location", category: "Maison", price: 1200000, location: "Ngor Almadies", image: "bg-orange-100", specs: { beds: 4, baths: 3, area: 250 } },
  { id: 3, title: "Plateau Bureau Open Space", type: "Location", category: "Bureau", price: 850000, location: "Plateau", image: "bg-blue-100", specs: { area: 110 } },
  { id: 4, title: "Appartement Meublé", type: "Location", category: "Appartement", price: 450000, location: "Mermoz", image: "bg-purple-100", specs: { beds: 2, baths: 1, area: 85 } },
];

export default function MarketPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* Header Simplifié */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">I</div>
           <span className="font-bold text-lg">Immo<span className="text-orange-500">Market</span></span>
        </div>
        <div className="flex gap-4">
           <Link href="/login"><Button variant="ghost">Se connecter</Button></Link>
           <Link href="/register"><Button className="bg-blue-600 text-white">Publier une annonce</Button></Link>
        </div>
      </header>

      {/* Hero Recherche */}
      <div className="bg-slate-900 py-16 px-6 text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-blue-600/20 blur-3xl"></div>
         <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">Trouvez votre futur chez-vous</h1>
         
         <div className="max-w-4xl mx-auto bg-white p-2 rounded-2xl shadow-xl flex flex-col md:flex-row gap-2 relative z-10">
            <div className="flex-1 relative">
               <MapPin className="absolute left-3 top-3 text-slate-400" size={20}/>
               <Input className="pl-10 border-none shadow-none text-base h-12" placeholder="Ville, Quartier..." />
            </div>
            <div className="w-px bg-slate-200 hidden md:block"></div>
            <div className="flex-1 relative">
               <select className="w-full h-12 bg-transparent border-none text-slate-600 px-4 outline-none">
                  <option>Acheter</option>
                  <option>Louer</option>
               </select>
            </div>
            <div className="w-px bg-slate-200 hidden md:block"></div>
            <div className="flex-1 relative">
               <select className="w-full h-12 bg-transparent border-none text-slate-600 px-4 outline-none">
                  <option>Type de bien</option>
                  <option>Terrain</option>
                  <option>Maison</option>
                  <option>Appartement</option>
               </select>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white h-12 px-8 rounded-xl text-lg">
               <Search size={20} />
            </Button>
         </div>
      </div>

      {/* Liste des Résultats */}
      <div className="container mx-auto px-6 py-12">
         <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Dernières annonces</h2>
            <Button variant="outline"><Filter size={16} className="mr-2"/> Filtres avancés</Button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {listings.map((item) => (
               <Card key={item.id} className="group hover:shadow-xl transition-all cursor-pointer overflow-hidden border-slate-200">
                  <div className={`h-48 w-full ${item.image} relative`}>
                     <Badge className={`absolute top-3 left-3 ${item.type === "Vente" ? "bg-purple-600" : "bg-blue-600"} text-white border-none`}>
                        {item.type}
                     </Badge>
                     <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-slate-900">
                        {item.category}
                     </div>
                  </div>
                  <CardContent className="p-4">
                     <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-slate-900 truncate">{item.title}</h3>
                     </div>
                     <p className="text-slate-500 text-sm flex items-center gap-1 mb-4">
                        <MapPin size={14} /> {item.location}
                     </p>
                     
                     {item.specs && (
                        <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                           {item.specs.beds && <span className="flex items-center gap-1"><BedDouble size={14}/> {item.specs.beds}</span>}
                           {item.specs.baths && <span className="flex items-center gap-1"><Bath size={14}/> {item.specs.baths}</span>}
                           {item.specs.area && <span className="flex items-center gap-1"><Maximize size={14}/> {item.specs.area} m²</span>}
                        </div>
                     )}
                     
                     {item.tags && (
                        <div className="flex gap-2 mb-4">
                           {item.tags.map(tag => <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>)}
                        </div>
                     )}

                     <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                        <span className="font-bold text-blue-700 text-lg">{formatCurrency(item.price)}</span>
                        <Button size="sm" variant="ghost" className="text-slate-400 group-hover:text-orange-500">
                           <ArrowRight size={18} />
                        </Button>
                     </div>
                  </CardContent>
               </Card>
            ))}
         </div>
      </div>
    </div>
  );
}