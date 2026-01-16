import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { REPORT_DATA, BACKOFFICE_TICKETS } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileDown, Share2, Filter, Loader2, LineChart as ChartIcon } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
export function ReportsPage() {
  const [isExporting, setIsExporting] = useState(false);
  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 2000);
  };
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports & Audits</h1>
            <p className="text-muted-foreground">Historical performance and regulatory compliance logs.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" /> Filters
            </Button>
            <Button 
              variant="default" 
              className="flex items-center gap-2" 
              onClick={handleExport}
              disabled={isExporting}
            >
              {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileDown className="h-4 w-4" />}
              Export to CSV
            </Button>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-12">
          <Card className="lg:col-span-8 border-slate-200 dark:border-slate-800">
            <CardHeader>
              <div className="flex items-center gap-2">
                <ChartIcon className="h-4 w-4 text-primary" />
                <CardTitle className="text-base font-semibold">Operational Efficiency Trend</CardTitle>
              </div>
              <CardDescription>Aggregate team performance vs request volume (6-month period).</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={REPORT_DATA}>
                    <defs>
                      <linearGradient id="efficiencyGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} 
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="efficiency" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3} 
                      fill="url(#efficiencyGradient)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="volume" 
                      stroke="hsl(var(--chart-2))" 
                      strokeWidth={2} 
                      strokeDasharray="5 5"
                      fill="transparent" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-4 border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Key Efficiency Indicators</CardTitle>
              <CardDescription>Performance benchmarks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Response SLA</span>
                  <span className="text-sm font-bold">94%</span>
                </div>
                <div className="h-1.5 w-full bg-emerald-100 dark:bg-emerald-900/20 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[94%]" />
                </div>
              </div>
              <div className="p-4 rounded-lg bg-indigo-500/5 border border-indigo-500/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">Account Accuracy</span>
                  <span className="text-sm font-bold">99.8%</span>
                </div>
                <div className="h-1.5 w-full bg-indigo-100 dark:bg-indigo-900/20 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-[99.8%]" />
                </div>
              </div>
              <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-amber-600 dark:text-amber-400">KYC Throughput</span>
                  <span className="text-sm font-bold">72%</span>
                </div>
                <div className="h-1.5 w-full bg-amber-100 dark:bg-amber-900/20 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[72%]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Comprehensive Audit Log</CardTitle>
              <CardDescription>Filtered records of significant platform operations.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1">
              <Share2 className="h-3 w-3" /> Share Log
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event ID</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned Dept</TableHead>
                  <TableHead className="text-right">Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {BACKOFFICE_TICKETS.map((log) => (
                  <TableRow key={log.id} className="group">
                    <TableCell className="font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                      {log.id}
                    </TableCell>
                    <TableCell className="font-medium">{log.subject}</TableCell>
                    <TableCell>
                      <Badge variant={log.status === "Closed" ? "outline" : "default"} className="text-[10px]">
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">Operations / {log.assignee}</TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">Today, 09:42 AM</TableCell>
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