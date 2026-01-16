import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CHANNEL_BREAKDOWN, TRENDS_DATA } from "@/lib/mock-data";
export function ChannelBreakdownDonut() {
  return (
    <Card className="border-slate-200 dark:border-slate-800 bg-background/50 backdrop-blur-sm shadow-sm h-full">
      <CardHeader>
        <CardTitle className="text-base font-black tracking-tight uppercase">Channel Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={CHANNEL_BREAKDOWN}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={95}
                paddingAngle={4}
                dataKey="value"
                animationDuration={1500}
                stroke="transparent"
              >
                {CHANNEL_BREAKDOWN.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontWeight: 900
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle" 
                wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
export function MarketingTrendsChart() {
  const actualData = TRENDS_DATA.filter(d => !d.forecast);
  const forecastData = TRENDS_DATA.filter(d => d.forecast || d.day === 23);
  return (
    <Card className="border-slate-200 dark:border-slate-800 bg-background/50 backdrop-blur-sm shadow-sm h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-black tracking-tight uppercase">30-Day Performance Trends</CardTitle>
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="h-1 w-4 bg-primary" /> Actual</span>
            <span className="flex items-center gap-1.5"><span className="h-1 w-4 border-t-2 border-dashed border-primary" /> Forecast</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={TRENDS_DATA} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: "hsl(var(--muted-foreground))" }}
                label={{ value: 'Days', position: 'insideBottom', offset: -5, fontSize: 10, fontWeight: 900 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "12px",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  fontSize: "12px",
                  fontWeight: 800
                }}
              />
              {/* Actual Lines */}
              <Line 
                type="monotone" 
                data={actualData} 
                dataKey="spend" 
                stroke="#020B4B" 
                strokeWidth={3} 
                dot={false} 
                name="Spend ($)" 
              />
              <Line 
                type="monotone" 
                data={actualData} 
                dataKey="leads" 
                stroke="#10B981" 
                strokeWidth={3} 
                dot={false} 
                name="Leads" 
              />
              {/* Forecast Lines (Dashed) */}
              <Line 
                type="monotone" 
                data={forecastData} 
                dataKey="spend" 
                stroke="#020B4B" 
                strokeWidth={3} 
                strokeDasharray="5 5" 
                dot={false} 
                name="Spend Forecast" 
              />
              <Line 
                type="monotone" 
                data={forecastData} 
                dataKey="leads" 
                stroke="#10B981" 
                strokeWidth={3} 
                strokeDasharray="5 5" 
                dot={false} 
                name="Leads Forecast" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}