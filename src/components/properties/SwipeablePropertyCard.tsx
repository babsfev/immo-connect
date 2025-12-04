import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MapPin, BedDouble } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

// Type simplifié pour l'affichage
interface PropertyProps {
  title: string;
  address: string;
  price: number;
  status: string;
  specs: { beds: number; area: number };
}

export function SwipeablePropertyCard({ property }: { property: PropertyProps }) {
  // Logique couleur
  const statusColor = property.status === "Loué" ? "success" : "default";

  return (
    // min-w-[280px] permet de créer le défilement horizontal
    <Card className="min-w-[280px] w-[280px] md:min-w-[320px] snap-center shrink-0 overflow-hidden hover:shadow-lg transition-all border-slate-200 group cursor-pointer">
      
      <div className="h-40 bg-slate-200 relative overflow-hidden">
        {/* Simulation Image avec Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/0 transition-colors"></div>
        
        <div className="absolute top-3 right-3">
            <Badge variant={statusColor} className="shadow-sm">{property.status}</Badge>
        </div>
        
        <div className="absolute bottom-3 left-3 text-white z-10 pr-2">
            <p className="font-bold truncate text-base shadow-sm">{property.title}</p>
            <p className="text-[10px] text-slate-200 flex items-center mt-0.5 truncate">
                <MapPin size={10} className="mr-1" /> {property.address}
            </p>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3 pb-3 border-b border-slate-50">
            <div className="flex gap-3 text-slate-500 text-xs">
                <span className="flex items-center gap-1 bg-slate-50 px-1.5 py-0.5 rounded"><BedDouble size={12}/> {property.specs.beds} ch.</span>
                <span className="flex items-center gap-1 bg-slate-50 px-1.5 py-0.5 rounded"> {property.specs.area} m²</span>
            </div>
        </div>
        <div className="flex justify-between items-center">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Loyer</p>
            <p className="font-extrabold text-blue-700 text-lg">{formatCurrency(property.price)}</p>
        </div>
      </CardContent>
    </Card>
  );
}