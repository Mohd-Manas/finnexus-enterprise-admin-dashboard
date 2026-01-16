import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { BACKOFFICE_TICKETS, COMPLIANCE_ALERTS } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AlertCircle, CheckCircle2, Clock, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
export function BackOfficeDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Operations Center</h1>
          <p className="text-muted-foreground">Compliance monitoring and back-office support workflows.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard title="Open Tickets" value="24" trend="up" change="+4" icon="Users" />
          <MetricCard title="Pending KYC" value="182" trend="down" change="-12" icon="Zap" />
          <MetricCard title="Compliance Alerts" value="3" trend="up" change="+1" icon="TrendingUp" />
          <MetricCard title="Avg Res. Time" value="1.4h" trend="down" change="-15m" icon="TrendingDown" />
        </div>
        <div className="grid gap-6 lg:grid-cols-12">
          <Card className="lg:col-span-4 border-slate-200 dark:border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold">Compliance Radar</CardTitle>
              <ShieldAlert className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {COMPLIANCE_ALERTS.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-4 p-3 rounded-lg bg-secondary/30">
                    <div className={`mt-1 h-2 w-2 rounded-full ${alert.severity === 'Critical' ? 'bg-destructive animate-pulse' : 'bg-amber-500'}`} />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider">{alert.type}</span>
                        <span className="text-[10px] text-muted-foreground">{alert.time}</span>
                      </div>
                      <p className="text-sm font-medium">{alert.source}</p>
                      <Badge variant={alert.severity === 'Critical' ? 'destructive' : 'outline'} className="text-[10px] h-4">
                        {alert.severity}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-6 text-xs">Access Risk Terminal</Button>
            </CardContent>
          </Card>
          <Card className="lg:col-span-8 border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Priority Support Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {BACKOFFICE_TICKETS.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-mono text-xs">{ticket.id}</TableCell>
                      <TableCell className="text-sm font-medium">{ticket.subject}</TableCell>
                      <TableCell>
                        <Badge variant={ticket.priority === 'High' ? 'destructive' : 'secondary'} className="text-[10px]">
                          {ticket.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-[10px]">{ticket.assignee[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs">{ticket.assignee}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          {ticket.status === 'Open' ? <AlertCircle className="h-3 w-3 text-amber-500" /> : <Clock className="h-3 w-3" />}
                          {ticket.status}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Manage</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Pending Payout Authorizations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg border-dashed">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">$12,400.00</p>
                        <p className="text-xs text-muted-foreground">User ID: #44092 - Bank Wire</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-8 text-[10px]">REJECT</Button>
                      <Button size="sm" className="h-8 text-[10px] bg-emerald-600 hover:bg-emerald-700">APPROVE</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Quick Compliance Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                <p className="text-sm font-medium">Daily AML Scrub</p>
                <Badge>COMPLETED</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                <p className="text-sm font-medium">Exposure Limit Review</p>
                <Badge variant="outline">PENDING</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                <p className="text-sm font-medium">Quarterly Audit Report</p>
                <Badge variant="outline">IN PROGRESS</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}