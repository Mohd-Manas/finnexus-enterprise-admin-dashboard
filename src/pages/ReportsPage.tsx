import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { REPORT_DATA, BACKOFFICE_TICKETS } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileDown, Share2, Filter, Loader2, LineChart as ChartIcon } from "lucide-react";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, Legend } from "recharts";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
export function ReportsPage() {
  const [isExporting, setIsExporting] = useState(false);
  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      toast.success("Audit log exported successfully", {
        description: "Report generated in CSV format."
      });
    }, 2000);
  };
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports & Audits</h1>
            <p className="text-muted-foreground text-sm font-medium">Historical performance and regulatory compliance logs.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2 h-10 text-xs font-bold px-4">
              <Filter className="h-4 w-4" /> Filters
            </Button>
            <Button
              variant="default"
              className="flex items-center gap-2 h-10 text-xs font-bold px-4"
              onClick={handleExport}
              disabled={isExporting}
            >
              {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileDown className="h-4 w-4" />}
              Export to CSV
            </Button>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-12">
          <Card className="lg:col-span-8 border-slate-200 dark:border-slate-800 bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <ChartIcon className="h-4 w-4 text-primary" />
                <CardTitle className="text-base font-bold tracking-tight">Operational Efficiency Trend</CardTitle>
              </div>
              <CardDescription className="text-xs font-medium">Aggregate team performance (%) vs request volume (6-month period).</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={REPORT_DATA} margin={{ left: -10, right: 20, top: 10 }}>
                    <defs>
                      <linearGradient id="efficiencyGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))", fontWeight: 700 }}
                    />
                    <YAxis
                      yAxisId="left"
                      orientation="left"
                      domain={[0, 100]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: "hsl(var(--primary))", fontWeight: 800 }}
                      unit="%"
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: "hsl(var(--chart-2))", fontWeight: 800 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "12px",
                        fontSize: "12px",
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                        fontWeight: 700
                      }}
                      formatter={(value: any, name: string) => [
                        name === 'efficiency' ? `${value}%` : `${value} units`,
                        name === 'efficiency' ? 'Team Efficiency' : 'Request Volume'
                      ]}
                    />
                    <Legend
                      verticalAlign="top"
                      height={36}
                      iconType="circle"
                      wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                    />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="efficiency"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      fill="url(#efficiencyGradient)"
                      name="efficiency"
                      animationDuration={1000}
                    />
                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="volume"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      fill="transparent"
                      name="volume"
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-4 border-slate-200 dark:border-slate-800 bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold tracking-tight">Key Efficiency Indicators</CardTitle>
              <CardDescription className="text-xs font-medium">Core performance benchmarks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { label: "Response SLA", val: 94, color: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/5" },
                { label: "Account Accuracy", val: 99.8, color: "bg-indigo-500", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-500/20", bg: "bg-indigo-500/5" },
                { label: "KYC Throughput", val: 72, color: "bg-amber-500", text: "text-amber-600 dark:text-amber-400", border: "border-amber-500/20", bg: "bg-amber-500/5" }
              ].map((ki) => (
                <div key={ki.label} className={cn("p-4 rounded-xl border", ki.bg, ki.border)}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={cn("text-[10px] font-black uppercase tracking-widest", ki.text)}>{ki.label}</span>
                    <span className="text-xs font-black tabular-nums">{ki.val}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${ki.val}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={cn("h-full rounded-full", ki.color)}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <Card className="border-slate-200 dark:border-slate-800 bg-background/50 backdrop-blur-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b bg-slate-50/50 dark:bg-slate-900/50 py-4">
            <div>
              <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Comprehensive Audit Log</CardTitle>
            </div>
            <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest h-8 flex items-center gap-1.5 hover:bg-primary/5">
              <Share2 className="h-3 w-3" /> Share Log
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-100 dark:border-slate-800 hover:bg-transparent">
                    <TableHead className="text-[10px] font-black uppercase tracking-widest h-12 px-6">Event ID</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Subject</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Status</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Department</TableHead>
                    <TableHead className="text-right text-[10px] font-black uppercase tracking-widest h-12 px-6">Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {BACKOFFICE_TICKETS.map((log) => (
                    <TableRow key={log.id} className="group border-slate-100 dark:border-slate-800 hover:bg-muted/30 transition-colors">
                      <TableCell className="font-mono text-[10px] text-muted-foreground group-hover:text-foreground transition-colors px-6">
                        {log.id}
                      </TableCell>
                      <TableCell className="font-bold text-sm tracking-tight">{log.subject}</TableCell>
                      <TableCell>
                        <Badge
                          variant={log.status === "Closed" ? "outline" : "default"}
                          className={cn(
                            "text-[9px] font-black uppercase tracking-tighter px-1.5 h-4",
                            log.status === "Closed" ? "border-slate-200 text-muted-foreground" : "bg-primary/10 text-primary border-none"
                          )}
                        >
                          {log.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                        Ops / {log.assignee}
                      </TableCell>
                      <TableCell className="text-right text-[10px] font-bold text-muted-foreground whitespace-nowrap px-6">
                        Today, 09:42 AM
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