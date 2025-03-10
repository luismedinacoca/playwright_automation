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

    await page.getByPlaceholder('Password').fill('fge byb yonerigh!');

    await page.getByRole('button', {name: "Submit"}).click();

    //scroll to navbar in order to see the successful message
    const navbar = await page.locator('nav.navbar');
    navbar.evaluate(element => element.scrollIntoView());
    
    const successMessage = await page.getByText('Success! The Form has been submitted successfully!.').isVisible()
    expect(successMessage).toBeTruthy();

    // ********** click on Shop link in navbar ********** \\
    await page.getByRole('link', {name: "Shop"}).click();
    await page.locator('app-card-list.row').waitFor();


    await page.waitForTimeout(1500);
    await page.locator('app-card').filter({hasText: "Nokia Edge"}).isVisible();
    //await page.getByRole('link', {name: "Nokia Edge"})
    await page.locator('app-card')
      .filter({hasText: "Nokia Edge"})
      .getByRole('button')
      .click();
    // await page.getByText('Checkout').click()
    // await page.getByText('Checkout').click()

  });
});
