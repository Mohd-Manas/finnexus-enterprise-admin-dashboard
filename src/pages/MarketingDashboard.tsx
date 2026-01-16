import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { MARKETING_CAMPAIGNS, CONVERSION_FUNNEL, TOP_CONTENT } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Calendar, FileText, Globe, MousePointerClick } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChannelBreakdownDonut, MarketingTrendsChart } from "@/components/dashboard/charts/MarketingCharts";
export function MarketingDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight">Marketing Intelligence</h1>
            <p className="text-muted-foreground text-sm font-bold uppercase tracking-wide opacity-70">Node acquisition funnel and multi-channel attribution analytics.</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2 h-11 text-[10px] font-black uppercase tracking-widest px-6 border-slate-300 dark:border-slate-700 shadow-sm">
            <Calendar className="h-4 w-4" />
            LIFETIME PROTOCOL DATA
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard title="Total Spend" value="$87,500" trend="up" change="+8.1%" icon="DollarSign" />
          <MetricCard title="New Leads" value="2,450" trend="up" change="+14.2%" icon="Users" />
          <MetricCard title="Avg CPA" value="$35.71" trend="down" change="-2.4%" icon="Zap" />
          <MetricCard title="Conversion Rate" value="4.8%" trend="up" change="+0.5%" icon="TrendingUp" />
        </div>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <MarketingTrendsChart />
          </div>
          <div className="lg:col-span-4">
            <ChannelBreakdownDonut />
          </div>
        </div>
        <div className="grid gap-8 lg:grid-cols-12">
          <Card className="lg:col-span-7 border-slate-200 dark:border-slate-800 bg-background/50 backdrop-blur-sm shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-black tracking-tight uppercase">Acquisition Funnel (Global Nodes)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={CONVERSION_FUNNEL}
                    margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
                    <XAxis type="number" hide />
                    <YAxis
                      dataKey="stage"
                      type="category"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fontWeight: 900, fill: "hsl(var(--muted-foreground))" }}
                    />
                    <Tooltip
                      cursor={{ fill: 'transparent' }}
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: 900
                      }}
                    />
                    <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={35}>
                      {CONVERSION_FUNNEL.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-5 border-slate-200 dark:border-slate-800 bg-background/50 backdrop-blur-sm shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-black tracking-tight uppercase">Active Campaign Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {MARKETING_CAMPAIGNS.map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-800">
                    <div className="flex items-center gap-4">
                      <div className={`h-2.5 w-2.5 rounded-full ${campaign.color} shadow-sm`} />
                      <div className="space-y-1">
                        <p className="text-sm font-black tracking-tight">{campaign.name}</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{campaign.leads} nodes generated</p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 tabular-nums">{campaign.roi} ROI</p>
                      <Badge variant={campaign.status === "Active" ? "default" : "secondary"} className="text-[8px] h-4 font-black uppercase tracking-widest">
                        {campaign.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-6 text-[10px] font-black uppercase tracking-[0.2em] h-10 hover:bg-primary/5 hover:text-primary transition-all">MANAGE GLOBAL CLUSTERS</Button>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <Globe className="h-5 w-5 text-primary" />
            <h2 className="text-sm font-black uppercase tracking-[0.25em] text-muted-foreground/80">Top Performing Content Assets</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {TOP_CONTENT.map((content) => (
              <Card key={content.id} className="border-slate-200 dark:border-slate-800 bg-background/60 backdrop-blur-sm transition-all hover:scale-[1.02] group cursor-default shadow-sm overflow-hidden">
                <CardHeader className="pb-3 flex flex-row items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0 border border-transparent group-hover:border-primary/20 transition-all">
                    {content.type === 'Blog' ? <FileText className="h-5 w-5 text-primary" /> : <MousePointerClick className="h-5 w-5 text-primary" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{content.type}</p>
                    <CardTitle className="text-sm font-black tracking-tight leading-none truncate mt-1">{content.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[9px] font-black text-muted-foreground/60 uppercase tracking-widest">Efficiency Index</p>
                      <p className="text-xl font-black tracking-tighter text-[#020B4B] dark:text-blue-400 mt-1">{content.metrics}</p>
                    </div>
                    <Badge variant="outline" className="text-[8px] font-black h-5 px-2 tracking-widest border-slate-300 dark:border-slate-700 uppercase">
                      {content.visits.toLocaleString()} VISITS
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="pt-4 border-t border-dashed flex justify-center">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em] opacity-50">
            SKYLINKS MARKETING INTELLIGENCE CORE v2.4.0-SECURE
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}