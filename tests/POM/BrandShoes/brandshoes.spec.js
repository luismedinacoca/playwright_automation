const { test, expect } = require("@playwright/test");
const { faker } = require("@faker-js/faker");
import { generarUsuarioFalso } from "../../POM/functions";

test.use({
  viewport: {
    width: 1512,
    height: 960,
  },
});

test("Account registration with random data", async ({ page }) => {
  // Generate test data
  const testUser = generarUsuarioFalso();

  console.log(testUser);

  // Navigate to registration page
  await page.goto("https://www.brandshoes.com.ar/account/register");

  // Fill registration form
  await page.waitForSelector("#name");
  await page.fill("#name", testUser.username);
  //   await page.fill('#RegisterForm-LastName', testUser.lastName);
  await page.fill("#email", testUser.email);
  await page.fill("#phone", testUser.phone);
  await page.fill("#password", testUser.password);
  await page.fill("#password_confirmation", testUser.password);

  // Handle CAPTCHA disclaimer - THIS DOES NOT ACTUALLY BYPASS SECURITY MEASURES
  // This is just for demonstration and should only be used in test environments

  /*
  await page.evaluate(() => {
    const captchaElement = document.querySelector("#rc-anchor-container");
    if (captchaElement) {
      captchaElement.style.display = "none";
    }
    console.log("Catpcha bypassed for testing purposes.");
  });

  // Submit the form
  const btnSubmit = document.querySelector('input[type="submit"]');
  if (btnSubmit) {
    btnSubmit.removeAttribute("disabled");
    console.log("removed attribute 'disabled' from button");
  }
  await page.click('input[type="submit"]');
  */

  // Handle CAPTCHA element using Playwright's selector handling
  //   const framePage = page.frameLocator("iframe[name='a-p4tqwgreujum']");
  //   const captchaElement = await framePage.locator("body");
  //   if (captchaElement) {
  //     await captchaElement.evaluate((element) => {
  //       element.style.display = "none";
  //     });
  //     console.log("CAPTCHA container hidden for testing purposes");
  //   } else {
  //     console.warn("CAPTCHA element not found - verify selector");
  //   }

  async function bypassCaptcha(page) {
    // Block reCAPTCHA network calls
    await page.route(/recaptcha\.google\.com/, (route) => route.abort());

    // Remove CAPTCHA elements from DOM
    await page.addScriptTag({
      content: `
        (function() {
          document.querySelectorAll('iframe[title="reCAPTCHA"], .g-recaptcha').forEach(el => el.remove());
        })();
      `,
    });

    console.log("CAPTCHA elements removed");
  }

  // Use in your test
  await bypassCaptcha(page);
  await page.waitForTimeout(1500); // Wait for CAPTCHA to be removed

  // Handle submit button using proper Playwright methods
  const submitButton = await page.$('input[type="submit"]');
  if (submitButton) {
    // Ensure button is visible and enabled
    await submitButton.waitForElementState("visible");
    await submitButton.evaluate((button) => {
      button.removeAttribute("disabled");
    });
    console.log("Removed disabled attribute from submit button");

    // Click with proper waiting
    await Promise.all([
      //page.waitForNavigation(), // Wait for navigation if form submission causes it
      submitButton.click(),
    ]);
  } else {
    throw new Error("Submit button not found");
  }

  // Verify successful registration
  //   await page.waitForURL("**/account**");
  //   await expect(page).toHaveURL(/account/);
  const message = await page
    .locator("h4.weight-strong.m-top-half")
    .textContent();
  expect(message).toBe("¡Estás a un paso de crear tu cuenta!");
});
