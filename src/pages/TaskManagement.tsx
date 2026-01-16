import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { TaskStatusDonut, TeamWorkloadBar } from "@/components/dashboard/charts/TaskAnalyticsCharts";
import { TaskTable } from "@/components/dashboard/TaskTable";
import { TeamWorkloadGrid } from "@/components/dashboard/TeamWorkloadGrid";
import { Button } from "@/components/ui/button";
import { Plus, Filter, LayoutGrid, Users } from "lucide-react";
import { toast } from "sonner";
export function TaskManagement() {
  const handleAction = (type: string) => {
    toast.info(`${type} initiated`, {
      description: "Accessing secure operational node."
    });
  };
  return (
    <DashboardLayout>
      <div className="space-y-12 animate-fade-in">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight text-foreground">Task Force Command</h1>
            <p className="text-muted-foreground text-sm font-bold uppercase tracking-wide opacity-70">
              Operational oversight and multi-node resource utilization.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 h-11 text-[10px] font-black uppercase tracking-widest px-5 border-slate-300 dark:border-slate-700 shadow-sm"
              onClick={() => handleAction('Queue Filter')}
            >
              <Filter className="h-3.5 w-3.5" /> Filter Queue
            </Button>
            <Button
              size="sm"
              className="btn-gradient flex items-center gap-2 h-11 text-[10px] font-black uppercase tracking-widest px-5 shadow-glow"
              onClick={() => handleAction('Incident Log')}
            >
              <Plus className="h-3.5 w-3.5" /> Log Incident
            </Button>
          </div>
        </div>
        {/* Global Performance Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard title="Total Active Tasks" value="128" trend="up" change="+12%" icon="Layers" />
          <MetricCard title="Nodes Completed" value="84" trend="up" change="+8%" icon="ShieldCheck" />
          <MetricCard title="Critical Overdue" value="12" trend="down" change="-15%" icon="Bell" />
          <MetricCard title="System Utilization" value="78%" trend="up" change="+4.2%" icon="Zap" />
        </div>
        {/* Analytical Charts */}
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <TaskStatusDonut />
          </div>
          <div className="lg:col-span-7">
            <TeamWorkloadBar />
          </div>
        </div>
        {/* Team Force Distribution */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="text-sm font-black uppercase tracking-[0.25em] text-muted-foreground/80">Team Force Distribution</h2>
          </div>
          <TeamWorkloadGrid />
        </div>
        {/* Full Task Audit Table */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <LayoutGrid className="h-5 w-5 text-primary" />
            <h2 className="text-sm font-black uppercase tracking-[0.25em] text-muted-foreground/80">Operational Audit Flow</h2>
          </div>
          <TaskTable />
        </div>
        {/* Footer Audit Branding */}
        <div className="pt-4 border-t border-dashed flex justify-center">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em] opacity-50">
            SkyLinks Security Protocol Audit Hub v4.9.2-GOLD
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}