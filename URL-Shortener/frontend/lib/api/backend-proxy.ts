/**
 * File: lib/api/backend-proxy.ts
 *
 * Purpose:
 * Forwards same-origin Next.js API requests to the configured Spring backend.
 *
 * Responsibilities:
 * - Read the server-only API_BASE_URL setting.
 * - Forward upstream status and JSON content without exposing backend network
 *   errors or deployment details to the browser.
 *
 * Inputs:
 * - A verified backend path and standard fetch request options.
 *
 * Outputs:
 * - The upstream response or a concise JSON error response for configuration
 *   and availability failures.
 *
 * Dependencies:
 * - Next.js Route Handlers and the global Fetch API.
 *
 * Notes:
 * This proxy only targets fixed backend paths chosen by route handlers; it does
 * not accept a user-provided destination URL and cannot be used as an open proxy.
 */
export async function forwardBackendRequest(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  const configuredBase = process.env.API_BASE_URL;
  if (!configuredBase) {
    return Response.json(
      {
        status: 503,
        message: "The URL service is not configured. Set API_BASE_URL on the frontend server.",
      },
      { status: 503 },
    );
  }

  let target: URL;
  try {
    const base = new URL(configuredBase);
    if (base.protocol !== "http:" && base.protocol !== "https:") {
      throw new TypeError("Unsupported API protocol.");
    }
    target = new URL(path, `${base.origin}/`);
  } catch {
    return Response.json(
      { status: 503, message: "The URL service configuration is invalid." },
      { status: 503 },
    );
  }

  let upstream: Response;
  try {
    upstream = await fetch(target, { ...init, cache: "no-store" });
  } catch {
    return Response.json(
      {
        status: 502,
        message: "The URL service is unavailable. Please try again shortly.",
      },
      { status: 502 },
    );
  }

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      "Content-Type": upstream.headers.get("Content-Type") ?? "application/json",
    },
  });
}
