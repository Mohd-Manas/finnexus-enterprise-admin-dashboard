import { ApiResponse } from "@shared/types";
/**
 * Enhanced fetch wrapper for FinNexus Terminal.
 * Handles HTTP errors, API-level success flags, and robust JSON parsing.
 */
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  const response = await fetch(path, {
    ...init,
    headers,
  });
  // Handle network/HTTP errors explicitly
  if (!response.ok) {
    let errorMessage = `Terminal Error [HTTP ${response.status}]`;
    try {
      const errorBody = await response.json() as ApiResponse;
      errorMessage = errorBody.error || errorMessage;
    } catch {
      // Fallback if body isn't JSON
    }
    throw new Error(errorMessage);
  }
  const json = (await response.json()) as ApiResponse<T>;
  // Distinguish between intentional null data and failure to return expected payload
  if (json.success === false) {
    throw new Error(json.error || 'Server rejected terminal request');
  }
  // T might be nullable, so we check if success is true and if data key is present
  if (json.data === undefined) {
    throw new Error('API integrity violation: Success returned without data payload');
  }
  return json.data as T;
}
export async function post<T>(path: string, body: any, init?: RequestInit): Promise<T> {
  return api<T>(path, { 
    method: 'POST', 
    body: JSON.stringify(body), 
    ...init 
  });
}