/**
 * Canonical site URL. Override at build/deploy time with
 * NEXT_PUBLIC_SITE_URL (e.g. the Vercel production domain).
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://marcinsufa.com";
