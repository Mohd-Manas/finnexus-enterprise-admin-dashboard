export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export type UserRole = "admin" | "guest";
export type UserStatus = "active" | "expired";
export interface User {
  id: string;
  name: string;
  role?: UserRole;
  status?: UserStatus;
  expiresAt?: number; // epoch millis
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number; // epoch millis
}
export interface InviteResponse {
  token: string;
  inviteUrl: string;
  expiresAt: number;
}