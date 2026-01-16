import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MARGIN_CHART_DATA } from "@/lib/mock-data";
export function MarginChart() {
  const usedValue = MARGIN_CHART_DATA[0].value;
  // Professional palette refinement
  const themedData = MARGIN_CHART_DATA.map((entry, idx) => ({
    ...entry,
    fill: idx === 0 ? "#020B4B" : "#E2E8F0" // Navy vs High-Contrast Slate
  }));
  return (
    <Card className="col-span-4 lg:col-span-1 border-slate-200 dark:border-slate-800 bg-background/50 backdrop-blur-sm shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-bold tracking-tight">Margin Utilization</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={themedData}
                cx="50%"
                cy="50%"
                innerRadius={75}
                outerRadius={95}
                paddingAngle={5}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                animationBegin={200}
                animationDuration={1200}
              >
                {themedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} stroke="transparent" />
                ))}
                <Label
                  value={`${usedValue}%`}
                  position="center"
                  className="fill-[#020B4B] dark:fill-white text-4xl font-black tracking-tighter"
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-black flex items-center gap-2 uppercase tracking-widest">
              <span className="h-2.5 w-2.5 rounded-full bg-[#020B4B]" /> Margin Used
            </span>
            <span className="font-black tabular-nums">$27.5M</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-black flex items-center gap-2 uppercase tracking-widest">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-200" /> Available
            </span>
            <span className="font-black tabular-nums">$15.3M</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}