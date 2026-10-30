/**
 * File: lib/utils.ts
 *
 * Purpose:
 * Re-exports the class-name merger used by shadcn UI primitives.
 *
 * Responsibilities:
 * - Provide one stable project alias for conditional class composition.
 *
 * Inputs:
 * - None directly; callers import the exported cn helper.
 *
 * Outputs:
 * - The cn utility from the shadcn-compatible helper package.
 *
 * Dependencies:
 * - The cn package configured by shadcn initialization.
 */
export { cn } from "cn"
