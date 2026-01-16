import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { TASK_COLUMNS, PROJECT_TASKS } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus, GripVertical, Filter } from "lucide-react";
import { motion, Reorder } from "framer-motion";
export function TaskManagement() {
  const [tasks, setTasks] = useState(PROJECT_TASKS);
  const getColumnTasks = (columnId: string) => tasks.filter(t => t.column === columnId);
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Task Force</h1>
            <p className="text-muted-foreground">Collaborative project tracking and workload distribution.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <Button size="sm" className="btn-gradient flex items-center gap-2">
              <Plus className="h-4 w-4" /> New Task
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard title="Active Sprints" value="12" trend="up" change="+2" icon="TrendingUp" />
          <MetricCard title="Open Tasks" value="48" trend="down" change="-5" icon="Users" />
          <MetricCard title="Team Velocity" value="84%" trend="up" change="+4%" icon="Zap" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full min-h-[600px]">
          {TASK_COLUMNS.map((column) => (
            <div key={column.id} className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                  {column.title} <span className="ml-2 text-xs font-normal opacity-50">({getColumnTasks(column.id).length})</span>
                </h3>
              </div>
              <div className="flex-1 rounded-xl bg-slate-100/50 dark:bg-slate-900/50 p-2 border border-slate-200/50 dark:border-slate-800/50 min-h-[400px]">
                <div className="space-y-3">
                  {getColumnTasks(column.id).map((task) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ y: -2 }}
                      className="group cursor-pointer"
                    >
                      <Card className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <Badge variant={task.priority === 'High' ? 'destructive' : 'secondary'} className="text-[10px] h-4">
                              {task.priority}
                            </Badge>
                            <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <p className="text-sm font-semibold leading-snug">{task.title}</p>
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6 border border-white dark:border-slate-950">
                                <AvatarImage src={task.avatar} />
                                <AvatarFallback className="text-[10px]">{task.user[0]}</AvatarFallback>
                              </Avatar>
                              <span className="text-[10px] font-medium text-muted-foreground">{task.user}</span>
                            </div>
                            <span className="text-[10px] text-muted-foreground font-mono">#{task.id.split('-')[1]}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                  {getColumnTasks(column.id).length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground/30 border-2 border-dashed rounded-xl border-slate-200 dark:border-slate-800">
                      <p className="text-xs italic">Drop tasks here</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}