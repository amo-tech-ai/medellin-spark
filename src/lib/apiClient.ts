/**
 * Central API Client for Supabase Edge Functions
 *
 * Features:
 * - Automatic JWT injection from Supabase session
 * - 401 handling (refresh token → retry → logout)
 * - Configurable timeouts
 * - Retry logic with exponential backoff
 * - Consistent error mapping
 *
 * Usage:
 * ```ts
 * const data = await apiClient.post('/pitch-deck-assistant', {
 *   message: 'Hello',
 *   conversation_id: '123'
 * });
 * ```
 */

import { supabase } from '@/integrations/supabase/client';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface RequestOptions {
  timeout?: number;
  retries?: number;
  requiresAuth?: boolean;
}

class ApiClient {
  private baseUrl: string;
  private defaultTimeout = 20000; // 20 seconds
  private defaultRetries = 3;

  constructor() {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl) {
      throw new Error('VITE_SUPABASE_URL is not defined');
    }
    this.baseUrl = `${supabaseUrl}/functions/v1`;
  }

  /**
   * Check if we're in development mode
   */
  private isDevelopmentMode(): boolean {
    return import.meta.env.DEV || window.location.hostname === 'localhost';
  }

  /**
   * Get JWT token from current session
   */
  private async getAuthToken(): Promise<string | null> {
    // In development, skip auth entirely
    if (this.isDevelopmentMode()) {
      console.log('[apiClient] Development mode: Skipping auth token');
      return null;
    }

    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token ?? null;
  }

  /**
   * Attempt to refresh the session and retry the request
   */
  private async handleUnauthorized(): Promise<boolean> {
    try {
      const { data: { session }, error } = await supabase.auth.refreshSession();

      if (error || !session) {
        // Refresh failed, sign out user
        await supabase.auth.signOut();
        return false;
      }

      return true; // Refresh succeeded
    } catch (error) {
      console.error('[apiClient] Refresh failed:', error);
      await supabase.auth.signOut();
      return false;
    }
  }

  /**
   * Make HTTP request with automatic JWT, timeout, and retry
   */
  private async request<T = unknown>(
    endpoint: string,
    options: RequestInit & RequestOptions = {}
  ): Promise<T> {
    const {
      timeout = this.defaultTimeout,
      retries = this.defaultRetries,
      requiresAuth = true,
      ...fetchOptions
    } = options;

    let lastError: unknown = null;

    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        // Get auth token if required
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
          ...fetchOptions.headers,
        };

        if (requiresAuth) {
          const token = await this.getAuthToken();

          // In development mode, continue without token
          if (!token && !this.isDevelopmentMode()) {
            throw new ApiError('No authentication token available', 401, 'NO_AUTH');
          }

          if (token) {
            headers['Authorization'] = `Bearer ${token}`;
          }
        }

        // Create abort controller for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
          const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...fetchOptions,
            headers,
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

          // Handle 401: Try to refresh token and retry once
          if (response.status === 401 && attempt === 0) {
            // In development mode, don't retry auth
            if (this.isDevelopmentMode()) {
              console.warn('[apiClient] Dev mode: 401 received - this should not happen in dev mode');
              throw new ApiError('Authentication failed (dev mode should bypass auth)', 401, 'AUTH_FAILED');
            }

            const refreshed = await this.handleUnauthorized();
            if (refreshed) {
              continue; // Retry with new token
            }
            throw new ApiError('Authentication failed', 401, 'AUTH_FAILED');
          }

          // Handle other HTTP errors
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const message = errorData.message || errorData.error || `HTTP ${response.status}`;
            throw new ApiError(message, response.status, errorData.code);
          }

          // Success - parse and return
          const data = await response.json();
          return data as T;

        } catch (error: unknown) {
          clearTimeout(timeoutId);

          // AbortError = timeout
          if (error instanceof Error && error.name === 'AbortError') {
            throw new ApiError('Request timeout', 408, 'TIMEOUT');
          }

          throw error;
        }

      } catch (error: unknown) {
        lastError = error;

        // Don't retry on client errors (4xx except 429)
        if (
          error instanceof ApiError &&
          error.status >= 400 &&
          error.status < 500 &&
          error.status !== 429
        ) {
          throw error;
        }

        // Don't retry on last attempt
        if (attempt === retries - 1) {
          throw error;
        }

        // Exponential backoff: 250ms, 750ms, 2.25s
        const delay = 250 * Math.pow(3, attempt);
        console.log(`[apiClient] Retry attempt ${attempt + 1} after ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    // Should never reach here, but TypeScript needs it
    throw lastError || new Error('Request failed after all retries');
  }

  /**
   * GET request
   */
  async get<T = unknown>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
      ...options,
    });
  }

  /**
   * POST request
   */
  async post<T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  /**
   * PUT request
   */
  async put<T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  /**
   * DELETE request
   */
  async delete<T = unknown>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      ...options,
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export type for responses
export type { RequestOptions };
