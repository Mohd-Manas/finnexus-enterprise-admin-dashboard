import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { DASHBOARD_SUMMARY, RECENT_ACTIVITIES } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PnLChart } from "@/components/dashboard/charts/PnLChart";
export function DashboardOverview() {
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Executive Summary</h1>
          <p className="text-muted-foreground">Platform-wide health and performance metrics.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {DASHBOARD_SUMMARY.map((metric, i) => (
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
        <div className="grid gap-6 md:grid-cols-6 lg:grid-cols-12">
          <div className="col-span-6 lg:col-span-8">
            <PnLChart />
          </div>
          <Card className="col-span-6 lg:col-span-4 border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Live Operational Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {RECENT_ACTIVITIES.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4">
                    <Avatar className="h-9 w-9 border border-slate-100 dark:border-slate-800">
                      <AvatarFallback className="bg-slate-100 text-slate-600 text-xs font-bold dark:bg-slate-800 dark:text-slate-400">
                        {activity.type[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">{activity.user}</p>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Triggered <span className="text-foreground font-medium">{activity.type}</span> update
                      </p>
                      <Badge variant={activity.status === "Approved" ? "default" : "outline"} className="text-[10px] h-4 px-1 leading-none mt-1">
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <button className="w-full py-2 text-xs font-semibold text-primary hover:bg-primary/5 rounded-md transition-colors">
                  View Full Audit Log
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}