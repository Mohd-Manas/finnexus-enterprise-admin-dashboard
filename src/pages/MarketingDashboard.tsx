import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { MARKETING_CAMPAIGNS, CONVERSION_FUNNEL } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
export function MarketingDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Marketing Analytics</h1>
            <p className="text-muted-foreground">Campaign performance and acquisition metrics.</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Last 30 Days
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard title="Total Spend" value="$87,500" trend="up" change="+8.1%" icon="DollarSign" />
          <MetricCard title="New Leads" value="2,450" trend="up" change="+14.2%" icon="Users" />
          <MetricCard title="Avg CPA" value="$35.71" trend="down" change="-2.4%" icon="Zap" />
          <MetricCard title="Conversion Rate" value="4.8%" trend="up" change="+0.5%" icon="TrendingUp" />
        </div>
        <div className="grid gap-6 lg:grid-cols-12">
          <Card className="lg:col-span-7 border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Acquisition Funnel</CardTitle>
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
                      tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                    />
                    <Tooltip
                      cursor={{ fill: 'transparent' }}
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={40}>
                      {CONVERSION_FUNNEL.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-5 border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Active Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {MARKETING_CAMPAIGNS.map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${campaign.color}`} />
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">{campaign.name}</p>
                        <p className="text-xs text-muted-foreground">{campaign.leads} leads generated</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{campaign.roi}</p>
                      <Badge variant={campaign.status === "Active" ? "default" : "secondary"} className="text-[10px] h-4">
                        {campaign.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-6 text-xs font-semibold">Manage All Campaigns</Button>
            </CardContent>
          </Card>
        </div>
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Campaign Performance Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total Spend</TableHead>
                  <TableHead>Leads</TableHead>
                  <TableHead>ROI</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MARKETING_CAMPAIGNS.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell>
                      <Badge variant={c.status === "Active" ? "default" : "outline"}>{c.status}</Badge>
                    </TableCell>
                    <TableCell>{c.spend}</TableCell>
                    <TableCell>{c.leads}</TableCell>
                    <TableCell className="font-semibold text-emerald-600 dark:text-emerald-400">{c.roi}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Details</Button>
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