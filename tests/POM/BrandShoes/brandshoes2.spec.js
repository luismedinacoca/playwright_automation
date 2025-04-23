const { test, expect } = require("@playwright/test");
const { faker } = require("@faker-js/faker");

// test.use({
  // viewport: {
  //   width: 1512,
  //   height: 972,
  // },
// });

test("Account registration with CAPTCHA bypass", async ({ page }) => {
  // 1. Block all reCAPTCHA-related network requests
  await page.route(/google\.com\/recaptcha/, (route) => route.abort());
  await page.route(/gstatic\.com\/recaptcha/, (route) => route.abort());

  // 2. Remove CAPTCHA elements before they load
  await page.addInitScript(() => {
    // Remove CAPTCHA containers
    document.addEventListener("DOMContentLoaded", () => {
      const removeCaptchaElements = () => {
        const captchas = document.querySelectorAll(
          '.g-recaptcha, iframe[title*="CAPTCHA"]'
        );
        captchas.forEach((el) => el.remove());
      };

      // Run immediately and set up mutation observer
      removeCaptchaElements();
      const observer = new MutationObserver(removeCaptchaElements);
      observer.observe(document.body, { subtree: true, childList: true });
    });
  });

  // Generate test data

  const testUser = {
    username: faker.person.firstName() + " " + faker.person.lastName(),
    email:
      faker.person.firstName().toLocaleLowerCase() +
      faker.person.lastName().toLocaleLowerCase() +
      "@mailinator.com",
    phone: faker.phone.number("##########"),
    password: faker.internet.password({ length: 12 }),
  };

  // Navigate to registration page
  await page.goto("https://www.brandshoes.com.ar/account/register");

  // 3. Final cleanup after page load
  await page.evaluate(() => {
    document
      .querySelectorAll('iframe[title*="CAPTCHA"], .g-recaptcha')
      .forEach((el) => el.remove());
  });

  await page.waitForSelector("#name");
  await page.fill("#name", testUser.username);
  await page.fill("#email", testUser.email);
  await page.fill("#phone", testUser.phone);
  await page.fill("#password", testUser.password);
  await page.fill("#password_confirmation", testUser.password);

  console.log(testUser.username);
  console.log(testUser.email);
  console.log(testUser.phone);
  console.log(testUser.password);

  // Target by data-sitekey attribute
  await page.evaluate(() => {
    const captchas = document.querySelectorAll("[data-sitekey]");
    captchas.forEach((el) => el.remove());
  });

  //4. Force enable submit button
  await page.$eval(
    'input[class="js-recaptcha-button btn btn-primary full-width-xs pull-right"]',
    (button) => {
      button.disabled = false;
    }
  );

  // 5. Submit with navigation wait
  await Promise.all([
    //page.waitForURL("**/account**"),
    page.click(
      'input[class="js-recaptcha-button btn btn-primary full-width-xs pull-right"]'
    ),
  ]);

  // Verify success
  await expect(page).toHaveURL(/account/);

  const message = await page
    .locator("h4.weight-strong.m-top-half")
    .textContent();
  expect(message).toBe("¡Estás a un paso de crear tu cuenta!");
});
