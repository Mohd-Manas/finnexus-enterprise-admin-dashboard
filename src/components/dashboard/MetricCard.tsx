import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpRight,
  ArrowDownRight,
  LucideIcon,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Zap,
  CreditCard,
  Layers,
  Activity,
  BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";
const ICONS: Record<string, LucideIcon> = {
  DollarSign,
  Users,
  Zap,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Layers,
  Activity,
  BarChart3
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
      <Card className="overflow-hidden transition-all duration-300 hover:scale-[1.05] hover:shadow-glow-lg border-slate-200 dark:border-slate-800 bg-background/60 backdrop-blur-sm group cursor-default">
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-4">
            <p className="text-sm font-black text-muted-foreground uppercase tracking-[0.2em] leading-tight">
              {title}
            </p>
            <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center transition-all group-hover:bg-primary/10 border border-transparent group-hover:border-primary/20 shrink-0">
              <Icon className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 mt-1">
            <h2 className="text-3xl font-black tracking-tight text-foreground tabular-nums drop-shadow-sm leading-none">
              {value}
            </h2>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className={cn(
                "flex items-center text-[10px] font-black px-2 py-0.5 rounded border uppercase tracking-wider whitespace-nowrap",
                trend === "up"
                  ? "bg-emerald-600 text-white border-emerald-500 shadow-sm"
                  : "bg-rose-600 text-white border-rose-500 shadow-sm"
              )}>
                {trend === "up" ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
                {change}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}