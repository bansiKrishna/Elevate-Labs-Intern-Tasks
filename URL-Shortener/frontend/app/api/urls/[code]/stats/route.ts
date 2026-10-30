/**
 * File: app/api/urls/[code]/stats/route.ts
 *
 * Purpose:
 * Exposes same-origin access to stats for one known short code.
 *
 * Responsibilities:
 * - Validate the path parameter using the backend's short-code character set.
 * - Forward to GET /api/v1/urls/{code}/stats without adding UI-only metrics.
 *
 * Inputs:
 * - A URL path segment containing a 1–40 character short code.
 *
 * Outputs:
 * - The backend stats DTO and status, or an explicit validation/proxy error.
 *
 * Dependencies:
 * - Next.js Route Handlers and the fixed-path backend proxy.
 *
 * Notes:
 * Stats are retrieved per short code; there is no backend endpoint for global
 * analytics or listing links.
 */
import { forwardBackendRequest } from "@/lib/api/backend-proxy";

export async function GET(
  _request: Request,
  context: { params: Promise<{ code: string }> },
) {
  const { code } = await context.params;
  if (!/^[a-zA-Z0-9_-]{1,40}$/.test(code)) {
    return Response.json(
      { status: 400, message: "The short code is invalid." },
      { status: 400 },
    );
  }

  return forwardBackendRequest(
    `/api/v1/urls/${encodeURIComponent(code)}/stats`,
    { method: "GET", headers: { Accept: "application/json" } },
  );
}
