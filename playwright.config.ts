import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  timeout: 30_000,
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: `npm run build && npx next start -p ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    env: {
      // Placeholder Sanity config: fetches fail fast and pages fall back to
      // their bundled static content, which is what these smoke tests assert.
      NEXT_PUBLIC_SANITY_PROJECT_ID:
        process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "placeholder",
      NEXT_PUBLIC_SANITY_DATASET:
        process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
    },
  },
});
