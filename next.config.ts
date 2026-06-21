import type { NextConfig } from "next";
import { fileURLToPath } from "url";
import { dirname } from "path";

// When deploying to GitHub Pages we produce a fully static export served from
// a project subpath. For Vercel/custom-domain root deploys none of this applies.
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the workspace root: a parent-level pnpm-lock.yaml exists, and Next
  // would otherwise infer the wrong root for output file tracing.
  outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),
  ...(isPages
    ? {
        output: "export",
        trailingSlash: true,
        basePath,
        assetPrefix: basePath || undefined,
        images: { unoptimized: true },
      }
    : {
        images: {
          remotePatterns: [
            { protocol: "https", hostname: "media.giphy.com" },
          ],
        },
      }),
};

export default nextConfig;
