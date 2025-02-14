const { test, expect } = require('@playwright/test');

test('First Playwright test', async ( {page} ) => {
    //chrome - plugins/cookies/...
    //const context = await browser.newContext();
    //const page = await context.newPage();

    //! locators:
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")//get the tile - assertion:
    
    const title = await page.title();
    // console.log(title);

    await userName.fill('rahulshetty');
    await page.locator('[type="password"]').fill('learning');
    await signIn.click();
    
    console.log("*********")
    console.log(await page.locator('[style*="block"]').textContent());
    console.log("*********")
    await expect(page.locator('[style*="block"]')).toContainText('Incorrect');
    await expect(page.locator('[style*="block"]')).toContainText('username/');
    await expect(page.locator('[style*="block"]')).toContainText('password');
    await page.waitForTimeout(1500);
    
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    console.log(await cardTitles.nth(2).textContent());
    await page.waitForTimeout(2000);
    
    const allTitles = await cardTitles.allTextContents();
    console.log("All Titles: " + allTitles);
    console.log(allTitles);
    
});
