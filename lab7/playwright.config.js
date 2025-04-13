import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

// setup import alias
import "module-alias/register";

// setup env variables
dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: 2,
  reporter: "dot",
  use: {
    baseURL: process.env.BASE_URL,
  },
  expect: {
    toHaveScreenshot: { maxDiffPixels: 10 },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
