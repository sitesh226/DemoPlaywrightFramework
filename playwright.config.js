// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,   // Tests in same class execute sequentially when false. 
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : Number(process.env.RETRIES || 0),
  workers: process.env.CI ? 2 : Number(process.env.WORKERS || 4), // Number of files in parallel
  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000,
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],
  use: {
    baseURL: 'https://rahulshettyacademy.com',
    headless: process.env.HEADLESS !== 'false',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',   // for tracing . 
                      
                  // 'on'	Always record trace
                  // 'off'	Never record trace
                  // 'retain-on-failure'	Keep trace only for failed tests
                  // 'on-first-retry'	Record trace only during first retry
                  // 'on-all-retries'	Record trace on every retry
                  // 'retain-on-first-failure'
    actionTimeout: 10 * 1000,
    navigationTimeout: 20 * 1000,
  },
  projects: [
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
  outputDir: 'test-results',
});
