const { test, expect } = require('@playwright/test');

test("Playwright Inspection & Debug", async ({ browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
  
    const documentLink = page.locator('a[href*="documents-request"]');
  
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  
    // Option 1: Using `page.waitForEvent` (Recommended)
    const [newPage] = await Promise.all([
      page.waitForEvent('popup'), // Wait for the 'popup' event
      documentLink.click(), // Click the link that opens the new tab
    ]);
  
    // Now you have the new page object in 'newPage'
    await newPage.waitForLoadState(); // Wait for the new page to load
    const newPageURL = await newPage.url();
    console.log("👉🏽 New Tab URL:", newPageURL);
    // Perform your assertions on the new page here
    await expect(newPage).toHaveURL(/documents-request/); // Example assertion
  
    //await newPage.waitForTimeout(3000);
  
    const redText = await newPage.locator('.red').textContent();
    console.log("👁️ Red text from new tab: ", redText);
  
  
    await newPage.close(); // Close the new tab
    await page.close(); // Close the original tab
    await context.close();
    await browser.close();
  })