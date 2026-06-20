import type { NextConfig } from "next";
import { fileURLToPath } from "url";
import { dirname } from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the workspace root: a parent-level pnpm-lock.yaml exists, and Next
  // would otherwise infer the wrong root for output file tracing.
  outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "media.giphy.com" },
    ],
  },
};

export default nextConfig;
