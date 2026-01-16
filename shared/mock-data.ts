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
export const PROJECT_TASKS = [
  { id: "task-1", title: "Risk Engine Audit", priority: "High", column: "in-progress", user: "Alex V.", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: "task-2", title: "HFT Node Optimization", priority: "Medium", column: "todo", user: "Sarah L.", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: "task-3", title: "Compliance Report Q3", priority: "High", column: "backlog", user: "Mike R.", avatar: "https://i.pravatar.cc/150?u=3" },
  { id: "task-4", title: "API Documentation Update", priority: "Low", column: "done", user: "Alex V.", avatar: "https://i.pravatar.cc/150?u=4" },
  { id: "task-5", title: "Market Data Feed Fix", priority: "High", column: "in-progress", user: "Maria G.", avatar: "https://i.pravatar.cc/150?u=5" },
];