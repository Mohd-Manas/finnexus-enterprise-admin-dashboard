import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { PnLChart } from "@/components/dashboard/charts/PnLChart";
import { MarginChart } from "@/components/dashboard/charts/MarginChart";
import { TOP_SYMBOLS, DEALING_METRICS } from "@/lib/mock-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
export function DealingDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const handleRefresh = () => {
    setIsRefreshing(true);
    toast.info("Resyncing core market data feed...");
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Feed synchronized. Zero latency detected.");
    }, 1200);
  };
  const handleTradeDetails = (symbol: string) => {
    toast.info(`Retrieving depth of market for ${symbol}...`, {
      description: "Secure node connection established."
    });
  };
  return (
    <DashboardLayout>
      <div className="space-y-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight">Dealing Desk</h1>
            <p className="text-muted-foreground text-sm font-medium">Real-time exposure and margin monitoring across secure nodes.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Badge variant="outline" className="px-4 py-1.5 font-mono text-[10px] font-bold border-slate-200 dark:border-slate-800 bg-background/50 backdrop-blur-sm">
              NODE: HK-CORE-01
            </Badge>
            <Badge
              variant="default"
              className={cn(
                "px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 cursor-pointer transition-all active:scale-95 flex items-center gap-2 border-none font-black text-[10px] tracking-widest uppercase",
                isRefreshing ? "opacity-50" : "animate-pulse"
              )}
              onClick={handleRefresh}
            >
              <RefreshCcw className={cn("h-3 w-3", isRefreshing && "animate-spin")} />
              {isRefreshing ? "SYNCING..." : "LIVE FEED"}
            </Badge>
          </div>
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          {DEALING_METRICS.map((metric, i) => (
            <MetricCard
              key={i}
              title={metric.title}
              value={metric.value}
              trend={metric.trend}
              change={metric.change}
              icon={metric.icon}
            />
          ))}
        </div>
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <PnLChart />
          </div>
          <div className="lg:col-span-1">
            <MarginChart />
          </div>
        </div>
        <Card className="border-slate-200 dark:border-slate-800 bg-background/50 backdrop-blur-sm overflow-hidden">
          <CardHeader className="border-b bg-slate-50/50 dark:bg-slate-900/50 py-4">
            <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Active Market Symbols</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table className="min-w-[800px]">
                <TableHeader>
                  <TableRow className="border-slate-100 dark:border-slate-800 hover:bg-transparent">
                    <TableHead className="text-[10px] font-black uppercase tracking-widest px-6 h-12">Symbol</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Volume (24h)</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Change</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Sentiment</TableHead>
                    <TableHead className="text-right text-[10px] font-black uppercase tracking-widest px-6 h-12">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {TOP_SYMBOLS.map((s) => (
                    <TableRow key={s.symbol} className="hover:bg-muted/30 transition-colors border-slate-100 dark:border-slate-800 group">
                      <TableCell className="font-bold tracking-tight px-6 py-4">{s.symbol}</TableCell>
                      <TableCell className="text-muted-foreground font-bold tabular-nums py-4">{s.volume}</TableCell>
                      <TableCell className={cn(
                        "font-black tabular-nums py-4",
                        s.change.startsWith("+") ? "text-emerald-500" : "text-rose-500"
                      )}>
                        {s.change}
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge
                          variant="secondary"
                          className={cn(
                            "text-[10px] font-black uppercase tracking-tighter px-2",
                            s.status === "Bullish" && "bg-emerald-500/10 text-emerald-600 border-none",
                            s.status === "Bearish" && "bg-rose-500/10 text-rose-600 border-none",
                            s.status === "Volatile" && "bg-amber-500/10 text-amber-600 border-none",
                            s.status === "Neutral" && "bg-slate-500/10 text-slate-600 border-none"
                          )}
                        >
                          {s.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-6 py-4">
                        <button
                          className="text-xs font-black uppercase tracking-[0.2em] text-primary hover:text-primary/70 transition-colors underline decoration-primary/30 underline-offset-4"
                          onClick={() => handleTradeDetails(s.symbol)}
                        >
                          Inspect
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}