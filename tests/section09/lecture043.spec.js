import { test, expect, describe } from "@playwright/test";

test.describe("Section 09 - Handling Web Dialog, Frames & Event listeners with Playwright", () => {
  test("Alert - Confirm", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    // In playwright any alert is considered as "dialog"
    page.on("dialog", (dialog) => dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.waitForTimeout(1500);

    // page.on("dialog", (dialog) => dialog.dismiss());
    // await page.locator("#confirmbtn").click();
    // await page.waitForTimeout(2500);
  });
});

test.describe("Section 09 - Handling Web Dialog with Playwright", () => {
  test.beforeEach(async ({ page }) => {
    // Assuming you have a page with a button that triggers the alert.
    // Replace 'your-page-url' and 'button-selector' with your actual values.
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.click("#confirmbtn"); // Click the button to trigger the alert
  });

  test("Accept alert", async ({ page }) => {
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain(
        "Hello , Are you sure you want to confirm?"
      ); // Verify alert message
      await dialog.accept();
    });

    // If there is any element that changes upon alert acceptance, verify it here.
    // Example: await expect(page.locator('#element-after-accept')).toHaveText('Accepted');
  });

  test("Dismiss alert", async ({ page }) => {
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain(
        "Hello , Are you sure you want to confirm?"
      ); // Verify alert message
      await dialog.dismiss();
    });

    // If there is any element that changes upon alert dismissal, verify it here.
    // Example: await expect(page.locator('#element-after-dismiss')).toHaveText('Dismissed');
  });
});

test.describe("Hover over", () => {
  test("Hover over the 'mouse hover' button", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.waitForTimeout(1000);

    const totalAmount = await page.locator(".totalAmount");
    totalAmount.evaluate((element) => element.scrollIntoView());
    await page.waitForTimeout(1500);

    // #mousehover
    await page.locator("#mousehover").hover();

    await page.waitForTimeout(1500);
  });
});
