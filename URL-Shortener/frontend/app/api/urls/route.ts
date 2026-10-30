/**
 * File: app/api/urls/route.ts
 *
 * Purpose:
 * Provides the same-origin browser endpoint for creating a shortened URL.
 *
 * Responsibilities:
 * - Validate JSON against the backend-supported URL creation request.
 * - Forward valid requests to POST /api/v1/urls on the configured backend.
 *
 * Inputs:
 * - A JSON request containing longUrl and optional customAlias/expiryDays.
 *
 * Outputs:
 * - The backend's creation response and HTTP status, or a structured error.
 *
 * Dependencies:
 * - Zod request schema and the fixed-path backend proxy.
 *
 * Notes:
 * The backend remains responsible for persistence, alias uniqueness, rate
 * limiting, and authoritative validation.
 */
import { createUrlRequestSchema } from "@/lib/validations/url-schema";
import { forwardBackendRequest } from "@/lib/api/backend-proxy";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { status: 400, message: "Send a valid JSON request body." },
      { status: 400 },
    );
  }

  const parsed = createUrlRequestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { status: 400, message: "Check the URL, alias, and expiry values." },
      { status: 400 },
    );
  }

  return forwardBackendRequest("/api/v1/urls", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(parsed.data),
  });
}
