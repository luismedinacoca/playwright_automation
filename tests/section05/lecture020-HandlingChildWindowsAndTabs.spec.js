const { test, expect } = require('@playwright/test');

test('Child window handling', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")

    //locators:
    const documentLink = page.locator('a[href*="documents-request"]');

    await expect(documentLink).toHaveAttribute('class', 'blinkingText');
    await expect(documentLink).toHaveClass('blinkingText');
    
    // Event Handling:
    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'), // listen for any new page pending, rejected, fulfilled
            await documentLink.click(), // new page is opened
        ]
    )
    const redText = await newPage.locator('.red').textContent();
    console.log("Text from new tab: ", redText);
});

test("Open and handling a new Tab", async ({ browser}) => {
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