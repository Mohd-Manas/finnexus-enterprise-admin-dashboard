import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { PnLChart } from "@/components/dashboard/charts/PnLChart";
import { MarginChart } from "@/components/dashboard/charts/MarginChart";
import { TOP_SYMBOLS } from "@/lib/mock-data";
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
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dealing Desk</h1>
            <p className="text-muted-foreground">Real-time exposure and margin monitoring.</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="px-3 py-1 font-mono text-[10px] border-slate-200 dark:border-slate-800">SERVER: HK-CORE-01</Badge>
            <Badge
              variant="default"
              className={cn(
                "px-3 py-1 bg-emerald-500 cursor-pointer transition-all active:scale-95 flex items-center gap-1.5",
                isRefreshing ? "opacity-50" : "animate-pulse"
              )}
              onClick={handleRefresh}
            >
              <RefreshCcw className={cn("h-3 w-3", isRefreshing && "animate-spin")} />
              {isRefreshing ? "SYNCING..." : "LIVE FEED"}
            </Badge>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard title="Gross Exposure" value="$184.2M" trend="up" change="+4.3%" icon="TrendingUp" />
          <MetricCard title="Net P&L" value="+$428.1k" trend="up" change="+12.1%" icon="DollarSign" />
          <MetricCard title="Maintenance Margin" value="$12.8M" trend="down" change="-0.4%" icon="Zap" />
          <MetricCard title="Account Variance" value="0.08%" trend="down" change="-2.5%" icon="TrendingDown" />
        </div>
        <div className="grid gap-6 lg:grid-cols-4">
          <PnLChart />
          <MarginChart />
        </div>
        <Card className="border-slate-200 dark:border-slate-800 bg-background/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold tracking-tight">Active Market Symbols</CardTitle>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
            <div className="overflow-x-auto pb-2">
              <Table className="min-w-[600px]">
                <TableHeader>
                  <TableRow className="border-slate-100 dark:border-slate-800">
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Symbol</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Volume (24h)</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Change</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Sentiment</TableHead>
                    <TableHead className="text-right text-[10px] font-black uppercase tracking-widest">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {TOP_SYMBOLS.map((s) => (
                    <TableRow key={s.symbol} className="hover:bg-muted/30 transition-colors border-slate-100 dark:border-slate-800">
                      <TableCell className="font-bold tracking-tight">{s.symbol}</TableCell>
                      <TableCell className="text-muted-foreground font-medium tabular-nums">{s.volume}</TableCell>
                      <TableCell className={cn(
                        "font-bold tabular-nums",
                        s.change.startsWith("+") ? "text-emerald-500" : "text-rose-500"
                      )}>
                        {s.change}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={cn(
                            "text-[10px] font-bold uppercase tracking-tight",
                            s.status === "Bullish" && "bg-emerald-500/10 text-emerald-600 border-none",
                            s.status === "Bearish" && "bg-rose-500/10 text-rose-600 border-none",
                            s.status === "Volatile" && "bg-amber-500/10 text-amber-600 border-none",
                            s.status === "Neutral" && "bg-slate-500/10 text-slate-600 border-none"
                          )}
                        >
                          {s.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <button
                          className="text-xs font-black uppercase tracking-wider text-primary hover:underline"
                          onClick={() => handleTradeDetails(s.symbol)}
                        >
                          Trade Details
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