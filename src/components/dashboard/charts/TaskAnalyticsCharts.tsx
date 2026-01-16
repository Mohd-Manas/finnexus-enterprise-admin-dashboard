import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TASK_STATUS_STATS, TEAM_WORKLOAD_STATS } from "@/lib/mock-data";
export function TaskStatusDonut() {
  return (
    <Card className="border-slate-200 dark:border-slate-800 bg-background/50 backdrop-blur-sm shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-bold tracking-tight">Task Status Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={TASK_STATUS_STATS}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                animationDuration={1500}
              >
                {TASK_STATUS_STATS.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontWeight: 800
                }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
export function TeamWorkloadBar() {
  return (
    <Card className="border-slate-200 dark:border-slate-800 bg-background/50 backdrop-blur-sm shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-bold tracking-tight">Team Workload (%)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={TEAM_WORKLOAD_STATS} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
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
                domain={[0, 100]}
              />
              <Tooltip
                cursor={{ fill: 'hsl(var(--muted))', opacity: 0.1 }}
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontWeight: 800
                }}
              />
              <Bar
                dataKey="workload"
                fill="#020B4B"
                radius={[6, 6, 0, 0]}
                barSize={40}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}