/**
 * File: app/error.tsx
 *
 * Purpose:
 * Provides a safe recovery state for unexpected App Router rendering errors.
 *
 * Responsibilities:
 * - Avoid exposing exception details to visitors.
 * - Let a visitor retry the failed route through Next.js's reset action.
 *
 * Inputs:
 * - Next.js error boundary props, including the reset callback.
 *
 * Outputs:
 * - An accessible error message and retry button.
 *
 * Dependencies:
 * - React client rendering and the shared landing-page design styles.
 *
 * Notes:
 * Backend proxy errors are handled in the form; this boundary covers unexpected
 * rendering failures and deliberately does not display internal error messages.
 */
"use client";

import { RefreshCw } from "lucide-react";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="utility-page">
      <section aria-labelledby="error-title" className="utility-panel">
        <span aria-hidden="true" className="utility-error-mark">
          <RefreshCw size={18} />
        </span>
        <p className="utility-code">SOMETHING WENT OFF COURSE</p>
        <h1 id="error-title">Let&apos;s try that again.</h1>
        <p className="utility-description">
          Something unexpected happened while loading this page. Your links
          haven&apos;t been changed.
        </p>
        <button className="utility-action" onClick={reset} type="button">
          <RefreshCw aria-hidden="true" size={14} />
          Try again
        </button>
      </section>
    </main>
  );
}
