/**
 * File: app/not-found.tsx
 *
 * Purpose:
 * Presents a branded recovery page for frontend routes that do not exist.
 *
 * Responsibilities:
 * - Explain that the requested page is unavailable.
 * - Provide a clear, keyboard-accessible path back to the shortener.
 *
 * Inputs:
 * - No props; Next.js renders this file for unmatched App Router routes.
 *
 * Outputs:
 * - A concise 404 state with a home action.
 *
 * Dependencies:
 * - Next.js App Router, Lucide icons, and the shared landing-page styles.
 */
import { ArrowLeft, Link2 } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="utility-page">
      <section aria-labelledby="not-found-title" className="utility-panel">
        <span aria-hidden="true" className="brand-mark utility-mark">
          <Link2 size={18} />
        </span>
        <p className="utility-code">404 — NOT FOUND</p>
        <h1 id="not-found-title">This link went nowhere.</h1>
        <p className="utility-description">
          The page you&apos;re looking for isn&apos;t here. Let&apos;s get you back to a
          good link.
        </p>
        <Link className="utility-action" href="/">
          <ArrowLeft aria-hidden="true" size={15} />
          Back to forma
        </Link>
      </section>
    </main>
  );
}
