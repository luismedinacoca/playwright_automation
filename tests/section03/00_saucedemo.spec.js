import { test, expect, chromium } from "@playwright/test";

test.use({
  viewport: {
    width: 1512,
    height: 982,
  },
});

test("Purchase an Item", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.getByRole("textbox", { name: "Username" }).fill("standard_user");
  await page.getByRole("textbox", { name: "Password" }).fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForTimeout(3500);

  //await page.pause();
});
