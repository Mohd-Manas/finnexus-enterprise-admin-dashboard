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
  // Check for success flag
  if (json.success === false) {
    throw new Error(json.error || 'Server rejected terminal request');
  }
  // Use 'in' operator to check for property existence rather than just value check
  // This allows data to be null or empty string if that's a valid T
  if (!('data' in json)) {
    throw new Error('API Integrity Violation: Success response missing data payload');
  }
  return json.data as T;
}
/**
 * Standardized POST helper with robust error handling.
 */
export async function post<T>(path: string, body: any, init?: RequestInit): Promise<T> {
  return api<T>(path, {
    method: 'POST',
    body: JSON.stringify(body),
    ...init
  });
}