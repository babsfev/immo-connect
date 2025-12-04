import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MapPin, BedDouble } from "lucide-react";
import { Property } from "@/types";

interface SwipeableCardProps {
  property: Partial<Property>;
}

export function SwipeablePropertyCard({ property }: SwipeableCardProps) {
  return (
    <Card className="min-w-[280px] w-[280px] md:min-w-[320px] md:w-full snap-center shrink-0 overflow-hidden hover:shadow-lg transition-all border-slate-200">
      <div className="h-40 bg-slate-200 relative">
        {/* CORRECTION ICI : bg-linear-to-t au lieu de bg-gradient-to-t */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 to-transparent"></div>
        
        <div className="absolute top-3 right-3">
            <Badge variant={property.status === "Loué" ? "success" : "default"}>
                {property.status}
            </Badge>
        </div>
        
        <div className="absolute bottom-3 left-3 text-white z-10">
            <p className="font-bold truncate w-60">{property.title}</p>
            <p className="text-xs text-slate-200 flex items-center">
                <MapPin size={10} className="mr-1" /> {property.address}
            </p>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
            <div className="flex gap-3 text-slate-500 text-xs">
                <span className="flex items-center gap-1"><BedDouble size={14}/> {property.specs?.beds || 2} ch.</span>
                <span className="flex items-center gap-1">{property.specs?.area || 0} m²</span>
            </div>
        </div>
        <div className="flex justify-between items-center">
            <p className="text-sm text-slate-500">Loyer</p>
            <p className="font-bold text-blue-600">{property.price?.toLocaleString()} FCFA</p>
        </div>
      </CardContent>
    </Card>
  );
}