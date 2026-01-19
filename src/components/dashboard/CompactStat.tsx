import React from "react";
import { cn } from "@/lib/utils";
interface CompactStatProps {
  label: string;
  value: string;
  trend: string;
  isCritical?: boolean;
  progress: number;
  colorClass?: string;
}
export function CompactStat({ label, value, trend, isCritical, progress, colorClass = "bg-[#020B4B]" }: CompactStatProps) {
  return (
    <div className="space-y-3 p-2 group">
      <div className="flex flex-col space-y-1">
        <span className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.2em] leading-none">
          {label}
        </span>
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-xl font-black tracking-tighter text-foreground tabular-nums">
            {value}
          </span>
          <span className={cn(
            "text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter",
            isCritical ? "bg-rose-500 text-white animate-pulse" : "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10"
          )}>
            {trend}
          </span>
        </div>
      </div>
      <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div 
          className={cn("h-full transition-all duration-1000 ease-out", colorClass)}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}