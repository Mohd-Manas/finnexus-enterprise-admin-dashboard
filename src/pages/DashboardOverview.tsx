import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { HorizontalMetric } from "@/components/dashboard/HorizontalMetric";
import { CompactStat } from "@/components/dashboard/CompactStat";
import {
  DASHBOARD_MARKETING_STATS,
  DASHBOARD_BACKOFFICE_STATS,
  DASHBOARD_TASK_STATS,
  PNL_CHART_DATA,
  CHANNEL_BREAKDOWN,
  COMPLIANCE_TYPE_STATS,
  TASK_STATUS_STATS
} from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
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
    toast.info("Establishing terminal handshake...", {
      description: "Resyncing global node clusters and clear-air data feeds."
    });
  };
  const TOOLTIP_STYLE = {
    backgroundColor: "hsl(var(--background))",
    borderColor: "hsl(var(--border))",
    borderRadius: "12px",
    fontSize: "10px",
    fontWeight: 900,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    border: "1px solid hsl(var(--border))"
  } as const;
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 space-y-10 animate-fade-in">
        {/* Header section with Enterprise Branding */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter text-[#020B4B] dark:text-white uppercase">
              Enterprise Control Dashboard
            </h1>
            <p className="text-muted-foreground text-xs font-black uppercase tracking-[0.3em] opacity-60">
              Terminal Session: HK-PRO-9442 • Status: Authorized • 256-Bit Encrypted
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="outline"
              size="sm"
              className="h-10 text-[10px] font-black uppercase tracking-widest px-4 border-slate-300 dark:border-slate-700 shadow-sm transition-all hover:bg-slate-100 dark:hover:bg-slate-900"
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
          {/* Sector 1: Dealing Desk (Analytical Focus) */}
          <Card className="col-span-1 border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 backdrop-blur-xl shadow-glow-lg overflow-hidden flex flex-col transition-all hover:shadow-primary/5">
            <CardHeader className="border-b bg-slate-50/50 dark:bg-slate-900/50 px-6 py-4 flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-4 w-4 text-[#020B4B] dark:text-blue-400" />
                <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Dealing Performance Sector</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="h-7 text-[9px] font-black uppercase tracking-widest hover:text-primary">
                Full Metrics <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col gap-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <HorizontalMetric label="Daily Exposure" value="$42.8M" trend="+5.4%" trendValue="up" icon={Layers} />
                <HorizontalMetric label="Margin Risk" value="2.1%" trend="-0.8%" trendValue="down" icon={ShieldCheck} />
                <HorizontalMetric label="Active Nodes" value="24" trend="+2" trendValue="up" icon={Activity} />
                <HorizontalMetric label="Avg Latency" value="1.2ms" trend="-0.1ms" trendValue="down" icon={Zap} />
              </div>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={PNL_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="dealingNavGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#020B4B" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#020B4B" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip contentStyle={TOOLTIP_STYLE} itemStyle={{ color: "#020B4B" }} />
                    <Area type="monotone" dataKey="pnl" stroke="#020B4B" strokeWidth={3} fill="url(#dealingNavGradient)" animationDuration={1500} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          {/* Sector 2: Marketing Intelligence */}
          <Card className="col-span-1 border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 backdrop-blur-xl shadow-glow-lg overflow-hidden flex flex-col">
            <CardHeader className="border-b bg-slate-50/50 dark:bg-slate-900/50 px-6 py-4 flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <LayoutGrid className="h-4 w-4 text-emerald-500" />
                <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Marketing Intelligence</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="h-7 text-[9px] font-black uppercase tracking-widest hover:text-emerald-500">
                Campaigns <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="p-6 space-y-8 flex-1 flex flex-col">
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
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
              <div className="flex-1 flex flex-col min-h-[220px]">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-4 text-center">Node Channel Acquisition</p>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={CHANNEL_BREAKDOWN}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      animationDuration={1500}
                    >
                      {CHANNEL_BREAKDOWN.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2">
                   {CHANNEL_BREAKDOWN.map((c, i) => (
                     <div key={i} className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-tighter">
                       <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c.fill }} />
                       {c.name}
                     </div>
                   ))}
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Sector 3: Operations Center */}
          <Card className="col-span-1 border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 backdrop-blur-xl shadow-glow-lg overflow-hidden flex flex-col">
            <CardHeader className="border-b bg-slate-50/50 dark:bg-slate-900/50 px-6 py-4 flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-blue-500" />
                <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Operations Center</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="h-7 text-[9px] font-black uppercase tracking-widest hover:text-blue-500">
                Audit Flow <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="p-6 space-y-8 flex-1 flex flex-col">
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                {DASHBOARD_BACKOFFICE_STATS.map((stat, i) => (
                  <CompactStat
                    key={i}
                    label={stat.label}
                    value={stat.value}
                    trend={stat.trend}
                    progress={stat.progress}
                    isCritical={stat.label === "Queue Load"}
                    colorClass="bg-[#020B4B]"
                  />
                ))}
              </div>
              <div className="flex-1 min-h-[220px] flex flex-col">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-4 text-center">Compliance Log Volume</p>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={COMPLIANCE_TYPE_STATS} layout="vertical" margin={{ left: 20, right: 20 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900, fill: "hsl(var(--muted-foreground))" }} width={60} />
                    <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'transparent' }} />
                    <Bar dataKey="volume" fill="#020B4B" radius={[0, 4, 4, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          {/* Sector 4: Task Force Command */}
          <Card className="col-span-1 border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 backdrop-blur-xl shadow-glow-lg overflow-hidden flex flex-col">
            <CardHeader className="border-b bg-slate-50/50 dark:bg-slate-900/50 px-6 py-4 flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity className="h-4 w-4 text-indigo-500" />
                <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Task Force Command</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="h-7 text-[9px] font-black uppercase tracking-widest hover:text-indigo-500">
                Squad Status <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="p-6 space-y-8 flex-1 flex flex-col">
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
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
              <div className="flex-1 min-h-[220px] flex flex-col">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-4 text-center">Sprint Status Distribution</p>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={TASK_STATUS_STATS}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      animationDuration={1500}
                      stroke="transparent"
                    >
                      {TASK_STATUS_STATS.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2">
                   {TASK_STATUS_STATS.map((s, i) => (
                     <div key={i} className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-tighter">
                       <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: s.fill }} />
                       {s.name}
                     </div>
                   ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Audit Branding Footer */}
        <div className="flex justify-center pt-4 border-t border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em] opacity-50">
            SkyLinks Security Protocol Audit Hub v4.9.2-GOLD • Node Clusters: 2,841 • Latency: 1.2ms
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}