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
  { id: "SKL-105", title: "Market Data Feed Fix", priority: "High", column: "in-progress", user: "Maria G.", avatar: "https://i.pravatar.cc/150?u=5", description: "Fixing websocket dropped frames in the XAUUSD stream." },
  { id: "SKL-106", title: "Margin Call Protocol Update", priority: "High", column: "todo", user: "Alex V.", avatar: "https://i.pravatar.cc/150?u=1", description: "Revamping automatic liquidation thresholds for high-leverage accounts." },
  { id: "SKL-107", title: "Lp Connectivity Debug", priority: "Medium", column: "in-progress", user: "Sarah L.", avatar: "https://i.pravatar.cc/150?u=2", description: "Investigating 500ms latency spikes with Liquidity Provider B." },
  { id: "SKL-108", title: "Quarterly Compliance Audit", priority: "High", column: "backlog", user: "Maria G.", avatar: "https://i.pravatar.cc/150?u=5", description: "Internal review of AML flagging accuracy." },
  { id: "SKL-109", title: "CRM Integration Sync", priority: "Low", column: "done", user: "Mike R.", avatar: "https://i.pravatar.cc/150?u=3", description: "Syncing lead conversion data with the central marketing hub." },
  { id: "SKL-110", title: "Shadow Banking Stress Test", priority: "High", column: "in-progress", user: "Alex V.", avatar: "https://i.pravatar.cc/150?u=1", description: "Simulating liquidity crunches in sub-custodian accounts." },
  { id: "SKL-111", title: "Frontend Dashboard Polish", priority: "Low", column: "todo", user: "Sarah L.", avatar: "https://i.pravatar.cc/150?u=2", description: "Improving chart contrast for terminal accessibility compliance." },
  { id: "SKL-112", title: "Database Sharding Phase 2", priority: "Medium", column: "in-progress", user: "Maria G.", avatar: "https://i.pravatar.cc/150?u=5", description: "Migrating transaction logs to regional clusters." },
  { id: "SKL-113", title: "OAuth2 Provider Security Patch", priority: "High", column: "done", user: "Mike R.", avatar: "https://i.pravatar.cc/150?u=3", description: "Critical patch for session hijacking vulnerability." },
  { id: "SKL-114", title: "Mobile Push Notification Revamp", priority: "Medium", column: "todo", user: "Sarah L.", avatar: "https://i.pravatar.cc/150?u=2", description: "Adding actionable alerts for margin calls." },
  { id: "SKL-115", title: "Symbol Mapping Refactor", priority: "Low", column: "in-progress", user: "Alex V.", avatar: "https://i.pravatar.cc/150?u=1", description: "Standardizing ISIN/CUSIP identifiers across all feeds." },
  { id: "SKL-116", title: "Withdrawal Gateway Testing", priority: "High", column: "todo", user: "Maria G.", avatar: "https://i.pravatar.cc/150?u=5", description: "Validating SEPA Instant transactions." },
  { id: "SKL-117", title: "Trade History Export Fix", priority: "Low", column: "done", user: "Mike R.", avatar: "https://i.pravatar.cc/150?u=3", description: "Handling large CSV timeouts in the reporting module." },
  { id: "SKL-118", title: "Internal KYC Bot Audit", priority: "Medium", column: "backlog", user: "Sarah L.", avatar: "https://i.pravatar.cc/150?u=2", description: "Reviewing AI classification of expired documents." },
];
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
  { name: 'High', count: 24, fill: '#E11D48' }, // Rose-600
  { name: 'Medium', count: 45, fill: '#F59E0B' }, // Amber-500
  { name: 'Low', count: 112, fill: '#2563EB' }, // Blue-600
];
export const COMPLIANCE_TYPE_STATS = [
  { category: 'AML', volume: 84 },
  { category: 'KYC', volume: 156 },
  { category: 'Risk', volume: 42 },
  { category: 'Trade Audit', volume: 91 },
];