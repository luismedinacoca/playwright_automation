import { test, expect, describe } from "@playwright/test";

test.describe("Section 09 - Handling Web Dialog, Frames & Event listeners with Playwright", () => {
  test("Alert - Confirm", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    const thirdBlock = await page.locator(".block").nth(3);
    thirdBlock.evaluate((Element) => Element.scrollIntoView());
    await page.waitForTimeout(1500);

    //clicking on iframe locator ID:
    const framePage = page.frameLocator("iframe#courses-iframe");
    //visible locator only
    framePage.locator('li a[href*="lifetime-access"]:visible').click();
    const textCheck = await framePage.locator(".text h2 span").textContent();
    //console.log(textCheck.split(" ")[1]);
    console.log(textCheck);
    expect(textCheck).toBe("13,522");

    await page.waitForTimeout(1500);
  });
});
