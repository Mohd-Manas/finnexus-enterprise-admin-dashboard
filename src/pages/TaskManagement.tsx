import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { TaskStatusDonut, TeamWorkloadBar } from "@/components/dashboard/charts/TaskAnalyticsCharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Filter, ArrowRight } from "lucide-react";
import { toast } from "sonner";
export function TaskManagement() {
  const handleAction = (type: string) => {
    toast.info(`${type} initiated`, {
      description: "Accessing secure operational node."
    });
  };
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground">Task Force Analytics</h1>
            <p className="text-muted-foreground text-sm font-bold uppercase tracking-wide opacity-70">
              Operational oversight and resource utilization metrics.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 h-10 text-[10px] font-black uppercase tracking-widest px-4 border-slate-300 dark:border-slate-700"
              onClick={() => handleAction('Queue Filter')}
            >
              <Filter className="h-3.5 w-3.5" /> Filter Queue
            </Button>
            <Button
              size="sm"
              className="btn-gradient flex items-center gap-2 h-10 text-[10px] font-black uppercase tracking-widest px-4 shadow-md"
              onClick={() => handleAction('Incident Log')}
            >
              <Plus className="h-3.5 w-3.5" /> Log Incident
            </Button>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard title="Total Tasks" value="128" trend="up" change="+12%" icon="Layers" />
          <MetricCard title="Tasks Completed" value="84" trend="up" change="+8%" icon="ShieldCheck" />
          <MetricCard title="Overdue Tasks" value="12" trend="down" change="-15%" icon="Bell" />
          <MetricCard title="Team Utilization" value="78%" trend="up" change="+4.2%" icon="Zap" />
        </div>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <TaskStatusDonut />
          </div>
          <div className="lg:col-span-7">
            <TeamWorkloadBar />
          </div>
        </div>
        <Card className="border-slate-200 dark:border-slate-800 bg-background/50 backdrop-blur-sm shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b bg-slate-50/50 dark:bg-slate-900/50 py-4 px-6">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Operational Efficiency Highlights</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { label: "Sprint Completion", value: "92%", color: "text-emerald-500" },
                { label: "Average Response", value: "14m", color: "text-primary" },
                { label: "Resource Balance", value: "Optimal", color: "text-emerald-500" }
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{item.label}</span>
                  <span className={`text-2xl font-black tracking-tighter ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <button
                className="group flex items-center gap-2 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary hover:text-primary/70 transition-colors"
                onClick={() => handleAction('Full Audit')}
              >
                View Full Project Audit Log
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}