/**
 * Canonical site URL. Override at build/deploy time with
 * NEXT_PUBLIC_SITE_URL (e.g. the Vercel production domain).
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://marcinsufa.com";

/**
 * Base path the app is served under. Empty for root deploys (Vercel/custom
 * domain); set to e.g. "/marcin-sufa-portfolio" for a GitHub Pages project site.
 * `next/image` applies this automatically; plain <a href> to /public assets
 * must be wrapped with `asset()`.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefixes a root-relative public asset path with the active base path.
 * Absolute URLs (http/https/protocol-relative) are returned unchanged.
 */
export const asset = (path: string) =>
  /^(https?:)?\/\//.test(path) ? path : `${basePath}${path}`;
