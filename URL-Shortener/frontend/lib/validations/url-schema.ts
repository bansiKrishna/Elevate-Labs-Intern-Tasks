/**
 * File: lib/validations/url-schema.ts
 *
 * Purpose:
 * Keeps browser and proxy validation aligned with the backend URL request rules.
 *
 * Responsibilities:
 * - Validate HTTP(S) destination URLs and supported alias syntax.
 * - Restrict expiry selections to values within the backend's 1–365 day range.
 * - Convert blank optional form values into omitted API request properties.
 *
 * Inputs:
 * - Form values or an untrusted JSON payload containing URL creation fields.
 *
 * Outputs:
 * - Zod schemas and inferred input/output types for form and service code.
 *
 * Dependencies:
 * - Zod and the backend CreateUrlRequest contract.
 *
 * Notes:
 * The backend remains authoritative and performs its own request validation.
 */
import { z } from "zod";

const formSchema = z.object({
  longUrl: z
    .string()
    .trim()
    .min(1, "Enter a destination URL.")
    .max(2048, "The URL must be 2,048 characters or fewer.")
    .url("Enter a valid URL.")
    .refine((value) => {
      try {
        return ["http:", "https:"].includes(new URL(value).protocol);
      } catch {
        return false;
      }
    }, "Use a URL that starts with http:// or https://."),
  customAlias: z
    .string()
    .max(20, "Your alias can be up to 20 characters.")
    .refine(
      (value) => value.length === 0 || /^[a-zA-Z0-9_-]{4,20}$/.test(value),
      "Use 4–20 letters, numbers, underscores, or hyphens.",
    ),
  expiryDays: z.enum(["", "1", "7", "30", "90", "365"]),
});

export const createUrlSchema = formSchema.transform(
  ({ customAlias, expiryDays, longUrl }) => ({
    longUrl,
    ...(customAlias ? { customAlias } : {}),
    ...(expiryDays ? { expiryDays: Number(expiryDays) } : {}),
  }),
);

export const createUrlRequestSchema = z.object({
  longUrl: formSchema.shape.longUrl,
  customAlias: z
    .string()
    .regex(/^[a-zA-Z0-9_-]{4,20}$/)
    .optional(),
  expiryDays: z.number().int().min(1).max(365).optional(),
});

export const urlResponseSchema = z.object({
  shortCode: z.string(),
  shortUrl: z.string().url(),
  longUrl: z.string().url(),
  expiresAt: z.string().nullable(),
});

export const urlStatsResponseSchema = z.object({
  shortCode: z.string(),
  longUrl: z.string().url(),
  clickCount: z.number().nonnegative(),
  createdAt: z.string(),
  expiresAt: z.string().nullable(),
});

export type CreateUrlFormInput = z.input<typeof formSchema>;
export type CreateUrlFormOutput = z.output<typeof createUrlSchema>;
export type CreateUrlRequestInput = z.infer<typeof createUrlRequestSchema>;
