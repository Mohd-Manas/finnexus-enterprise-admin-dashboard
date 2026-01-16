import React, { useState, useCallback } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { TASK_COLUMNS, PROJECT_TASKS } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus, GripVertical, Filter, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
export function TaskManagement() {
  const [tasks, setTasks] = useState(PROJECT_TASKS);
  const moveTask = useCallback((taskId: string) => {
    setTasks(prev => {
      const taskIndex = prev.findIndex(t => t.id === taskId);
      if (taskIndex === -1) return prev;
      const task = prev[taskIndex];
      // Prevent 'Done' tasks from cycling back to 'Backlog' automatically
      if (task.column === 'done') {
        toast.success("Task is already archived as completed.");
        return prev;
      }
      const newTasks = [...prev];
      const currentColumnIndex = TASK_COLUMNS.findIndex(c => c.id === task.column);
      const nextColumnIndex = (currentColumnIndex + 1) % TASK_COLUMNS.length;
      const destination = TASK_COLUMNS[nextColumnIndex];
      newTasks[taskIndex] = {
        ...task,
        column: destination.id
      };
      toast.info(`Task moved: ${TASK_COLUMNS[currentColumnIndex].title} → ${destination.title}`, {
        description: task.title
      });
      return newTasks;
    });
  }, []);
  const addNewTask = () => {
    const idNum = Math.floor(Math.random() * 10000);
    const newTask = {
      id: `task-${idNum}`,
      title: "New Platform Audit Request",
      priority: "Medium" as const,
      column: "backlog",
      user: "Alex V.",
      avatar: "https://i.pravatar.cc/150?u=1"
    };
    // Prepend for immediate visibility in backlog
    setTasks(prev => [newTask, ...prev]);
    toast.success("Security ticket initialized", {
      description: `Task #${idNum} added to Backlog.`
    });
  };
  const getColumnTasks = (columnId: string) => tasks.filter(t => t.column === columnId);
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Task Force</h1>
            <p className="text-muted-foreground text-sm font-medium">Collaborative project tracking and workload distribution.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2 h-9 text-xs font-bold px-4">
              <Filter className="h-3.5 w-3.5" /> Filter
            </Button>
            <Button size="sm" className="btn-gradient flex items-center gap-2 h-9 text-xs font-bold px-4" onClick={addNewTask}>
              <Plus className="h-3.5 w-3.5" /> New Task
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard title="Active Sprints" value="12" trend="up" change="+2" icon="TrendingUp" />
          <MetricCard title="Open Tasks" value={tasks.filter(t => t.column !== 'done').length.toString()} trend="down" change="-5" icon="Users" />
          <MetricCard title="Team Velocity" value="84%" trend="up" change="+4%" icon="Zap" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[600px]">
          {TASK_COLUMNS.map((column) => (
            <div key={column.id} className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                  {column.title}
                  <span className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[9px] font-bold opacity-70">
                    {getColumnTasks(column.id).length}
                  </span>
                </h3>
              </div>
              <div className="flex-1 rounded-2xl bg-slate-100/50 dark:bg-slate-900/40 p-3 border border-slate-200/60 dark:border-slate-800/60 min-h-[500px] shadow-inner">
                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {getColumnTasks(column.id).map((task) => (
                      <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: 20 }}
                        whileHover={{ y: -4 }}
                        className={cn(
                          "group cursor-pointer active:scale-95 transition-transform",
                          column.id === 'done' && "opacity-60 grayscale-[0.5] hover:grayscale-0 hover:opacity-100"
                        )}
                        onClick={() => moveTask(task.id)}
                      >
                        <Card className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-glow-lg hover:border-primary/30 bg-background/80 backdrop-blur-sm transition-all overflow-hidden relative">
                          <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors" />
                          <CardContent className="p-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <Badge variant={task.priority === 'High' ? 'destructive' : 'secondary'} className="text-[9px] font-black h-4 px-1.5 uppercase tracking-tighter">
                                {task.priority}
                              </Badge>
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-[9px] font-bold text-primary uppercase">{column.id === 'done' ? 'Archived' : 'Next'}</span>
                                {column.id !== 'done' && <ArrowRight className="h-3 w-3 text-primary" />}
                                <GripVertical className="h-3.5 w-3.5 text-muted-foreground/40" />
                              </div>
                            </div>
                            <p className="text-sm font-bold leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors">{task.title}</p>
                            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/50">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6 border-2 border-background shadow-sm ring-1 ring-slate-100 dark:ring-slate-800">
                                  <AvatarImage src={task.avatar} />
                                  <AvatarFallback className="text-[10px] font-black bg-primary/5 text-primary">{task.user[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{task.user}</span>
                              </div>
                              <span className="text-[9px] text-muted-foreground font-mono font-bold bg-secondary/50 px-1.5 py-0.5 rounded">#{task.id.split('-')[1]}</span>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {getColumnTasks(column.id).length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-20 text-muted-foreground/30 border-2 border-dashed rounded-2xl border-slate-200 dark:border-slate-800/60"
                    >
                      <p className="text-[10px] font-black uppercase tracking-widest">Queue Empty</p>
                    </motion.div>
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