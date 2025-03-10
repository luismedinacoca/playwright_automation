import { test, expect, describe } from "@playwright/test";

test.describe("Section 09 - Handling Web Dialog, Frames & Event listeners with Playwright", () => {
  test("Pop-up validations", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.waitForTimeout(1000);

    await page.goto("https://www.google.com/");
    await page.waitForTimeout(1000);

    await page.goBack();
    await page.waitForTimeout(1000);

    await page.goForward();
    await page.waitForTimeout(2000);
  });

  test("`.toBeVisible() method`", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.waitForTimeout(1000);

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.waitForTimeout(1000);

    await page.locator("#hide-textbox").click();
    await page.waitForTimeout(1000);

    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.waitForTimeout(2000);
  });
});
