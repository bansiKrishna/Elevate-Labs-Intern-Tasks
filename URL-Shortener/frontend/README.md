# forma frontend

Premium, responsive URL-shortening experience built with Next.js App Router,
React, TypeScript, Tailwind CSS 4, shadcn/ui, React Hook Form, and Zod.

## Verified backend audit

The existing Spring Boot 3.3.4 / Java 17 backend lives in `../backend`. It uses
Spring Web, Bean Validation, Spring Data JPA, H2 file storage, and a Caffeine
cache. No backend files were changed for this frontend.

| Method | Backend route | Request | Actual response / behavior |
|---|---|---|---|
| `POST` | `/api/v1/urls` | JSON: required `longUrl`; optional `customAlias` (4–20 alphanumeric, `_`, or `-`); optional `expiryDays` (1–365) | `201` JSON `{ shortCode, shortUrl, longUrl, expiresAt }` |
| `GET` | `/{code}` | Short code in path (1–40 alphanumeric, `_`, or `-`) | `302` redirect to the original destination; increments click count |
| `GET` | `/api/v1/urls/{code}/stats` | Short code in path | `200` JSON `{ shortCode, longUrl, clickCount, createdAt, expiresAt }` |

Validation errors return `400`; unavailable custom aliases return `409`; unknown
codes return `404`; expired redirects return `410`. These errors use an
`{ status, message, timestamp }` payload, except the rate limiter's `429` body,
which contains `status` and `message`. The URL creation endpoint is limited to
10 requests per 60 seconds per remote address, as configured by the backend.
There is no authentication, link-list endpoint, delete endpoint, or global
analytics endpoint. Stats are available for an individual short code.

The frontend does not call the backend from a browser origin. Next.js route
handlers proxy the two API operations through a server-only `API_BASE_URL`,
avoiding a CORS change to the backend.

## Implemented experience

- Landing page with the shortener form, product capability summary, and
  how-it-works section.
- URL validation and real creation request, including the supported optional
  custom alias and expiry selections.
- Result state with copy/open actions and an explicit per-link click-count
  request.
- Loading, validation, API unavailable, conflict/rate-limit, and recovery states.
- Branded not-found and global error recovery pages.
- Responsive layouts and reduced-motion support.

No fake link dashboard, fabricated analytics, authentication, or unsupported
management actions are shown.

## Run locally

1. Start the backend from `../backend`:

   ```powershell
   mvn spring-boot:run
   ```

2. In this directory, copy `.env.example` to `.env.local` and set
   `API_BASE_URL` to the backend's server origin (default `http://localhost:8080`):

   ```powershell
   Copy-Item .env.example .env.local
   ```

3. Install and start the frontend:

   ```powershell
   npm install
   npm run dev
   ```

4. Open `http://localhost:3000`.

For production, set `API_BASE_URL` to the backend origin in the frontend server
environment. Keep it server-only; it must not use a `NEXT_PUBLIC_` prefix.

## Project structure

```text
app/
  api/urls/                 Same-origin backend proxy routes
  globals.css               Design tokens, page styles, and responsive rules
  layout.tsx                Root metadata, fonts, and document shell
  page.tsx                  Public landing page
components/
  links/                    URL creation and result interaction
  ui/                       shadcn UI primitives
lib/
  api/                      Server-side backend forwarding
  validations/              Client and proxy request/response schemas
services/                   Typed browser-facing API service
types/                      Verified backend DTO contracts
```

## Backend limitations

The backend has no CORS configuration, user identity, listing, pagination,
editing/deletion, or aggregate analytics APIs. The frontend works around CORS
using a same-origin server proxy; additional private dashboard and link
management pages require backend capabilities that do not currently exist.
