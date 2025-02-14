const { test, expect } = require('@playwright/test');
test('Not Using .waitForLoadState("networkidle")', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/client/")

    //locators:
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
 
    //...

    const titles = await page.locator(".card-body b").allTextContents();
    console.log("All Titles on page: ", titles);

    await page.waitForTimeout(2000);
});


test('Using .waitForLoadState("networkidle")', async ({page}) => {
    //const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client/")

    //! locators:
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    
    //wait mechanism: await page.waitForLoadState("networkidle");
    await page.waitForLoadState("networkidle");
    //await page.locator(".card-body b").first().waitFor();

    const titles = await page.locator(".card-body b").allTextContents();
    console.log("All Titles on page: ", titles);

    await page.waitForTimeout(2000);
});

test('Using .waitFor() due to .waitForLoadState() flakiness', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/client/")

    //locators:
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    
    //await page.waitForLoadState("networkidle"); // ← flakiness
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();

    console.log("All Titles on page: ", titles);
    await page.waitForTimeout(2000);
});