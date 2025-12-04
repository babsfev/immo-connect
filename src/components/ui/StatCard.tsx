import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  icon: React.ElementType;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
  iconColor?: string;
  iconBg?: string;
}

export function StatCard({
  title,
  value,
  subValue,
  icon: Icon,
  trend,
  trendValue,
  className,
  iconColor = "text-blue-600",
  iconBg = "bg-blue-100"
}: StatCardProps) {
  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between pb-2">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <div className={cn("h-8 w-8 rounded-full flex items-center justify-center", iconBg, iconColor)}>
            <Icon size={16} />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <h2 className="text-2xl font-bold text-slate-900">{value}</h2>
          {trendValue && (
            <span className={cn("text-xs font-medium flex items-center", 
              trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-slate-500"
            )}>
              {trendValue}
            </span>
          )}
          {subValue && <span className="text-xs text-slate-400">{subValue}</span>}
        </div>
      </CardContent>
    </Card>
  );
}