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
    <div className="animate-in slide-in-from-bottom-4 fade-in duration-500 ease-out [animation-fill-mode:forwards] hover:-translate-y-1 hover:shadow-xl transition-transform duration-300 hover:scale-[1.02]">
      <Card className="overflow-hidden transition-all hover:shadow-xl border-slate-200 dark:border-slate-800 bg-background/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.15em]">{title}</p>
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shadow-inner">
              <Icon className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">{value}</h2>
            <div className="flex items-center gap-1.5 mt-1">
              <span className={cn(
                "flex items-center text-xs font-bold px-2 py-0.5 rounded-full",
                trend === "up" 
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
                  : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
              )}>
                {trend === "up" ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
                {change}
              </span>
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">vs baseline</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}