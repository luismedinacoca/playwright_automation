const { test, expect } = require('@playwright/test');

test("second playwright test", async ( {page} ) => {
    await page.goto("https://www.google.com");
    
    //get the tile - assertion:
    const title = await page.title();
    console.log("title: ", title);
    
    //expect(page).toHaveTitle('Google');  /* it need await first => error */
    await expect(page).toHaveTitle('Google');
});

test("Creating previous variable/locators", async ( {page} ) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 

    //variables: without await
    const username = page.locator('#username');
    const password = page.locator('[type="password"]');
    const signInBtn = page.locator('#signInBtn');
    const cardTitle = page.locator(".card-body a");

    //actions
    await username.fill('rahulshettyacademy');
    await password.fill('learning');
    await signInBtn.click();
    const firstTitle = await cardTitle.first().textContent();
    console.log(firstTitle);
    console.log(await cardTitle.nth(0).textContent());
    console.log("with .selectText()", await cardTitle.nth(0).selectText());
    console.log(await cardTitle.nth(1).textContent());
    await page.waitForTimeout(2500);

    // to wrap all titles
    const allTitles = await cardTitle.allTextContents(); 
    console.log("all titles: ", allTitles);
    //await expect(allTitles);
    allTitles.includes(firstTitle);
    console.log("First Title is included!")
});

test("Assessment of .allTextContents() - no previous searching", async ( {page} ) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 

    //variables: without await
    const username = page.locator('#username');
    const password = page.locator('[type="password"]');
    const signInBtn = page.locator('#signInBtn');
    const cardTitle = page.locator(".card-body a");

    //actions
    await username.fill('rahulshettyacademy');
    await password.fill('learning');
    await signInBtn.click();
    
    // console.log(await cardTitle.first().textContent());
    // console.log(await cardTitle.nth(0).textContent());
    // console.log(await cardTitle.nth(1).textContent());
    
    // to wrap all titles
    const allTitles = await cardTitle.allTextContents(); 
    console.log("allTitles", allTitles)
    console.log("allTitles.length: ", allTitles.length)
    
});

test("Assessment of .allTextContents() - with previous searching", async ( {page} ) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 

    //variables: without await
    const username = page.locator('#username');
    const password = page.locator('[type="password"]');
    const signInBtn = page.locator('#signInBtn');
    const cardTitle = page.locator(".card-body a");

    //actions
    await username.fill('rahulshettyacademy');
    await password.fill('learning');
    await signInBtn.click();
    
    console.log(await cardTitle.first().textContent());
    console.log(await cardTitle.nth(0).textContent());
    console.log(await cardTitle.nth(1).textContent());
    
    // to wrap all titles
    const allTitles = await cardTitle.allTextContents(); 
    console.log("allTitles", allTitles)
    console.log("allTitles.length: ", allTitles.length)
});