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
    <div className="animate-in slide-in-from-bottom-2 fade-in duration-500 ease-out [animation-fill-mode:forwards] transition-all duration-300 hover:scale-[1.01]">
      <Card className="overflow-hidden transition-all hover:shadow-lg border-slate-200 dark:border-slate-800 bg-background/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">{title}</p>
            <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shadow-inner">
              <Icon className="h-4 w-4 text-primary" />
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">{value}</h2>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className={cn(
                "flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full",
                trend === "up"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
              )}>
                {trend === "up" ? <ArrowUpRight className="mr-0.5 h-3 w-3" /> : <ArrowDownRight className="mr-0.5 h-3 w-3" />}
                {change}
              </span>
              <span className="text-[9px] text-muted-foreground/80 font-bold uppercase tracking-widest">
                vs baseline
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}