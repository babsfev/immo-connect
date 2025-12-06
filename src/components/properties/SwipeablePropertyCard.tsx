import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MapPin, BedDouble, Ruler } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface PropertyProps {
  title: string;
  address: string;
  price: number;
  status: string;
  specs: { beds: number; area: number };
  image?: string; // Ajout support image
}

export function SwipeablePropertyCard({ property }: { property: PropertyProps }) {
  const statusVariant = property.status === "Loué" ? "success" : "default";

  return (
    <Card hoverEffect className="min-w-[280px] w-[280px] md:min-w-[320px] snap-center shrink-0 border-slate-200 group cursor-pointer h-full flex flex-col">
      
      <div className="h-44 bg-slate-100 relative overflow-hidden">
        {/* Placeholder ou Image */}
        {property.image ? (
            <img src={property.image} alt={property.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
            <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                <span className="text-xs font-medium uppercase tracking-widest">Sans image</span>
            </div>
        )}
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent opacity-80" />
        
        <div className="absolute top-3 right-3">
            <Badge variant={statusVariant} className="shadow-lg backdrop-blur-sm border-white/20">{property.status}</Badge>
        </div>
        
        <div className="absolute bottom-3 left-3 right-3 text-white z-10">
            <p className="font-bold truncate text-lg drop-shadow-md leading-tight">{property.title}</p>
            <p className="text-[11px] text-slate-200 flex items-center mt-1 truncate font-medium">
                <MapPin size={12} className="mr-1 text-white/80" /> {property.address}
            </p>
        </div>
      </div>
      
      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex gap-2 mb-4">
            <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md text-xs font-medium text-slate-600 border border-slate-100">
                <BedDouble size={14} className="text-slate-400"/> {property.specs.beds} ch.
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md text-xs font-medium text-slate-600 border border-slate-100">
                <Ruler size={14} className="text-slate-400"/> {property.specs.area} m²
            </div>
        </div>
        
        <div className="mt-auto flex justify-between items-end border-t border-slate-50 pt-3">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Loyer mensuel</p>
            <p className="font-extrabold text-slate-900 text-lg tracking-tight">{formatCurrency(property.price)}</p>
        </div>
      </CardContent>
    </Card>
  );
}