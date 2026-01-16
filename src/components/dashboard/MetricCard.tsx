import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, LucideIcon, TrendingUp, TrendingDown, DollarSign, Users, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
const ICONS: Record<string, LucideIcon> = {
  DollarSign,
  Users,
  Zap,
  TrendingUp,
  TrendingDown,
};
interface MetricCardProps {
  title: string;
  value: string;
  trend: "up" | "down";
  change: string;
  icon: string;
}
export function MetricCard({ title, value, trend, change, icon }: MetricCardProps) {
  const Icon = ICONS[icon] || DollarSign;
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md border-slate-200 dark:border-slate-800">
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold tracking-tight">{value}</h2>
          <div className="flex items-center gap-1.5">
            <span className={cn(
              "flex items-center text-xs font-semibold px-1.5 py-0.5 rounded-full",
              trend === "up" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
            )}>
              {trend === "up" ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
              {change}
            </span>
            <span className="text-xs text-muted-foreground font-medium">vs last month</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}