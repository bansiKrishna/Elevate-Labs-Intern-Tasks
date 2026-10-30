/**
 * File: types/url-shortener.ts
 *
 * Purpose:
 * Defines the verified JSON contracts exchanged with the Spring Boot backend.
 *
 * Responsibilities:
 * - Describe URL creation requests, creation responses, stats responses, and
 *   the backend's standard error shape.
 *
 * Inputs:
 * - No runtime inputs; these types describe API values.
 *
 * Outputs:
 * - Compile-time contracts consumed by the validation, service, and UI layers.
 *
 * Dependencies:
 * - None.
 *
 * Notes:
 * These fields mirror the backend DTOs. No user identity, list, or global
 * analytics fields are present because the backend does not expose them.
 */
export interface CreateUrlRequest {
  longUrl: string;
  customAlias?: string;
  expiryDays?: number;
}

export interface UrlResponse {
  shortCode: string;
  shortUrl: string;
  longUrl: string;
  expiresAt: string | null;
}

export interface UrlStatsResponse {
  shortCode: string;
  longUrl: string;
  clickCount: number;
  createdAt: string;
  expiresAt: string | null;
}

export interface ApiErrorResponse {
  status: number;
  message: string;
  timestamp?: string;
}
