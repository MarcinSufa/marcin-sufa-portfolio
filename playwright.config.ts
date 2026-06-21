import { defineConfig, devices } from "@playwright/test";

/**
 * E2E config. Runs against a local dev server.
 * First time: `pnpm exec playwright install` to fetch browsers.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3100",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  // Dedicated port + always-fresh server so e2e never reuses a stale dev
  // server (the common cause of "missing JS chunk" flakes on :3000).
  webServer: {
    command: "pnpm dev --port 3100",
    url: "http://localhost:3100",
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
