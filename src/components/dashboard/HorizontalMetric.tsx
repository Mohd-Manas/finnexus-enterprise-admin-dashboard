import React from "react";
import { LucideIcon, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
interface HorizontalMetricProps {
  label: string;
  value: string;
  trend: string;
  trendValue: "up" | "down";
  icon: LucideIcon;
}
export function HorizontalMetric({ label, value, trend, trendValue, icon: Icon }: HorizontalMetricProps) {
  const isUp = trendValue === "up";
  return (
    <div className="group flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:bg-[#020B4B]/5 dark:hover:bg-blue-500/5 hover:scale-[1.01] transition-all duration-200 cursor-default shadow-sm">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-lg bg-[#020B4B] dark:bg-blue-600 flex items-center justify-center shrink-0 shadow-glow group-hover:scale-110 transition-transform">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80 leading-tight">
            {label}
          </span>
          <span className="text-lg font-black tracking-tight text-foreground leading-none mt-1">
            {value}
          </span>
        </div>
      </div>
      <div className={cn(
        "flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter",
        isUp ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
      )}>
        {isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
        {trend}
      </div>
    </div>
  );
}