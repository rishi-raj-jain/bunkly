import { defineConfig } from "@playwright/test";

const headed = !!process.env.HEADED;
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: 0,
  timeout: 120_000,
  expect: { timeout: 120_000 },
  // In CI: blob reporter lets the report job merge shards into one HTML report.
  // Locally: plain HTML report opens automatically on failure.
  reporter: isCI
    ? [["blob"], ["line"]]
    : [["html", { open: "never" }]],
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
      // All non-auth tests. In CI, the setup job handles seeding + storageState
      // before this project runs, so no project dependency is needed there.
      // Locally, the dependency ensures setup always runs first.
      name: "e2e",
      dependencies: isCI ? [] : ["setup"],
      use: { storageState: "tests/.auth/user.json" },
      testIgnore: ["auth.setup.ts", "auth.spec.ts"],
    },
    {
      // Dedicated auth tests (login / register UI). No storageState needed.
      // In CI, the setup job seeds the DB before this project runs.
      name: "auth",
      dependencies: isCI ? [] : ["setup"],
      testMatch: "auth.spec.ts",
    },
  ],
  webServer: {
    command: "npm run start",
    url: "http://localhost:3000",
    // Reuse an already-running dev server locally; always start fresh in CI.
    reuseExistingServer: !isCI,
    timeout: 120_000,
  },
});
