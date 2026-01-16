import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MARGIN_CHART_DATA } from "@/lib/mock-data";
export function MarginChart() {
  const usedValue = MARGIN_CHART_DATA[0].value;
  return (
    <Card className="col-span-4 lg:col-span-1 border-slate-200 dark:border-slate-800">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Margin Utilization</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={MARGIN_CHART_DATA}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                startAngle={180}
                endAngle={-180}
              >
                {MARGIN_CHART_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
                <Label
                  value={`${usedValue}%`}
                  position="center"
                  className="fill-foreground text-3xl font-bold"
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-primary" /> Margin Used
            </span>
            <span className="font-semibold">$27.5M</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-muted" /> Available
            </span>
            <span className="font-semibold">$15.3M</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}