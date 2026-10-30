/**
 * File: components/links/url-shortener-form.tsx
 *
 * Purpose:
 * Collects URL creation options and renders the real result from the backend.
 *
 * Responsibilities:
 * - Validate destination URL, optional alias, and expiry selection.
 * - Submit through the typed URL service and show loading/error states.
 * - Support copying the returned short URL and fetching its actual click stats.
 *
 * Inputs:
 * - User-entered destination URL, optional alias, and supported expiry period.
 *
 * Outputs:
 * - Accessible form controls, created-link result, and optional per-link stats.
 *
 * Dependencies:
 * - React Hook Form, Zod resolver, shadcn Button, Lucide icons, and the URL API
 *   service.
 *
 * Notes:
 * Stats are requested only for the link just created; no global analytics or
 * link listing is implied by the interface.
 */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowUpRight,
  ChartNoAxesColumnIncreasing,
  Check,
  Clipboard,
  Clock3,
  ExternalLink,
  Link2,
  LoaderCircle,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  createUrlSchema,
  type CreateUrlFormInput,
  type CreateUrlFormOutput,
} from "@/lib/validations/url-schema";
import { urlShortenerService } from "@/services/url-shortener.service";
import type { UrlResponse, UrlStatsResponse } from "@/types/url-shortener";

