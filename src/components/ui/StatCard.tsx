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
  iconColor?: string; 
  iconBg?: string; 
}

export function StatCard({ 
  title, value, icon: Icon, trend, subtext, 
  variant = "default", iconColor = "text-blue-600", iconBg = "bg-blue-50" 
}: StatCardProps) {
  
  let TrendIcon = Minus;
  let trendColor = "text-slate-500 bg-slate-100";
  
  if (trend) {
    if (trend.includes("+")) {
      TrendIcon = TrendingUp;
      trendColor = "text-emerald-700 bg-emerald-50 border border-emerald-100";
    } else if (trend.includes("-")) {
      TrendIcon = TrendingDown;
      trendColor = "text-rose-700 bg-rose-50 border border-rose-100";
    }
  }

  const isBrand = variant === "brand";

  return (
    <Card 
      className={cn(
        "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        isBrand ? "bg-slate-900 text-white border-none" : "hover:border-blue-200"
      )}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className={cn(
            "p-3 rounded-xl shadow-sm transition-transform group-hover:scale-110", 
            isBrand ? "bg-white/10 text-white" : `${iconBg} ${iconColor}`
          )}>
            <Icon size={22} />
          </div>
          
          {trend && (
            <span className={cn(
              "text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1",
              isBrand ? "bg-white/20 text-white" : trendColor
            )}>
              <TrendIcon size={10} /> {trend}
            </span>
          )}
        </div>

        <div>
          <p className={cn("text-xs font-bold uppercase tracking-wider mb-1", isBrand ? "text-slate-400" : "text-slate-500")}>
            {title}
          </p>
          <h3 className="text-3xl font-extrabold tracking-tight">
            {value}
          </h3>
          {subtext && (
            <p className={cn("text-xs mt-1", isBrand ? "text-slate-400" : "text-slate-400")}>
              {subtext}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}