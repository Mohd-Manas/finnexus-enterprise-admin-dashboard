import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PROJECT_TASKS } from "@shared/mock-data";
import { cn } from "@/lib/utils";
export function TeamWorkloadGrid() {
  const teamMembers = ["Alex V.", "Sarah L.", "Mike R.", "Maria G."];
  const memberData = teamMembers.map(name => {
    const userTasks = PROJECT_TASKS.filter(t => t.user === name);
    const activeTasks = userTasks.filter(t => t.column !== "done");
    const inProgress = userTasks.filter(t => t.column === "in-progress");
    const workloadPercent = Math.min((activeTasks.length / 5) * 100, 100);
    const avatarId = name.split(" ")[0].toLowerCase();
    return {
      name,
      totalActive: activeTasks.length,
      workloadPercent,
      inProgress,
      avatar: `https://i.pravatar.cc/150?u=${avatarId}`
    };
  });
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {memberData.map((member) => (
        <Card key={member.name} className="border-slate-200 dark:border-slate-800 bg-background/60 backdrop-blur-sm transition-all hover:scale-[1.02] group cursor-default shadow-sm overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary opacity-20 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="pb-3 flex flex-row items-center gap-4">
            <Avatar className="h-12 w-12 rounded-xl border-2 border-slate-100 dark:border-slate-800 shadow-sm">
              <AvatarImage src={member.avatar} />
              <AvatarFallback className="bg-[#020B4B] text-white text-xs font-black">{member.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-sm font-black tracking-tight leading-none truncate">{member.name}</CardTitle>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Core Operational Unit</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Load distribution</span>
                <span className={cn(
                  "text-xs font-black tabular-nums",
                  member.workloadPercent > 80 ? "text-rose-500" : "text-emerald-500"
                )}>
                  {member.totalActive} Active
                </span>
              </div>
              <Progress value={member.workloadPercent} className="h-1.5 bg-slate-100 dark:bg-slate-800" />
            </div>
            <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Priority Focal Points</span>
              <div className="space-y-2">
                {member.inProgress.slice(0, 2).map((task) => (
                  <div key={task.id} className="flex items-center gap-2 p-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors border border-transparent hover:border-primary/10">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <p className="text-[10px] font-bold leading-tight line-clamp-1">{task.title}</p>
                  </div>
                ))}
                {member.inProgress.length === 0 && (
                  <div className="py-2 text-[9px] text-center font-bold text-muted-foreground/40 italic uppercase tracking-widest">
                    Queue synchronized
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-center pt-2">
              <Badge variant="outline" className="text-[8px] font-black uppercase tracking-[0.3em] border-slate-300 dark:border-slate-700 bg-background/50 h-5 px-3">
                VIEW NODE AUDIT
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}