import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TICKET_PRIORITY_STATS, COMPLIANCE_TYPE_STATS } from "@/lib/mock-data";
export function TicketPriorityChart() {
  return (
    <Card className="border-slate-200 dark:border-slate-800 bg-background/50 backdrop-blur-sm shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-bold tracking-tight">Tickets by Priority</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={TICKET_PRIORITY_STATS} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fontWeight: 700, fill: "hsl(var(--muted-foreground))" }} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fontWeight: 700, fill: "hsl(var(--muted-foreground))" }} 
              />
              <Tooltip
                cursor={{ fill: 'hsl(var(--muted))', opacity: 0.1 }}
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "12px",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  fontSize: "12px",
                  fontWeight: 800
                }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={45}>
                {TICKET_PRIORITY_STATS.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
export function ComplianceTypeChart() {
  return (
    <Card className="border-slate-200 dark:border-slate-800 bg-background/50 backdrop-blur-sm shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-bold tracking-tight">Compliance Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              layout="vertical" 
              data={COMPLIANCE_TYPE_STATS} 
              margin={{ top: 10, right: 30, left: 40, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
              <XAxis type="number" hide />
              <YAxis 
                dataKey="category" 
                type="category" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fontWeight: 700, fill: "hsl(var(--muted-foreground))" }} 
              />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "12px",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  fontSize: "12px",
                  fontWeight: 800
                }}
              />
              <Bar 
                dataKey="volume" 
                fill="#020B4B" 
                radius={[0, 6, 6, 0]} 
                barSize={30} 
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}