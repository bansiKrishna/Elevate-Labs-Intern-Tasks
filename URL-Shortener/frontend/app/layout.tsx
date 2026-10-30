/**
 * File: app/layout.tsx
 *
 * Purpose:
 * Defines the root document and shared metadata for the App Router application.
 *
 * Responsibilities:
 * - Load the shared Geist font family and global design tokens.
 * - Provide document language, body structure, and browser metadata.
 *
 * Inputs:
 * - Next.js-provided page or nested-layout children.
 *
 * Outputs:
 * - The root HTML document containing the active route.
 *
 * Dependencies:
 * - Next.js metadata and font APIs, and app/globals.css.
 */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "forma — Good links. Better first impressions.",
  description:
    "Create thoughtful short links with custom aliases, optional expiry, and real per-link click counts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
