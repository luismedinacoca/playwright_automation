// @ts-check
const { defineConfig, devices } = require("@playwright/test");

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: "./tests",
  retries: 1,
  workers: 4,
  timeout: 30 * 1000,
  reporter: [["html"], ["allure-playwright"]],
  use: {
    // baseURL: 'http://127.0.0.1:3000',
    video: "retain-on-failure", //on, off, retain-on-failure"
    screenshot: "only-on-failure", // on, off, only-on-failure
    trace: "on",
    ignoreHttpError: true, // SSL certification error
    permissions: ["geolocation"],
    headless: false,
    launchOptions: {
      //args: ["--start-maximized"],
      logger: {
        isEnabled: (name, severity) => true,
        log: (name, serverity, message, args) =>
          console.log(name, serverity, message),
      },
    },
  },
  expect: {
    timeout: 5_000,
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'chromium',
    //   use: {
    //     ...devices['Desktop Chrome']
    //   },
    // },

    // {
    //   name: "Microsoft Edge",
    //   use: {
    //     ...devices["Desktop Edge"],
    //     channel: "msedge",
    //     viewport: { width: 1512, height: 972 },
    //   },
    // },

    {
      name: "firefox",
      use: {
        // ...devices["iPhone 11"],
        ...devices["Desktop Firefox"],
        viewport: { width: 1512, height: 972 },
      },
    },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
