import { test, expect, describe } from "@playwright/test";

test.describe("Rahul Shetty Academy - Angular practice page", () => {
  test("Playwright special locators", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel('Employed').check();
    const employedChecked = await page.getByLabel('Employed').isChecked();
    expect(employedChecked).toBeTruthy();
    if(employedChecked){
      console.log("Employed radio button is checked");
    }

    await page.getByLabel('Gender').selectOption('Female');
    await page.waitForTimeout(2000);
  });
});
