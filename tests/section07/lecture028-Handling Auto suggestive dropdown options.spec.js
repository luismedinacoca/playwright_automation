import { test, expect, describe } from "@playwright/test";

test.describe("Test Cases - Swag - Sauce Demo", () => {
  test("test", async ({ page }) => {
    //await page.goto("https://www.tiendaqa.centyc.com.ar");
    //await page.waitForTimeout(2500)

    const products = page.locator(".inventory_item");
    const firstSelectedProduct = "Sauce Labs Bolt T-Shirt";
    const secondSelectedProduct = "Sauce Labs Onesie";

    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    await page
      .locator("#inventory_container:nth-child(1) .inventory_item:nth-child(1)")
      .waitFor();

    const titles = await page
      .locator(".inventory_item_name ")
      .allTextContents();
    console.log(`Titles are: ${titles}`);

    console.log("Array.isArray(titles): ", Array.isArray(titles));

    /*
    console.log("products.count()", products.count());
    outcome:
    ========
  
    products.count() Promise {
      <pending>,
      [Symbol(async_id_symbol)]: 9862,
      [Symbol(trigger_async_id_symbol)]: 8874,
      [Symbol(kResourceStore)]: undefined
    }
    */

    console.log("products.count()", await products.count()); //products.count() 6

    const count = await products.count();
    for (let i = 0; i < count; i++) {
      const productName = await products
        .nth(i)
        .locator(".inventory_item_name")
        .textContent();

      //add to cart:
      if (
        productName === firstSelectedProduct ||
        productName === secondSelectedProduct
      ) {
        //await products.nth(i).locator(".btn.btn_primary.btn_small.btn_inventory ").click();
        await products.nth(i).locator("text=Add to cart").click();
        const removedText = await products
          .nth(i)
          .locator(".btn.btn_secondary.btn_small.btn_inventory ")
          .textContent();
        expect(removedText).toBe("Remove");
        //break;
        //await page.waitForTimeout(1500);
      }
    }

    //Click on Cart icon:
    await page.locator(".shopping_cart_link").click();
    await page.waitForTimeout(1000);

    // Assertion - In Your cart page
    await page.locator('[data-test="title"]').isVisible();
    const textYourCart = await page
      .locator('[data-test="title"]')
      .textContent();
    console.log(`Your cart title: ${textYourCart}`);
    expect(
      await page.locator("text=Sauce Labs Bolt T-Shirt").nth(0).isVisible()
    ).not.toBeFalsy();

    const firstText = await page
      .locator('[data-test="inventory-item-name"]')
      .nth(0)
      .textContent();
    console.log(`First selected product: ${firstText}`);
    await page.waitForTimeout(1000);

    //assertion - checkout button is visible:
    await page.locator('[data-test="checkout"]').isVisible();
    await page.locator('[data-test="checkout"]').click();
    await page.waitForTimeout(2000);

    //assertion - checkout your information page
    await page.locator('[data-test="title"]').isVisible();
    const checkoutYourInfo = await page
      .locator('[data-test="title"]')
      .textContent();
    expect(checkoutYourInfo).toBe("Checkout: Your Information");
    await page.locator('[data-test="firstName"]').isVisible();
    await page.locator('[data-test="lastName"]').isVisible();
    await page.locator('[data-test="postalCode"]').isVisible();

    //Fill the form:
    await page
      .locator('[data-test="firstName"]')
      .pressSequentially("Jorge", { delay: 200 });
    await page.waitForTimeout(1000);
    await page
      .locator('[data-test="lastName"]')
      .pressSequentially("Cortazar", { delay: 100 });
    await page.waitForTimeout(1000);
    await page
      .locator('[data-test="postalCode"]')
      .pressSequentially("5501", { delay: 100 });
    await page.waitForTimeout(1000);
    await page.locator('[data-test="continue"]').click();
    await page.waitForTimeout(2000);

    //Assertion - Checkout - Overview page
    await page.locator('[data-test="title"]').isVisible();
    const checkoutOverViewTitle = await page
      .locator('[data-test="title"]')
      .textContent();
    expect(checkoutOverViewTitle).toBe("Checkout: Overview");

    await page.locator('[data-test="payment-info-label"]').isVisible();
    await page.locator('[data-test="shipping-info-label"]').isVisible();
    await page.locator('[data-test="total-info-label"]').isVisible();
    await page.locator('[data-test="total-label"]').isVisible();
    await page.locator('[data-test="finish"]').isVisible();
    const sauceCard = await page
      .locator('[data-test="payment-info-value"]')
      .textContent();
    expect(sauceCard).toContain("SauceCard #");

    await page.locator('[data-test="finish"]').click();

    //Assertion - Checkout: Complete page
    await page.locator('[data-test="title"]').isVisible();
    await page.locator('[data-test="pony-express"]').isVisible();
    await page.locator('[data-test="complete-header"]').isVisible();
    await page.locator('[data-test="complete-text"]').isVisible();
    await page.locator('[data-test="back-to-products"]').isVisible();

    const checkoutcompletedTitle = await page
      .locator('[data-test="title"]')
      .textContent();
    expect(checkoutcompletedTitle).toBe("Checkout: Complete!");

    const thankHeader = await page
      .locator('[data-test="complete-header"]')
      .textContent();
    expect(thankHeader).toBe("Thank you for your order!");

    const thankText = await page
      .locator('[data-test="complete-text"]')
      .textContent();
    expect(thankText).toBe(
      "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    );

    const backBtnText = await page
      .locator('[data-test="back-to-products"]')
      .textContent();
    expect(backBtnText).toBe("Back Home");

    //await page.locator('[data-test="back-to-products"]').click();
    await page
      .locator('[data-test="back-to-products"]:has-text("Back Home")')
      .click();

    //Home page:
    await page.locator("#menu_button_container").isVisible();
    await page.locator(".bm-burger-button").click();

    await page.locator("#logout_sidebar_link").isVisible();
    //await page.locator("#logout_sidebar_link").click();
    //await page.locator("[id='logout_sidebar_link']:has-text('Logout')").click();
    await page.locator("a:has-text('Logout')").click();
  });
});

test.describe("e2e Testing - Rahul Shetty Academy Client page", () => {
  test("Test Rahul Shetty page", async ({ page }) => {
    const userName = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginBtn = page.locator("#login");
    const adidas = "ADIDAS ORIGINAL";
    const products = page.locator(".card-body");
    const userEmail = "suspiros_mza@mailinator.com";
    const userPwd = "Test!001";

    await page.goto("https://rahulshettyacademy.com/client/"); //get the tile - assertion:

    await userName.fill(userEmail);
    await password.fill(userPwd);
    await loginBtn.click();

    await page.waitForLoadState("networkidle");

    const titles = await page.locator(".card-body b").allTextContents();
    //console.log(titles);

    // ************* Home page ************* \\

    //ZARA COAT 3 product might be selected:
    for (let i = 0; i < titles.length; i++) {
      const product = await products.nth(i).locator("b").textContent();
      if ((await products.nth(i).locator("b").textContent()) === adidas) {
        // add product to cart
        await products.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
    // ************* Checkout page ************* \\

    //click on cart icon in header:
    await page.locator('[routerlink*="cart"]').click();

    //console.log("Checkout Page");

    //await page.waitForTimeout(500);
    await page.locator(".cart li").first().waitFor();
    const AdidasBool = await page
      .locator('h3:has-text("ADIDAS ORIGINAL")')
      .isVisible();
    expect(AdidasBool).toBeTruthy();

    //Click on "Checkout" button:
    await page.locator("text=checkout").click();
    //await page.waitForTimeout(3500);

    // ************* Payment page ************* \\

    const cardInfoFields = page.locator(".field input");

    await cardInfoFields.nth(0).fill("4000 0000 0000 1000");
    await cardInfoFields.nth(1).fill("100");
    await cardInfoFields.nth(2).fill("Pyramid Glass");
    await cardInfoFields.nth(3).fill("rahulshettyacademy");
    await page.locator("button[type='submit']").click();

    await page.getByText("* Coupon Applied").waitFor();
    const coupon = await page.getByText("* Coupon Applied").isVisible();
    expect(coupon).toBeTruthy();

    //await page.locator('[placeholder="Select Country"]').type('United', {delay: 500});
    await page
      .locator('[placeholder="Select Country"]')
      .pressSequentially("United");
    //await page.getByRole('button', { name: " United Kingdom" }).click();

    const dropdown = page.locator(".ta-results");
    const countryName = "United Kingdom";

    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; i++) {
      const text = await dropdown.locator("button span").nth(i).textContent();
      if (text.includes(countryName)) {
        await dropdown.locator("button").nth(i).click();
        break;
      }
    }

    const email = await page.locator(".user__name label").textContent();
    expect(email).toBe(userEmail);
    //console.log("User email is displayed in shipping information section!")

    await page.getByText("place order").click();

    // ************* Thank You page ************* \\

    const titleThankyouPage = await page.locator(".hero-primary").textContent();
    expect(titleThankyouPage).toContain("Thankyou for the order");

    await expect(page.locator(".hero-primary")).toHaveText(
      " Thankyou for the order. "
    );

    const orderNumber = await page
      .locator(".em-spacer-1 .ng-star-inserted")
      .textContent();
    //orderNumber = orderNumber.replace(' | ', '').replace(' | ', '')
    //console.log(`Order Number: ${orderNumber}`);
    //await page.waitForTimeout(2000);

    // await page.getByRole("button", {name: "   ORDERS"}).click();
    await page.locator('button[routerlink*="myorders"]').click();

    // ************ ORDER Page ************ \\

    await page.locator("tbody").waitFor();

    await page.locator("h1").isVisible();
    const orderPageTitle = await page.locator("h1").textContent();
    expect(orderPageTitle).toBe("Your Orders");

    await page.locator(".row button").first().isVisible();
    const goBackToShopBtn = await page
      .locator(".row button")
      .first()
      .textContent();
    expect(goBackToShopBtn).toBe("Go Back to Shop");

    const rows = await page.locator("tbody tr");
    const rowsCount = await rows.count();
    // console.log(">>> rowsCount: ", rowsCount);

    let rowOrderId = "";

    for (let i = 0; i < rowsCount; i++) {
      rowOrderId = await rows.nth(i).locator("th").textContent();
      // console.log(rowOrderId)
      // console.log(orderNumber)
      if (orderNumber.includes(rowOrderId)) {
        console.log("Orders are equals");
        await rows.nth(i).locator("button.btn-primary").click();
        break;
      }
    }

    // ************** ORDER SUMMARY PAGE ************** \\
    expect(await page.locator(".email-title").isVisible());
    const orderSummaryTitle = await page.locator(".email-title").textContent();
    expect(orderSummaryTitle).toBe(" order summary ");

    await page.locator('[class*="col-text"]').isVisible();
    const orderSummaryPage = await page
      .locator('[class*="col-text"]')
      .textContent();
    // console.log("orderSummaryPage: ", orderSummaryPage);
    expect(orderSummaryPage).toContain(rowOrderId);
    console.log(`📌 👉🏽 ${orderSummaryPage} contains ${rowOrderId}`);

  });
});
