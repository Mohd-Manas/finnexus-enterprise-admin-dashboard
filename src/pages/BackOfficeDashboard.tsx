import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { BACKOFFICE_TICKETS, COMPLIANCE_ALERTS, BACKOFFICE_METRICS } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AlertCircle, CheckCircle2, Clock, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
export function BackOfficeDashboard() {
  const [payouts, setPayouts] = useState([
    { id: 1, amount: "$12,400.00", user: "#44092", method: "Bank Wire" },
    { id: 2, amount: "$8,150.00", user: "#39201", method: "Crypto (USDT)" },
    { id: 3, amount: "$2,900.00", user: "#45112", method: "SEPA" },
  ]);
  const handlePayoutAction = (id: number, action: 'approve' | 'reject') => {
    const amount = payouts.find(p => p.id === id)?.amount;
    setPayouts(prev => prev.filter(p => p.id !== id));
    if (action === 'approve') {
      toast.success(`Payout of ${amount} authorized successfully.`);
    } else {
      toast.error(`Payout request ${id} has been rejected.`);
    }
  };
  const handleTicketManage = (ticketId: string) => {
    toast.info(`Opening terminal for ticket ${ticketId}...`);
  };
  const handleTaskClick = (taskName: string) => {
    toast.success(`Task "${taskName}" status updated.`);
  };
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Operations Center</h1>
          <p className="text-muted-foreground text-sm font-medium">Compliance monitoring and back-office support workflows.</p>
        </div>
        {/* Refined 3-column metric grid for optimal operational focus */}
        <div className="grid gap-6 md:grid-cols-3">
          {BACKOFFICE_METRICS.map((metric, i) => (
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
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Compliance Radar */}
          <Card className="lg:col-span-4 border-slate-200 dark:border-slate-800 bg-background/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-base font-bold tracking-tight">Compliance Radar</CardTitle>
              <ShieldAlert className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {COMPLIANCE_ALERTS.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-4 p-4 rounded-xl bg-secondary/5 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-colors">
                    <div className={`mt-1 h-2 w-2 rounded-full ${alert.severity === 'Critical' ? 'bg-destructive animate-pulse' : 'bg-amber-500'}`} />
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{alert.type}</span>
                        <span className="text-[9px] font-bold text-muted-foreground/60">{alert.time}</span>
                      </div>
                      <p className="text-sm font-bold tracking-tight">{alert.source}</p>
                      <Badge variant={alert.severity === 'Critical' ? 'destructive' : 'outline'} className="text-[9px] h-4 px-1.5 font-black uppercase tracking-tighter">
                        {alert.severity}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-6 text-[10px] font-black uppercase tracking-[0.2em] h-10 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900"
                onClick={() => toast.info("Accessing Risk Terminal...")}
              >
                ACCESS RISK TERMINAL
              </Button>
            </CardContent>
          </Card>
          {/* Support Tickets */}
          <Card className="lg:col-span-8 border-slate-200 dark:border-slate-800 bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold tracking-tight">Priority Support Tickets</CardTitle>
            </CardHeader>
            <CardContent className="p-0 sm:p-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-100 dark:border-slate-800 hover:bg-transparent">
                      <TableHead className="text-[10px] font-black uppercase tracking-widest px-6 h-12">Ticket ID</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Subject</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Priority</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Assignee</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest h-12">Status</TableHead>
                      <TableHead className="text-right text-[10px] font-black uppercase tracking-widest px-6 h-12">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {BACKOFFICE_TICKETS.map((ticket) => (
                      <TableRow key={ticket.id} className="border-slate-100 dark:border-slate-800 hover:bg-muted/30 transition-colors">
                        <TableCell className="font-mono text-[10px] font-bold px-6 py-4">{ticket.id}</TableCell>
                        <TableCell className="text-sm font-bold tracking-tight py-4">{ticket.subject}</TableCell>
                        <TableCell className="py-4">
                          <Badge variant={ticket.priority === 'High' ? 'destructive' : 'secondary'} className="text-[9px] font-black h-4 px-1.5 uppercase">
                            {ticket.priority}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6 border-slate-200">
                              <AvatarFallback className="text-[10px] font-black bg-primary/5 text-primary">{ticket.assignee[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-[10px] font-bold uppercase tracking-wider">{ticket.assignee}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            {ticket.status === 'Open' ? <AlertCircle className="h-3 w-3 text-amber-500" /> : <Clock className="h-3 w-3" />}
                            {ticket.status}
                          </div>
                        </TableCell>
                        <TableCell className="text-right px-6 py-4">
                          <Button variant="ghost" size="sm" className="text-[9px] font-black uppercase tracking-widest h-8" onClick={() => handleTicketManage(ticket.id)}>Manage</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Payouts Section */}
          <Card className="border-slate-200 dark:border-slate-800 bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold tracking-tight">Pending Payout Authorizations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {payouts.map((payout) => (
                    <motion.div
                      key={payout.id}
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 border rounded-2xl border-dashed bg-background/50 gap-4 transition-all hover:bg-slate-50 dark:hover:bg-slate-900"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center shrink-0 border border-emerald-200/50 dark:border-emerald-800/50">
                          <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-lg font-black tracking-tight leading-none">{payout.amount}</p>
                          <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest leading-none mt-2">
                            User: {payout.user} ��� {payout.method}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-10 flex-1 sm:flex-none text-[10px] font-black tracking-widest hover:bg-destructive/10 hover:text-destructive uppercase border-slate-300"
                          onClick={() => handlePayoutAction(payout.id, 'reject')}
                        >
                          REJECT
                        </Button>
                        <Button
                          size="sm"
                          className="h-10 flex-1 sm:flex-none text-[10px] font-black tracking-widest bg-emerald-600 hover:bg-emerald-700 uppercase shadow-md"
                          onClick={() => handlePayoutAction(payout.id, 'approve')}
                        >
                          APPROVE
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                  {payouts.length === 0 && (
                    <div className="py-16 text-center text-muted-foreground/30 text-[10px] font-black uppercase tracking-[0.3em] border-2 border-dashed rounded-2xl">
                      Queue clear: No pending authorizations
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
          {/* Compliance Tasks */}
          <Card className="border-slate-200 dark:border-slate-800 bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold tracking-tight">Quick Compliance Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Daily AML Scrub", status: "COMPLETED", variant: "default" as const },
                { label: "Exposure Limit Review", status: "PENDING", variant: "outline" as const, color: "border-amber-500/50 text-amber-600" },
                { label: "Quarterly Audit Report", status: "IN PROGRESS", variant: "outline" as const, color: "border-primary/50 text-primary" }
              ].map((task) => (
                <div
                  key={task.label}
                  className="flex items-center justify-between p-5 bg-secondary/5 rounded-2xl border border-transparent hover:border-primary/20 cursor-pointer transition-all active:scale-[0.98]"
                  onClick={() => handleTaskClick(task.label)}
                >
                  <p className="text-sm font-black tracking-tight">{task.label}</p>
                  <Badge variant={task.variant} className={cn("font-black text-[9px] px-2 h-5 tracking-widest", task.color)}>
                    {task.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}