import type { User, Chat, ChatMessage } from './types';
export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'User A' },
  { id: 'u2', name: 'User B' }
];
export const MOCK_CHATS: Chat[] = [
  { id: 'c1', title: 'General' },
];
export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  { id: 'm1', chatId: 'c1', userId: 'u1', text: 'Hello', ts: Date.now() },
];
export const SYSTEM_STATS = {
  activeSessions: 1242,
  serverLoad: "42%",
  uptime: "99.998%",
  lastDeployment: "2h ago",
  apiLatency: "14ms",
};
export interface Task {
  id: string;
  title: string;
  priority: "High" | "Medium" | "Low";
  column: "backlog" | "todo" | "in-progress" | "done";
  user: "Alex V." | "Sarah L." | "Mike R." | "Maria G.";
  avatar: string;
  description?: string;
}
export const PROJECT_TASKS: Task[] = [
  { id: "SKL-101", title: "Risk Engine Audit", priority: "High", column: "in-progress", user: "Alex V.", avatar: "https://i.pravatar.cc/150?u=1", description: "Comprehensive audit of the real-time risk mitigation layer." },
  { id: "SKL-102", title: "HFT Node Optimization", priority: "Medium", column: "todo", user: "Sarah L.", avatar: "https://i.pravatar.cc/150?u=2", description: "Latency reduction for Hong Kong core trading nodes." },
  { id: "SKL-103", title: "Compliance Report Q3", priority: "High", column: "backlog", user: "Mike R.", avatar: "https://i.pravatar.cc/150?u=3", description: "Regulatory filing preparation for regional authorities." },
  { id: "SKL-104", title: "API Documentation Update", priority: "Low", column: "done", user: "Alex V.", avatar: "https://i.pravatar.cc/150?u=4", description: "Standardizing endpoint schemas for institutional clients." },
];
export const CHANNEL_BREAKDOWN = [
  { name: 'Google Ads', value: 42, fill: '#020B4B' },
  { name: 'Social', value: 31, fill: '#10B981' },
  { name: 'Email', value: 18, fill: '#1E3A8A' },
  { name: 'Organic', value: 9, fill: '#64748B' },
];
export const TOP_CONTENT = [
  { id: 'c-1', type: 'Landing page', name: '/trading-platform', metrics: '2.1% conv', visits: 12400 },
  { id: 'c-2', type: 'Blog', name: 'Best Forex Strategy 2026', metrics: '847 visits', visits: 847 },
  { id: 'c-3', type: 'Landing page', name: '/institutional-node', metrics: '3.4% conv', visits: 4200 },
  { id: 'c-4', type: 'Whitepaper', name: 'HFT Architecture V4', metrics: '45 downloads', visits: 1100 },
];
export const TRENDS_DATA = Array.from({ length: 30 }).map((_, i) => {
  const isForecast = i >= 23;
  return {
    day: i + 1,
    spend: 1000 + (Math.sin(i / 2) * 200) + (isForecast ? i * 10 : 0),
    leads: 20 + (Math.cos(i / 3) * 5) + (isForecast ? i / 2 : 0),
    cpa: 35 + (Math.sin(i / 4) * 5),
    forecast: isForecast
  };
});
export const TASK_STATUS_STATS = [
  { name: 'To Do', value: 35, fill: 'hsl(var(--muted-foreground))' },
  { name: 'In Progress', value: 40, fill: '#1E3A8A' },
  { name: 'Done', value: 25, fill: '#10B981' },
];
export const TEAM_WORKLOAD_STATS = [
  { name: 'Alex V.', workload: 85 },
  { name: 'Sarah L.', workload: 62 },
  { name: 'Mike R.', workload: 78 },
  { name: 'Maria G.', workload: 92 },
];
export const TICKET_PRIORITY_STATS = [
  { name: 'High', count: 24, fill: '#E11D48' },
  { name: 'Medium', count: 45, fill: '#F59E0B' },
  { name: 'Low', count: 112, fill: '#2563EB' },
];
export const COMPLIANCE_TYPE_STATS = [
  { category: 'AML', volume: 84 },
  { category: 'KYC', volume: 156 },
  { category: 'Risk', volume: 42 },
  { category: 'Trade Audit', volume: 91 },
];