import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { HorizontalMetric } from "@/components/dashboard/HorizontalMetric";
import { CompactStat } from "@/components/dashboard/CompactStat";
import { 
  DASHBOARD_MARKETING_STATS, 
  DASHBOARD_BACKOFFICE_STATS, 
  DASHBOARD_TASK_STATS, 
  PNL_CHART_DATA 
} from "@/shared/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";
import { 
  RefreshCcw, 
  FileDown, 
  LayoutGrid, 
  Layers, 
  Activity, 
  ShieldCheck, 
  Zap, 
  ChevronRight,
  TrendingUp
} from "lucide-react";
import { toast } from "sonner";
export function DashboardOverview() {
  const handleRefresh = () => {
    toast.info("Establishing terminal handshake...", { description: "Resyncing global node clusters." });
  };
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-10 animate-fade-in">
        {/* Header section with Enterprise Branding */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter text-[#020B4B] dark:text-white uppercase">
              Enterprise Control Dashboard
            </h1>
            <p className="text-muted-foreground text-xs font-black uppercase tracking-[0.3em] opacity-60">
              Terminal Session: HK-PRO-9442 • Status: Authorized
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-10 text-[10px] font-black uppercase tracking-widest px-4 border-slate-300 dark:border-slate-700 shadow-sm"
              onClick={handleRefresh}
            >
              <RefreshCcw className="h-3.5 w-3.5 mr-2" /> Refresh Node
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="h-10 text-[10px] font-black uppercase tracking-widest px-4 bg-[#020B4B] hover:bg-[#1E3A8A] shadow-glow"
            >
              <FileDown className="h-3.5 w-3.5 mr-2" /> Global Export
            </Button>
          </div>
        </div>
        {/* 2x2 High-Density Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Dealing Sector (Analytical Focus) */}
          <Card className="col-span-1 border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 backdrop-blur-xl shadow-glow-lg overflow-hidden flex flex-col">
            <CardHeader className="border-b bg-slate-50/50 dark:bg-slate-900/50 px-6 py-4 flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-4 w-4 text-[#020B4B] dark:text-blue-400" />
                <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Dealing Performance Sector</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="h-7 text-[9px] font-black uppercase tracking-widest">
                Full Metrics <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col justify-between space-y-8">
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={PNL_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="navGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#020B4B" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#020B4B" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "hsl(var(--background))", borderColor: "hsl(var(--border))", borderRadius: "12px", fontSize: "10px", fontWeight: 900 }}
                      itemStyle={{ color: "#020B4B" }}
                    />
                    <Area type="monotone" dataKey="pnl" stroke="#020B4B" strokeWidth={4} fill="url(#navGradient)" animationDuration={1500} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <HorizontalMetric label="Daily Exposure" value="$42.8M" trend="+5.4%" trendValue="up" icon={Layers} />
                <HorizontalMetric label="Margin Risk" value="2.1%" trend="-0.8%" trendValue="down" icon={ShieldCheck} />
                <HorizontalMetric label="Active Nodes" value="24" trend="+2" trendValue="up" icon={Activity} />
                <HorizontalMetric label="Avg Latency" value="1.2ms" trend="-0.1ms" trendValue="down" icon={Zap} />
              </div>
            </CardContent>
          </Card>
          {/* Card 2: Marketing Intelligence (Compact Stats Grid) */}
          <Card className="col-span-1 border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 backdrop-blur-xl shadow-glow-lg overflow-hidden">
            <CardHeader className="border-b bg-slate-50/50 dark:bg-slate-900/50 px-6 py-4">
              <div className="flex items-center gap-3">
                <LayoutGrid className="h-4 w-4 text-emerald-500" />
                <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Marketing Intelligence</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-2 gap-x-12 gap-y-12">
                {DASHBOARD_MARKETING_STATS.map((stat, i) => (
                  <CompactStat 
                    key={i}
                    label={stat.label}
                    value={stat.value}
                    trend={stat.trend}
                    progress={stat.progress}
                    colorClass="bg-emerald-500"
                  />
                ))}
              </div>
              <div className="mt-12 pt-8 border-t border-dashed border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Acquisition Efficiency</p>
                    <p className="text-sm font-black text-[#020B4B] dark:text-blue-400 uppercase">94.2 Score Index</p>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 text-[9px] font-black uppercase tracking-[0.2em] border-emerald-500/30 text-emerald-600 bg-emerald-500/5">Optimize Channel</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Card 3: Operations Center (Back Office Velocity) */}
          <Card className="col-span-1 border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 backdrop-blur-xl shadow-glow-lg overflow-hidden">
            <CardHeader className="border-b bg-slate-50/50 dark:bg-slate-900/50 px-6 py-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-blue-500" />
                <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Operations Center</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-2 gap-x-12 gap-y-12">
                {DASHBOARD_BACKOFFICE_STATS.map((stat, i) => (
                  <CompactStat 
                    key={i}
                    label={stat.label}
                    value={stat.value}
                    trend={stat.trend}
                    progress={stat.progress}
                    isCritical={(stat as any).isCritical}
                    colorClass="bg-[#020B4B]"
                  />
                ))}
              </div>
              <div className="mt-12 pt-8 border-t border-dashed border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Compliance Radar</p>
                    <p className="text-sm font-black text-rose-600 uppercase">3 High Severity Alerts</p>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 text-[9px] font-black uppercase tracking-[0.2em] border-rose-500/30 text-rose-600 bg-rose-500/5">Scrub Node</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Card 4: Task Force Command (Sprint & Load) */}
          <Card className="col-span-1 border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 backdrop-blur-xl shadow-glow-lg overflow-hidden">
            <CardHeader className="border-b bg-slate-50/50 dark:bg-slate-900/50 px-6 py-4">
              <div className="flex items-center gap-3">
                <Activity className="h-4 w-4 text-indigo-500" />
                <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Task Force Command</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-2 gap-x-12 gap-y-12">
                {DASHBOARD_TASK_STATS.map((stat, i) => (
                  <CompactStat 
                    key={i}
                    label={stat.label}
                    value={stat.value}
                    trend={stat.trend}
                    progress={stat.progress}
                    colorClass="bg-indigo-600"
                  />
                ))}
              </div>
              <div className="mt-12 pt-8 border-t border-dashed border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Team Capacity</p>
                    <p className="text-sm font-black text-indigo-600 uppercase">Available bandwidth found</p>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 text-[9px] font-black uppercase tracking-[0.2em] border-indigo-500/30 text-indigo-600 bg-indigo-500/5">Assign Cluster</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Audit Branding Footer */}
        <div className="flex justify-center pt-4 border-t border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em] opacity-50">
            SkyLinks Security Protocol Audit Hub v4.9.2-GOLD • Verified Sessions: 1,242
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}