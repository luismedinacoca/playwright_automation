import { test, expect, describe } from "@playwright/test";

test.describe("Test Cases", () => {
  const standardUser = "standard_user";
  const lockedOutUser = "locked_out_user";
  const problemUser = "problem_user";
  const performanceGlitchUser = "performance_glitch_user";
  const errorUser = "error_user";
  const visualUser = "visual_user";
  const passwordKey = "secret_sauce";

  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
  });

  test("standard-user login ", async ({ page }) => {
    const title = page.locator('[data-test="title"]');
    const burgerIcon = page.locator(".bm-burger-button");
    const logoutOption = page.locator("#logout_sidebar_link");

    await page.locator('[data-test="username"]').fill(standardUser);
    await page.locator('[data-test="password"]').fill(passwordKey);
    await page.waitForTimeout(1000);
    await page.locator('[data-test="login-button"]').click();

    //Assertion: Products page should be displayed
    await title.isVisible();
    expect(await title.textContent()).toBe("Products");

    await burgerIcon.isVisible();

    //Login out:
    await burgerIcon.click();
    await page.waitForTimeout(1000);

    await page.locator("#logout_sidebar_link").click();
    await page.waitForTimeout(1500);
  });

  test("Locked-out-user", async ({ page }) => {
    const errorLocator = page.locator('[data-test="error"]');

    await page.locator('[data-test="username"]').fill(lockedOutUser);
    await page.locator('[data-test="password"]').fill(passwordKey);
    await page.locator('[data-test="login-button"]').click();

    // Assertion: Error message displayed => .toContain()
    await errorLocator.isVisible();
    expect(await errorLocator.textContent()).toContain(
      "Sorry, this user has been locked out"
    );

    const xCounts = await page.locator("[data-icon='times-circle']").count();
    expect(xCounts).toBe(2);

    // Assertion: Error message displayed => .toBe()
    expect(await errorLocator.textContent()).toBe(
      "Epic sadface: Sorry, this user has been locked out."
    );

    await page.waitForTimeout(1500);
  });

  test("Problem-user", async ({ page }) => {
    const title = page.locator('[data-test="title"]');
    const burgerIcon = page.locator(".bm-burger-button");
    const srcImg = page.locator(".inventory_item_img img");
    const imgSrcValue = "/static/media/sl-404.168b1cce.jpg";

    await page.locator('[data-test="username"]').fill(problemUser);
    await page.locator('[data-test="password"]').fill(passwordKey);
    await page.locator('[data-test="login-button"]').click();

    //Assertion: Products page should be displayed
    await title.isVisible();
    expect(await title.textContent()).toBe("Products");

    await burgerIcon.isVisible();

    const srcCount = await srcImg.count();

    for (let i = 0; i < srcCount; i++) {
      const srcValue = await srcImg.nth(i).getAttribute("src");
      expect(srcValue).toBe(imgSrcValue);
      console.log(`src value in nth(${i}): ${srcValue}`);
    }

    ///Login out:
    await burgerIcon.click();
    await page.waitForTimeout(1000);

    await page.locator("#logout_sidebar_link").click();
    await page.waitForTimeout(1500);
  });

  test("Performance-glitch-user", async ({ page }) => {
    const title = page.locator('[data-test="title"]');
    const burgerIcon = page.locator(".bm-burger-button");

    await page.locator('[data-test="username"]').fill(performanceGlitchUser);
    await page.locator('[data-test="password"]').fill(passwordKey);
    await page.locator('[data-test="login-button"]').click();

    //await page.waitForTimeout(5000);

    //Assertion: Products page should be displayed
    await title.isVisible();
    expect(await title.textContent()).toBe("Products");

    await burgerIcon.isVisible();

    //Login out:
    await burgerIcon.click();
    await page.waitForTimeout(1000);

    await page.locator("#logout_sidebar_link").click();
    await page.waitForTimeout(1500);
  });

  test("Username entered only", async ({ page }) => {
    const usernameField = page.locator('[data-test="username"]');
    const loginBtn = page.locator('[data-test="login-button"]');
    const errorPwdMissing = page.locator('[data-test="error-button"]');
    const errorPwdLocator = page.locator('[data-test="error"]');
    const errorPwdMessage = "Epic sadface: Password is required";

    await usernameField.fill(standardUser);
    await loginBtn.click();

    await errorPwdMissing.isVisible();
    expect(await errorPwdLocator.textContent()).toBe(errorPwdMessage);

    await page.waitForTimeout(1500);
  });

  test("Password entered only", async ({ page }) => {
    const passwordField = page.locator('[data-test="password"]');
    const loginBtn = page.locator('[data-test="login-button"]');
    const errorUsrMissing = page.locator('[data-test="error-button"]');
    const errorUsrLocator = page.locator('[data-test="error"]');
    const password = "secret_sauce";
    const errorPwdMessage = "Epic sadface: Username is required";

    await passwordField.fill(password);
    await loginBtn.click();

    await errorUsrMissing.isVisible();
    expect(await errorUsrLocator.textContent()).toBe(errorPwdMessage);

    await page.waitForTimeout(1500);
  });

  test("No username neither Password entered", async ({ page }) => {
    const loginBtn = page.locator('[data-test="login-button"]');
    const errorUsrMissing = page.locator('[data-test="error-button"]');
    const errorUsrLocator = page.locator('[data-test="error"]');
    const password = "secret_sauce";
    const errorPwdMessage = "Epic sadface: Username is required";

    await page.waitForTimeout(1500);
    await loginBtn.click();

    await errorUsrMissing.isVisible();
    expect(await errorUsrLocator.textContent()).toBe(errorPwdMessage);

    await page.waitForTimeout(1500);
  });
});
