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
    <div className="animate-in slide-in-from-bottom-2 fade-in duration-500 ease-out [animation-fill-mode:forwards]">
      <Card className="overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-glow-lg border-slate-200 dark:border-slate-800 bg-background/60 backdrop-blur-sm group cursor-default">
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-3">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.25em]">{title}</p>
            <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center transition-colors group-hover:bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <h2 className="text-3xl font-black tracking-tighter text-foreground tabular-nums">{value}</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className={cn(
                "flex items-center text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider",
                trend === "up"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
              )}>
                {trend === "up" ? <ArrowUpRight className="mr-1 h-3.5 w-3.5" /> : <ArrowDownRight className="mr-1 h-3.5 w-3.5" />}
                {change}
              </span>
              <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest opacity-60">
                vs period baseline
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}