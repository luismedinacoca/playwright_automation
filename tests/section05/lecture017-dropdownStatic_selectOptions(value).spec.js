const { test, expect } = require('@playwright/test');

test('UI control', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")

    //locators:
    const username = page.locator("#username");
    const password = page.locator("#password");
    const dropdown = page.locator("select.form-control");
    const signInBtn = page.locator("#signInBtn");

    //actions
    await username.fill("anshika@gmail.com");
    await password.fill("Iamking@000");
    //await page.waitForTimeout(2000);

    //dropdown:
    dropdown.selectOption("consult");
    //await page.waitForTimeout(2000);

    //Radio button
    await page.locator(".radiotextsty").last().click();
    //await page.waitForTimeout(1000);

    //alert
    await page.locator('#okayBtn').click();
    //await page.waitForTimeout(2000);

    await page.locator("#terms").check();
    
    await signInBtn.click()
    await page.waitForTimeout(2000);
});
