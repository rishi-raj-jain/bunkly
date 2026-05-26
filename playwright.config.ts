import { defineConfig } from "@playwright/test";

const headed = !!process.env.HEADED;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: 0,
  timeout: 120_000,
  expect: { timeout: 120_000 },
  reporter: [["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    navigationTimeout: 120_000,
    actionTimeout: 120_000,
    headless: !headed,
  },
  projects: [
    {
      // Seeds the DB and saves a logged-in storageState for reuse.
      name: "setup",
      testMatch: "auth.setup.ts",
    },
    {
      // All non-auth tests. Depends on setup so storageState exists before running.
      name: "e2e",
      dependencies: ["setup"],
      use: { storageState: "tests/.auth/user.json" },
      testIgnore: ["auth.setup.ts", "auth.spec.ts"],
    },
    {
      // Dedicated auth test. No storageState — exercises real login UI.
      // Depends on setup so the seed runs before auth tests start.
      name: "auth",
      dependencies: ["setup"],
      testMatch: "auth.spec.ts",
    },
  ],
  webServer: {
    command: "npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
