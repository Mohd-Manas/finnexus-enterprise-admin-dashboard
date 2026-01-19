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
export const DASHBOARD_MARKETING_STATS = [
  { label: "Click-Through", value: "4.2%", trend: "+0.8%", progress: 75 },
  { label: "Lead Quality", value: "88%", trend: "+2.1%", progress: 88 },
  { label: "Reach Index", value: "1.2M", trend: "+12k", progress: 62 },
  { label: "Budget Burn", value: "$45k", trend: "On Track", progress: 42 },
];
export const DASHBOARD_BACKOFFICE_STATS = [
  { label: "SLA Compl.", value: "99.4%", trend: "+0.1%", progress: 99 },
  { label: "KYC Velocity", value: "2.4h", trend: "-15m", progress: 82 },
  { label: "Audit Readiness", value: "High", trend: "Stable", progress: 95 },
  { label: "Queue Load", value: "142", trend: "High", isCritical: true, progress: 88 },
];
export const DASHBOARD_TASK_STATS = [
  { label: "Sprint Vel.", value: "42 pts", trend: "+5", progress: 84 },
  { label: "Resource Load", value: "72%", trend: "+2%", progress: 72 },
  { label: "Blockers", value: "3", trend: "-1", progress: 15 },
  { label: "Done Rate", value: "92%", trend: "+4%", progress: 92 },
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
  { name: 'To Do', value: 35, fill: '#64748B' },
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
export const PNL_CHART_DATA = [
  { name: '00:00', pnl: 4000 },
  { name: '04:00', pnl: 3000 },
  { name: '08:00', pnl: 5000 },
  { name: '12:00', pnl: 4500 },
  { name: '16:00', pnl: 6000 },
  { name: '20:00', pnl: 5500 },
  { name: '24:00', pnl: 7000 },
];
export const MARGIN_CHART_DATA = [
  { name: 'Used', value: 64 },
  { name: 'Available', value: 36 },
];
export const DEALING_METRICS = [
  { title: "Total Exposure", value: "$142.5M", trend: "up" as const, change: "+5.4%", icon: "Layers" },
  { title: "Margin Call Risk", value: "2.1%", trend: "down" as const, change: "-0.8%", icon: "ShieldCheck" },
  { title: "Active Nodes", value: "24", trend: "up" as const, change: "+2", icon: "Activity" },
  { title: "Avg Latency", value: "1.2ms", trend: "down" as const, change: "-0.1ms", icon: "Zap" },
];
export const TOP_SYMBOLS = [
  { symbol: "BTC/USD", volume: "1.2B", change: "+4.2%", status: "Bullish" },
  { symbol: "EUR/USD", volume: "840M", change: "-0.5%", status: "Neutral" },
  { symbol: "XAU/USD", volume: "450M", change: "+1.2%", status: "Bullish" },
  { symbol: "ETH/USD", volume: "320M", change: "-2.1%", status: "Volatile" },
  { symbol: "GBP/JPY", volume: "180M", change: "+0.8%", status: "Bullish" },
];
export const BACKOFFICE_METRICS = [
  { title: "Open Tickets", value: "181", trend: "up" as const, change: "+12", icon: "Bell" },
  { title: "Pending KYC", value: "42", trend: "down" as const, change: "-8", icon: "Users" },
  { title: "Compliance Alerts", value: "5", trend: "up" as const, change: "+1", icon: "ShieldCheck" },
];
export const BACKOFFICE_TICKETS = [
  { id: "T-8821", subject: "Withdrawal Delay", priority: "High", assignee: "Sarah L.", status: "Open" },
  { id: "T-8822", subject: "KYC Verification", priority: "Medium", assignee: "Mike R.", status: "In Progress" },
  { id: "T-8823", subject: "Login Issue", priority: "Low", assignee: "Alex V.", status: "Closed" },
  { id: "T-8824", subject: "Margin Adjustment", priority: "High", assignee: "Maria G.", status: "Open" },
];
export const COMPLIANCE_ALERTS = [
  { id: "A-1", type: "AML Trigger", source: "Node HK-04", severity: "Critical", time: "2m ago" },
  { id: "A-2", type: "High Volume", source: "Account #44092", severity: "High", time: "15m ago" },
  { id: "A-3", type: "Node Latency", source: "Node NY-01", severity: "Medium", time: "1h ago" },
];
export const RECENT_ACTIVITIES = [
  { id: "act-1", user: "Alex Vance", type: "Security", status: "Approved", time: "5m ago" },
  { id: "act-2", user: "Sarah Lohman", type: "Compliance", status: "Pending", time: "12m ago" },
  { id: "act-3", user: "Mike Ross", type: "Trading", status: "Approved", time: "45m ago" },
];
export const REPORT_DATA = [
  { month: "Jan", efficiency: 82, volume: 450 },
  { month: "Feb", efficiency: 85, volume: 520 },
  { month: "Mar", efficiency: 78, volume: 480 },
  { month: "Apr", efficiency: 91, volume: 610 },
  { month: "May", efficiency: 88, volume: 590 },
  { month: "Jun", efficiency: 94, volume: 650 },
];