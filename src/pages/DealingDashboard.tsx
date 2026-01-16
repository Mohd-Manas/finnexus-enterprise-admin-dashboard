import React from "react";
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
export function DealingDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dealing Desk</h1>
            <p className="text-muted-foreground">Real-time exposure and margin monitoring.</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="px-3 py-1 font-mono">SERVER: HK-CORE-01</Badge>
            <Badge variant="default" className="px-3 py-1 bg-emerald-500 animate-pulse">LIVE FEED</Badge>
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
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Active Market Symbols</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Volume (24h)</TableHead>
                  <TableHead>Change</TableHead>
                  <TableHead>Sentiment</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {TOP_SYMBOLS.map((s) => (
                  <TableRow key={s.symbol}>
                    <TableCell className="font-bold">{s.symbol}</TableCell>
                    <TableCell className="text-muted-foreground">{s.volume}</TableCell>
                    <TableCell className={s.change.startsWith("+") ? "text-emerald-500" : "text-rose-500"}>
                      {s.change}
                    </TableCell>
                    <TableCell>
                      <Badge variant={s.status === "Bullish" ? "default" : s.status === "Bearish" ? "destructive" : "secondary"}>
                        {s.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <button className="text-xs font-semibold text-primary hover:underline">Trade Details</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}