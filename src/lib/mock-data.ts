import { User } from "@shared/types";
import { SYSTEM_STATS, PROJECT_TASKS } from "@shared/mock-data";
export { SYSTEM_STATS, PROJECT_TASKS };
export const USER_PROFILE: User = {
  id: "u-99",
  name: "Alexander Vance",
  email: "admin@skylinkscapital.com",
  role: "admin",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
export const GUEST_USER_MOCK: User = {
  id: "g-temp",
  name: "Guest Collaborator",
  role: "guest",
  status: "active",
};
export const DASHBOARD_SUMMARY = [
  { title: "Total Equity", value: "$42.8M", trend: "up" as const, change: "+12.5%", icon: "DollarSign" },
  { title: "Active Accounts", value: "8,432", trend: "up" as const, change: "+3.2%", icon: "Users" },
  { title: "Margin Utilization", value: "64.2%", trend: "down" as const, change: "-2.1%", icon: "Zap" },
  { title: "Daily P&L", value: "+$124.5k", trend: "up" as const, change: "+18.3%", icon: "TrendingUp" },
];
export const BACKOFFICE_METRICS = [
  { title: "Open Tickets", value: "24", trend: "up" as const, change: "+4", icon: "Users" },
  { title: "Pending KYC", value: "182", trend: "down" as const, change: "-12", icon: "Zap" },
  { title: "Compliance Alerts", value: "3", trend: "up" as const, change: "+1", icon: "TrendingUp" },
  { title: "Notifications / Alerts", value: "12", trend: "up" as const, change: "+3", icon: "Bell" },
  { title: "Finance Summary", value: "$1.2M", trend: "down" as const, change: "-2%", icon: "DollarSign" },
];
export const DEALING_METRICS = [
  { title: "Total Equity", value: "$42.8M", trend: "up" as const, change: "+12.5%", icon: "DollarSign" },
  { title: "Total Credit", value: "$184.2M", trend: "up" as const, change: "+4.3%", icon: "CreditCard" },
  { title: "Total Floating PNL", value: "+$428.1k", trend: "up" as const, change: "+12.1%", icon: "TrendingUp" },
  { title: "Total Margin", value: "$12.8M", trend: "down" as const, change: "-0.4%", icon: "Zap" },
  { title: "Total Accounts", value: "8,432", trend: "up" as const, change: "+3.2%", icon: "Users" },
  { title: "Total Groups", value: "124", trend: "up" as const, change: "+1.5%", icon: "Layers" },
  { title: "Total Profit", value: "+$124.5k", trend: "up" as const, change: "+18.3%", icon: "BarChart3" },
  { title: "Total Symbols", value: "150", trend: "down" as const, change: "-2.1%", icon: "Activity" },
];
export const MARKETING_CAMPAIGNS = [
  { id: "cmp-1", name: "Q2 Global Equity", status: "Active", spend: "$45,000", leads: 1240, roi: "3.2x", color: "bg-emerald-500" },
  { id: "cmp-2", name: "Crypto Onboarding", status: "Paused", spend: "$12,000", leads: 450, roi: "1.8x", color: "bg-amber-500" },
  { id: "cmp-3", name: "Institutional SEO", status: "Active", spend: "$8,500", leads: 88, roi: "5.4x", color: "bg-indigo-500" },
  { id: "cmp-4", name: "Retargeting Phase 1", status: "Active", spend: "$22,000", leads: 670, roi: "2.1x", color: "bg-sky-500" },
];
export const CONVERSION_FUNNEL = [
  { stage: "Impressions", count: 450000, fill: "hsl(var(--muted))" },
  { stage: "Visits", count: 85000, fill: "hsl(var(--chart-1))" },
  { stage: "Signups", count: 12000, fill: "hsl(var(--chart-2))" },
  { stage: "KYC Submit", count: 8500, fill: "hsl(var(--chart-3))" },
  { stage: "Deposits", count: 4200, fill: "hsl(var(--primary))" },
];
export const BACKOFFICE_TICKETS = [
  { id: "T-1024", subject: "Withdrawal Delay", priority: "High", user: "John Doe", status: "Open", assignee: "Sarah L." },
  { id: "T-1025", subject: "KYC Verification", priority: "Medium", user: "Maria G.", status: "Pending", assignee: "Mike R." },
  { id: "T-1026", subject: "Login Issue", priority: "Low", user: "Kevin S.", status: "Closed", assignee: "Sarah L." },
  { id: "T-1027", subject: "API Integration", priority: "High", user: "Quant Fund X", status: "Investigating", assignee: "Alex V." },
];
export const COMPLIANCE_ALERTS = [
  { id: "AL-88", type: "AML", severity: "Critical", source: "Flagged Transfer", time: "10m ago" },
  { id: "AL-89", type: "KYC", severity: "Medium", source: "Expired Document", time: "45m ago" },
  { id: "AL-90", type: "Risk", severity: "High", source: "Unusual Leverage", time: "2h ago" },
];
export const PNL_CHART_DATA = [
  { name: "09:00", pnl: 4000, volume: 2400 },
  { name: "10:00", pnl: 3000, volume: 1398 },
  { name: "11:00", pnl: 2000, volume: 9800 },
  { name: "12:00", pnl: 2780, volume: 3908 },
  { name: "13:00", pnl: 1890, volume: 4800 },
  { name: "14:00", pnl: 2390, volume: 3800 },
  { name: "15:00", pnl: 3490, volume: 4300 },
];
export const MARGIN_CHART_DATA = [
  { name: "Used", value: 64, fill: "hsl(var(--chart-1))" },
  { name: "Free", value: 36, fill: "hsl(var(--muted))" },
];
export const TOP_SYMBOLS = [
  { symbol: "EURUSD", volume: "1.2B", change: "+0.04%", status: "Bullish" },
  { symbol: "XAUUSD", volume: "840M", change: "-0.12%", status: "Bearish" },
  { symbol: "BTCUSD", volume: "450M", change: "+2.45%", status: "Volatile" },
  { symbol: "GBPUSD", volume: "320M", change: "-0.01%", status: "Neutral" },
];
export const RECENT_ACTIVITIES = [
  { id: 1, type: "KYC", user: "John Doe", status: "Approved", time: "2 mins ago" },
  { id: 2, type: "Withdrawal", user: "Sarah Smith", status: "Pending", time: "15 mins ago" },
  { id: 3, type: "Trade", user: "Michael Chen", status: "High Vol", time: "1 hour ago" },
  { id: 4, type: "System", user: "Admin", status: "Update", time: "3 hours ago" },
];
export const TASK_COLUMNS = [
  { id: "backlog", title: "Backlog" },
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" },
];
export const REPORT_DATA = [
  { month: "Jan", efficiency: 78, volume: 4500 },
  { month: "Feb", efficiency: 82, volume: 5200 },
  { month: "Mar", efficiency: 85, volume: 4800 },
  { month: "Apr", efficiency: 89, volume: 6100 },
  { month: "May", efficiency: 94, volume: 5900 },
  { month: "Jun", efficiency: 92, volume: 7200 },
];