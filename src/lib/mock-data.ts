import { User } from "@shared/types";
export const USER_PROFILE = {
  id: "u-99",
  name: "Alexander Vance",
  email: "a.vance@finnexus.enterprise",
  role: "Senior Managing Director",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
export const DASHBOARD_SUMMARY = [
  { title: "Total Equity", value: "$42.8M", trend: "up", change: "+12.5%", icon: "DollarSign" },
  { title: "Active Accounts", value: "8,432", trend: "up", change: "+3.2%", icon: "Users" },
  { title: "Margin Utilization", value: "64.2%", trend: "down", change: "-2.1%", icon: "Zap" },
  { title: "Daily P&L", value: "+$124.5k", trend: "up", change: "+18.3%", icon: "TrendingUp" },
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