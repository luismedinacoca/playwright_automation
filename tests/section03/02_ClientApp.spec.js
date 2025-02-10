const { test, expect } = require('@playwright/test');

test('First Playwright test', async ({page}) => {
    //const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client/")

    //! locators:
    await page.locator("#userEmail").type("anshika@gmail.com");
    await page.locator("#userPassword").type("Iamking@000");
    await page.locator("[value='Login']").click();
    
    //await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor();

    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    const currentUrl = await page.url();
    const expectedUrl = 'https://rahulshettyacademy.com/client/dashboard/dash';
    expect(currentUrl).toBe(expectedUrl);

    // await page.waitForTimeout(2000);
});