import { test, expect, describe } from "@playwright/test";

test.describe("Rahul Shetty Academy - Client page", () => {
  test("Test Rahul Shetty page", async ({page}) => {
    const userName = page.getByPlaceholder('email@example.com');
    const password = page.getByPlaceholder('enter your passsword');
    const loginBtn = page.getByRole('button', {name: "login"});
    const adidas = "ADIDAS ORIGINAL";
    const products = page.locator(".card-body")
    const userEmail = 'pyramide_glass@mailinator.com';
    const userPwd = 'Benabar2025!';

    await page.goto("https://rahulshettyacademy.com/client/")//get the tile - assertion:
    
    await userName.fill(userEmail);
    await password.fill(userPwd);
    await loginBtn.click();

    // ************* Home page ************* \\

    //await page.waitForLoadState('networkidle');
    //await page.locator(".card-body b").first().waitFor();
    
    
    //ADIDAS ORIGINAL product might be selected:
    await page.locator(".card-body")
    //   //.filter({hasText:"ADIDAS ORIGINAL"}) 
      .filter({hasText:`${adidas}`})
      .getByRole('button', {name: "Add To Cart"})
      .click();
  
      await page.getByRole('listitem')
        .getByRole('button', {name: "Cart"}).click();
      
    // ************* Checkout page ************* \\
    await page.locator('div li').first().waitFor();
    await expect(page.getByText('ADIDAS ORIGINAL')).toBeVisible();
    await expect(page.getByRole('button', {name: "Continue Shopping"})).toBeVisible();
    
    //Click on "Checkout" button:
    await expect(page.getByRole('button', {name: "Checkout"})).toBeVisible();
    await page.getByRole('button', {name: "Checkout"}).click();

    // ************* Payment page ************* \\
    const cardInfoFields = page.locator('.field input');

    await cardInfoFields.nth(0).fill('4000 0000 0000 1000')
    await cardInfoFields.nth(1).fill('100')
    await cardInfoFields.nth(2).fill('Pyramid Glass')
    await cardInfoFields.nth(3).fill('rahulshettyacademy')
    await page.locator("button[type='submit']").click();
    
    await page.getByText('* Coupon Applied').waitFor();
    const coupon = await page.getByText('* Coupon Applied').isVisible();
    expect(coupon).toBeTruthy();

    await page.getByPlaceholder("Select Country").pressSequentially('United');

    const dropdown = page.locator('.ta-results');
    const countryName = "United Kingdom";
    
    await dropdown.waitFor();
    await expect(page.getByRole("button", {name: `${countryName}`})).toBeVisible();
    await page.getByRole("button", {name: `${countryName}`}).click();

    // if(await page.getByLabel(`${userEmail}`).isVisible()){
    //   console.log("Email from label is visible");
    // }
    // const email = await page.getByLabel(`${userEmail}`).textContent();
    // console.log("email from label: ", email)
    // expect(email).toContain(userEmail);

    const email = await page.locator('.user__name label').textContent();
    expect(email).toBe(userEmail);

    await page.getByText('place order').click();
    
    // ************* Thank You page ************* \\

    // Thankyou title validation:
    const titleThankyouTitle = await page.locator('.hero-primary').textContent();
    expect(titleThankyouTitle).toContain('Thankyou for the order');
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');

    // saving orderNumberId:
    const orderNumber = await page.locator('.em-spacer-1 .ng-star-inserted').textContent()

    // await page.getByRole("button", {name: "   ORDERS"}).click();
    await page.locator('button[routerlink*="myorders"]').click();

    // ************ ORDER Page ************ \\

    await page.locator('tbody').waitFor();

    await page.locator('h1').isVisible();
    const orderPageTitle = await page.locator('h1').textContent();
    expect(orderPageTitle).toBe('Your Orders');

    await page.locator('.row button').first().isVisible();
    const goBackToShopBtn = await page.locator('.row button').first().textContent();
    expect(goBackToShopBtn).toBe('Go Back to Shop');

    const rows = await page.locator('tbody tr');
    const rowsCount = await rows.count();
    // console.log(">>> rowsCount: ", rowsCount);

    let rowOrderId = '';

    for(let i = 0; i < rowsCount; i++){
      rowOrderId = await rows.nth(i).locator('th').textContent();
      // console.log(rowOrderId)
      // console.log(orderNumber)
      if(orderNumber.includes(rowOrderId)){
        console.log('Orders are equals')
        await rows.nth(i).locator('button.btn-primary').click();
        break;
      }
    }
    
    // ************** ORDER SUMMARY PAGE ************** \\
    expect(await page.locator('.email-title').isVisible())
    const orderSummaryTitle = await page.locator('.email-title').textContent()
    expect(orderSummaryTitle).toBe(' order summary ')

    await page.locator('[class*="col-text"]').isVisible()
    const orderSummaryPage = await page.locator('[class*="col-text"]').textContent();
    // console.log("orderSummaryPage: ", orderSummaryPage);
    expect(orderSummaryPage).toContain(rowOrderId);
    console.log(`📌 👉🏽 ${orderSummaryPage} contains ${rowOrderId}`)

    await page.waitForTimeout(1000);
  })
})
