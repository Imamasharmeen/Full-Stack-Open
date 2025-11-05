import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: 'tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    actionTimeout: 0,
    baseURL: 'http://localhost:5173', // Vite dev server default
    trace: 'on-first-retry',
  },

  // Start the frontend dev server before running tests
  webServer: {
    command: 'npm run dev',
    cwd: '../step5',           // relative to bloglist-e2e folder
    url: 'http://localhost:5173',
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // other projects...
  ],
})