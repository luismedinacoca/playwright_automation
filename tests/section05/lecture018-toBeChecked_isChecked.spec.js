const { test, expect } = require('@playwright/test');

test('UI control', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")

    //locators:
    const username = page.locator("#username");
    const password = page.locator("#password");
    const radioBtns = page.locator(".radiotextsty");
    const checkbox = page.locator("#terms");

    await page.waitForTimeout(1000);
    //actions
    await username.fill("anshika@gmail.com");
    await password.fill("Iamking@000");
    await page.waitForTimeout(1000);

    //Radio button
    await page.locator(".radiotextsty").last().click();
    await page.waitForTimeout(1000);

    //alert
    await page.locator('#okayBtn').click();

    //verify radio button are checked
    expect(radioBtns.last()).toBeChecked();
    console.log("last radio button is checked!")

    console.log("Is  radioBtns.last().isChecked()? ", await radioBtns.last().isChecked());

    // Checked checkbox assertion
    await checkbox.check();
    await expect(checkbox).toBeChecked();  //expect structure => locator

    await checkbox.uncheck();
    expect(await checkbox.isChecked()).toBeFalsy(); // expect structure => boolean value
});