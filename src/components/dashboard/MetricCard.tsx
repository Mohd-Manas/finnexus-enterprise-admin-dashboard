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
  BarChart3,
  Bell
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
  BarChart3,
  Bell
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
        <CardContent className="p-5 lg:p-6 xl:p-8">
          <div className="flex items-start justify-between pb-4 min-w-0">
            {/* min-h keeps layout stable even if titles wrap differently */}
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest leading-tight break-words flex-1 min-h-[2.5rem]">
              {title}
            </p>
            {/* shrink-0 ensures the icon container remains perfectly square */}
            <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center transition-all group-hover:bg-primary/10 border border-transparent group-hover:border-primary/20 shrink-0 ml-2 shadow-sm">
              <Icon className="h-6 w-6 text-primary shrink-0" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 mt-1">
            <h2 className="text-2xl xl:text-3xl font-black tracking-tight text-foreground tabular-nums drop-shadow-sm leading-none truncate">
              {value}
            </h2>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className={cn(
                "flex items-center text-[10px] font-black px-2 py-1 rounded-lg border uppercase tracking-wider whitespace-nowrap shadow-sm transition-colors",
                trend === "up"
                  ? "bg-emerald-600 text-white border-emerald-500"
                  : "bg-rose-600 text-white border-rose-500"
              )}>
                {trend === "up" ? <ArrowUpRight className="mr-0.5 h-3 w-3" /> : <ArrowDownRight className="mr-0.5 h-3 w-3" />}
                {change}
              </span>
              <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tighter">vs prev session</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}