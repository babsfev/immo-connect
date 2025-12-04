import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string; // ex: "+12%" ou "-5%"
  subtext?: string;
  variant?: "default" | "brand"; // brand = fond coloré
  iconColor?: string; // ex: "text-blue-600"
  iconBg?: string; // ex: "bg-blue-100"
}

export function StatCard({ 
  title, value, icon: Icon, trend, subtext, 
  variant = "default", iconColor = "text-blue-600", iconBg = "bg-blue-50" 
}: StatCardProps) {
  
  // Logique Intelligente de Tendance
  let TrendIcon = Minus;
  let trendColor = "text-slate-500";
  
  if (trend) {
    if (trend.includes("+")) {
      TrendIcon = TrendingUp;
      trendColor = "text-green-600";
    } else if (trend.includes("-")) {
      TrendIcon = TrendingDown;
      trendColor = "text-red-600";
    }
  }

  const isBrand = variant === "brand";

  return (
    <Card className={cn(
      "transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
      isBrand ? "bg-linear-to-br from-blue-600 to-blue-700 text-white border-none" : "hover:border-blue-300"
    )}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className={cn("text-sm font-medium", isBrand ? "text-blue-100" : "text-slate-500")}>
              {title}
            </p>
            <h3 className="text-2xl font-extrabold mt-2 tracking-tight">
              {value}
            </h3>
          </div>
          <div className={cn("p-2.5 rounded-xl shadow-sm", isBrand ? "bg-white/20 text-white" : `${iconBg} ${iconColor}`)}>
            <Icon size={20} />
          </div>
        </div>

        {(trend || subtext) && (
          <div className="flex items-center gap-2 mt-4">
            {trend && (
              <span className={cn(
                "text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1",
                isBrand ? "bg-white/20 text-white" : `${trendColor} bg-slate-50`
              )}>
                <TrendIcon size={12} /> {trend}
              </span>
            )}
            {subtext && (
              <span className={cn("text-xs", isBrand ? "text-blue-200" : "text-slate-400")}>
                {subtext}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}