import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PROJECT_TASKS, Task } from "@shared/mock-data";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
export function TaskTable() {
  const [filter, setFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<keyof Task>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const filteredTasks = useMemo(() => {
    let tasks = [...PROJECT_TASKS];
    if (filter !== "all") {
      tasks = tasks.filter((t) => t.column === filter);
    }
    return tasks.sort((a, b) => {
      const valA = a[sortField] || "";
      const valB = b[sortField] || "";
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filter, sortField, sortOrder]);
  const toggleSort = (field: keyof Task) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };
  return (
    <Card className="border-slate-200 dark:border-slate-800 bg-background/50 backdrop-blur-sm overflow-hidden shadow-sm">
      <CardHeader className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b bg-slate-50/50 dark:bg-slate-900/50 py-4 px-6">
        <div className="flex items-center gap-3">
          <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Operational Audit Log</CardTitle>
          <Badge variant="outline" className="text-[10px] font-mono border-primary/20 text-primary bg-primary/5 animate-pulse">LIVE SYNC</Badge>
        </div>
        <Tabs defaultValue="all" onValueChange={setFilter} className="w-full sm:w-auto">
          <TabsList className="bg-slate-200/50 dark:bg-slate-800/50 h-9 p-1 rounded-xl">
            <TabsTrigger value="all" className="text-[10px] font-black uppercase tracking-widest rounded-lg">All</TabsTrigger>
            <TabsTrigger value="todo" className="text-[10px] font-black uppercase tracking-widest rounded-lg">To Do</TabsTrigger>
            <TabsTrigger value="in-progress" className="text-[10px] font-black uppercase tracking-widest rounded-lg">In Progress</TabsTrigger>
            <TabsTrigger value="done" className="text-[10px] font-black uppercase tracking-widest rounded-lg">Done</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-100 dark:border-slate-800 hover:bg-transparent h-14">
                <TableHead className="px-6 text-[10px] font-black uppercase tracking-widest cursor-pointer group" onClick={() => toggleSort("id")}>
                  <div className="flex items-center gap-1">ID <ArrowUpDown className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" /></div>
                </TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Title</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest cursor-pointer group" onClick={() => toggleSort("priority")}>
                  <div className="flex items-center gap-1">Priority <ArrowUpDown className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" /></div>
                </TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Assignee</TableHead>
                <TableHead className="text-right px-6 text-[10px] font-black uppercase tracking-widest">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence mode="popLayout">
                {filteredTasks.map((task) => (
                  <motion.tr
                    key={task.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="border-slate-100 dark:border-slate-800 hover:bg-muted/30 transition-colors group"
                  >
                    <TableCell className="px-6 py-5 font-mono text-[10px] font-black text-muted-foreground group-hover:text-primary transition-colors">
                      {task.id}
                    </TableCell>
                    <TableCell className="py-5 font-bold tracking-tight text-sm">
                      {task.title}
                    </TableCell>
                    <TableCell className="py-5">
                      <Badge variant={task.priority === "High" ? "destructive" : "secondary"} className="text-[8px] font-black uppercase tracking-tighter h-5 px-2">
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-5">
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-[8px] font-black uppercase tracking-tighter h-5 px-2",
                          task.column === "done" && "border-emerald-500/50 text-emerald-600 bg-emerald-500/5",
                          task.column === "in-progress" && "border-primary/50 text-primary bg-primary/5",
                          task.column === "todo" && "border-slate-300 dark:border-slate-700 text-slate-500"
                        )}
                      >
                        {task.column.replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-5">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6 border-slate-200">
                          <AvatarImage src={task.avatar} />
                          <AvatarFallback className="text-[9px] font-black bg-primary/5 text-primary">{task.user[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{task.user}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right px-6 py-5">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}