export function UrlShortenerForm() {
  const [createdUrl, setCreatedUrl] = useState<UrlResponse | null>(null);
  const [stats, setStats] = useState<UrlStatsResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [statsError, setStatsError] = useState<string | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateUrlFormInput, undefined, CreateUrlFormOutput>({
    resolver: zodResolver(createUrlSchema),
    defaultValues: {
      longUrl: "",
      customAlias: "",
      expiryDays: "",
    },
  });

  async function onSubmit(values: CreateUrlFormOutput) {
    setFormError(null);
    setStats(null);
    setStatsError(null);
    setCopied(false);

    try {
      const response = await urlShortenerService.create(values);
      setCreatedUrl(response);
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "We couldn't create that link. Please try again.",
      );
    }
  }

  async function copyShortUrl() {
    if (!createdUrl) return;

    try {
      await navigator.clipboard.writeText(createdUrl.shortUrl);
      setCopied(true);
    } catch {
      setFormError("Clipboard access is unavailable. Select and copy the link.");
    }
  }

  async function loadStats() {
    if (!createdUrl) return;

    setIsLoadingStats(true);
    setStatsError(null);
    try {
      setStats(await urlShortenerService.getStats(createdUrl.shortCode));
    } catch (error) {
      setStatsError(
        error instanceof Error
          ? error.message
          : "We couldn't load click stats right now.",
      );
    } finally {
      setIsLoadingStats(false);
    }
  }

  function makeAnotherLink() {
    setCreatedUrl(null);
    setStats(null);
    setStatsError(null);
    setFormError(null);
    setCopied(false);
    reset();
  }

  return (
    <div className="shortener-content">
      {!createdUrl ? (
        <form className="shortener-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-heading">
            <div>
              <p className="form-eyebrow">THE GOOD PART STARTS HERE</p>
              <h2>Make your link.</h2>
              <p className="form-subtitle">
                Paste a destination. We&apos;ll make it share-ready.
              </p>
            </div>
            <span aria-hidden="true" className="form-sparkle">
              <WandSparkles size={20} />
            </span>
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="longUrl">
              Destination URL
            </label>
            <div className={`url-input-wrap${errors.longUrl ? " has-error" : ""}`}>
              <Link2 aria-hidden="true" className="url-input-icon" size={17} />
              <input
                autoComplete="url"
                aria-describedby={errors.longUrl ? "longUrl-error" : "longUrl-help"}
                aria-invalid={Boolean(errors.longUrl)}
                className="url-input"
                id="longUrl"
                placeholder="https://your-great-thing.com"
                type="url"
                {...register("longUrl")}
              />
            </div>
            {errors.longUrl ? (
              <p className="field-error" id="longUrl-error" role="alert">
                {errors.longUrl.message}
              </p>
            ) : (
              <p className="field-hint" id="longUrl-help">
                Make sure it starts with http:// or https://
              </p>
            )}
          </div>

          <div className="options-grid">
            <div className="field-group">
              <label className="field-label" htmlFor="customAlias">
                Custom alias <span className="optional-label">OPTIONAL</span>
              </label>
              <div className={`alias-input-wrap${errors.customAlias ? " has-error" : ""}`}>
                <span aria-hidden="true" className="alias-prefix">
                  /
                </span>
                <input
                  aria-describedby={
                    errors.customAlias ? "customAlias-error" : "customAlias-help"
                  }
                  aria-invalid={Boolean(errors.customAlias)}
                  className="alias-input"
                  id="customAlias"
                  maxLength={20}
                  placeholder="your-name"
                  {...register("customAlias")}
                />
              </div>
              {errors.customAlias ? (
                <p className="field-error" id="customAlias-error" role="alert">
                  {errors.customAlias.message}
                </p>
              ) : (
                <p className="field-hint" id="customAlias-help">
                  4–20 letters, numbers, _ or -
                </p>
              )}
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="expiryDays">
                Expiration <span className="optional-label">OPTIONAL</span>
              </label>
              <div className="select-wrap">
                <Clock3 aria-hidden="true" className="select-icon" size={15} />
                <select
                  aria-label="Link expiry"
                  className="expiry-select"
                  id="expiryDays"
                  {...register("expiryDays")}
                >
                  <option value="">Never</option>
                  <option value="1">1 day</option>
                  <option value="7">7 days</option>
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                  <option value="365">365 days</option>
                </select>
              </div>
              <p className="field-hint">Choose how long it stays active.</p>
            </div>
          </div>

          {formError ? (
            <div className="api-error" role="alert">
              <span>{formError}</span>
            </div>
          ) : null}

          <Button
            className="create-button"
            disabled={isSubmitting}
            size="lg"
            type="submit"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle aria-hidden="true" className="spin-icon" size={16} />
                Making your link…
              </>
            ) : (
              <>
                Shorten this link
                <ArrowUpRight aria-hidden="true" size={16} />
              </>
            )}
          </Button>
          <p className="form-legal">
            By creating a link, you agree to use it responsibly.
          </p>
        </form>
      ) : (
        <section aria-labelledby="result-title" className="created-result">
          <div className="result-success">
            <span aria-hidden="true" className="result-check">
              <Check size={17} />
            </span>
            <span>LINK CREATED</span>
          </div>
          <h2 id="result-title">That&apos;s a good link.</h2>
          <p className="result-caption">Your short link is ready to share.</p>

          <div className="result-link-box">
            <span className="result-link-icon">
              <Link2 aria-hidden="true" size={16} />
            </span>
            <a href={createdUrl.shortUrl} rel="noreferrer" target="_blank">
              {createdUrl.shortUrl}
            </a>
            <Button
              aria-label={copied ? "Short link copied" : "Copy short link"}
              className="copy-button"
              onClick={copyShortUrl}
              size="icon"
              type="button"
              variant="secondary"
            >
              {copied ? <Check size={16} /> : <Clipboard size={16} />}
            </Button>
          </div>
          <p
            aria-live="polite"
            className={`copy-feedback${formError ? " copy-feedback-error" : ""}`}
          >
            {formError ??
              (copied
                ? "Copied to your clipboard."
                : "Anyone with this link can open it.")}
          </p>

          <div className="result-destination">
            <span>DESTINATION</span>
            <p title={createdUrl.longUrl}>{createdUrl.longUrl}</p>
          </div>

          <div className="result-actions">
            <a
              className="open-link-button"
              href={createdUrl.shortUrl}
              rel="noreferrer"
              target="_blank"
            >
              Open link <ExternalLink aria-hidden="true" size={14} />
            </a>
            <Button
              className="stats-button"
              disabled={isLoadingStats}
              onClick={loadStats}
              type="button"
              variant="outline"
            >
              {isLoadingStats ? (
                <LoaderCircle aria-hidden="true" className="spin-icon" size={14} />
              ) : (
                <ChartNoAxesColumnIncreasing aria-hidden="true" size={14} />
              )}
              {isLoadingStats ? "Checking…" : "Check clicks"}
            </Button>
          </div>

          {stats ? (
            <div aria-live="polite" className="click-stat">
              <span className="click-stat-sparkle">
                <Sparkles aria-hidden="true" size={15} />
              </span>
              <span>
                <strong>{stats.clickCount.toLocaleString()}</strong>
                <small>{stats.clickCount === 1 ? "click so far" : "clicks so far"}</small>
              </span>
              <span className="click-stat-caption">Live count</span>
            </div>
          ) : null}
          {statsError ? (
            <p className="stats-error" role="alert">
              {statsError}
            </p>
          ) : null}

          <Button
            className="make-another-button"
            onClick={makeAnotherLink}
            type="button"
            variant="ghost"
          >
            Make another link
          </Button>
        </section>
      )}
    </div>
  );
}
