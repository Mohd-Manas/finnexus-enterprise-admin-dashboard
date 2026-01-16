import { ApiResponse } from "@shared/types"
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, { headers: { 'Content-Type': 'application/json' }, ...init })
  const json = (await res.json()) as ApiResponse<T>
  if (!res.ok || !json.success || json.data === undefined) throw new Error(json.error || 'Request failed')
  return json.data
}
export async function post<T>(path: string, body: any, init?: RequestInit): Promise<T> {
  return api<T>(path, { method: 'POST', body: JSON.stringify(body), ...init });
}