import { User } from "@shared/types";
import {
  SYSTEM_STATS,
  PROJECT_TASKS,
  TICKET_PRIORITY_STATS,
  COMPLIANCE_TYPE_STATS,
  TASK_STATUS_STATS,
  TEAM_WORKLOAD_STATS,
  CHANNEL_BREAKDOWN,
  TOP_CONTENT,
  TRENDS_DATA,
  PNL_CHART_DATA,
  MARGIN_CHART_DATA,
  DEALING_METRICS,
  TOP_SYMBOLS,
  BACKOFFICE_METRICS,
  BACKOFFICE_TICKETS,
  COMPLIANCE_ALERTS,
  RECENT_ACTIVITIES,
  REPORT_DATA
} from "@shared/mock-data";
export {
  SYSTEM_STATS,
  PROJECT_TASKS,
  TICKET_PRIORITY_STATS,
  COMPLIANCE_TYPE_STATS,
  TASK_STATUS_STATS,
  TEAM_WORKLOAD_STATS,
  CHANNEL_BREAKDOWN,
  TOP_CONTENT,
  TRENDS_DATA,
  PNL_CHART_DATA,
  MARGIN_CHART_DATA,
  DEALING_METRICS,
  TOP_SYMBOLS,
  BACKOFFICE_METRICS,
  BACKOFFICE_TICKETS,
  COMPLIANCE_ALERTS,
  RECENT_ACTIVITIES,
  REPORT_DATA
};
export const USER_PROFILE: User = {
  id: "u-99",
  name: "Alexander Vance",
  email: "admin@skylinkscapital.com",
  role: "admin",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
export const DASHBOARD_SUMMARY = [
  { title: "Total Equity", value: "$42.8M", trend: "up" as const, change: "+12.5%", icon: "DollarSign" },
  { title: "Active Accounts", value: "8,432", trend: "up" as const, change: "+3.2%", icon: "Users" },
  { title: "Margin Utilization", value: "64.2%", trend: "down" as const, change: "-2.1%", icon: "Zap" },
  { title: "Daily P&L", value: "+$124.5k", trend: "up" as const, change: "+18.3%", icon: "TrendingUp" },
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