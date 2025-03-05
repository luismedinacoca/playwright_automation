import { test, expect, describe } from "@playwright/test";

test.describe.skip("Test Cases", () => {
  test.skip("test", async ({ page }) => {
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
    await page.locator('[data-test="firstName"]').fill("Jorge");
    await page.locator('[data-test="lastName"]').fill("Cortazar");
    await page.locator('[data-test="postalCode"]').fill("5501");
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
