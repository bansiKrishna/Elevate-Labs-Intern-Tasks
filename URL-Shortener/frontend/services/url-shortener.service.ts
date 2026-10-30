/**
 * File: services/url-shortener.service.ts
 *
 * Purpose:
 * Provides the UI's typed client for the Next.js API proxy.
 *
 * Responsibilities:
 * - Send URL creation and stats requests to same-origin route handlers.
 * - Validate successful JSON responses against verified backend DTO schemas.
 * - Normalize backend and network errors into actionable Error messages.
 *
 * Inputs:
 * - A validated URL creation request or a short code for stats lookup.
 *
 * Outputs:
 * - A typed URL creation response or per-link stats response.
 *
 * Dependencies:
 * - Fetch API, Zod response schemas, and URL API contracts.
 *
 * Notes:
 * The browser never calls the backend origin directly; the server-side proxy
 * avoids requiring unrestricted backend CORS configuration.
 */
import {
  urlResponseSchema,
  urlStatsResponseSchema,
  type CreateUrlRequestInput,
} from "@/lib/validations/url-schema";
import type { UrlResponse, UrlStatsResponse } from "@/types/url-shortener";

async function requestJson<T>(
  path: string,
  init: RequestInit,
  validate: (value: unknown) => T,
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(path, {
      ...init,
      headers: {
        Accept: "application/json",
        ...init.headers,
      },
      cache: "no-store",
    });
  } catch {
    throw new Error("The service couldn't be reached. Check your connection and try again.");
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    if (!response.ok) {
      throw new Error(`The service returned an unexpected error (${response.status}).`);
    }
    throw new Error("The service returned an unreadable response.");
  }

  if (!response.ok) {
    const errorMessage =
      typeof payload === "object" &&
      payload !== null &&
      "message" in payload &&
      typeof payload.message === "string"
        ? payload.message
        : null;
    throw new Error(
      errorMessage
        ? errorMessage
        : `The request failed (${response.status}). Please try again.`,
    );
  }

  try {
    return validate(payload);
  } catch {
    throw new Error("The service returned data in an unexpected format.");
  }
}

export const urlShortenerService = {
  create(input: CreateUrlRequestInput): Promise<UrlResponse> {
    return requestJson(
      "/api/urls",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      },
      (value) => urlResponseSchema.parse(value),
    );
  },

  getStats(shortCode: string): Promise<UrlStatsResponse> {
    return requestJson(
      `/api/urls/${encodeURIComponent(shortCode)}/stats`,
      { method: "GET" },
      (value) => urlStatsResponseSchema.parse(value),
    );
  },
};
