/*
import { Page, Browser, chromium, expect } from "@playwright/test";
import { Given, When, Then } from "@cucumber/cucumber";

let browser: Browser;
let page: Page;

Given("A web browser is at the saucelabs login page", async function () {
  // Add this to the launch options to run the tests in headless mode: {headless: false}
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  await page.goto("https://www.saucedemo.com/");
});

When(
  "A user enters the username {string}, the password {string}, and clicks on the login button",
  async function (username: string, password: string) {
    await page.fill('input[data-test="username"]', username);
    await page.fill('input[data-test="password"]', password);
    await page.click('input[data-test="login-button"]');
  }
);

Then("the url will contains the inventory subdirectory.", async function () {
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  await browser.close();
});

*/

// step-definitions/login.ts
import { Page, Browser, chromium, expect } from "@playwright/test";
import { Given, When, Then } from "@cucumber/cucumber";
import { LoginPage } from "../../../page-objects/LoginPage"; // Importa la clase LoginPage

let browser: Browser;
let page: Page;
let loginPage: LoginPage; // Instancia de LoginPage

Given("A web browser is at the saucelabs login page", async function () {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
  loginPage = new LoginPage(page); // Inicializa la instancia de LoginPage con la página
  await loginPage.navigateToLoginPage();
});

When(
  "A user enters the username {string}, the password {string}, and clicks on the login button",
  async function (username: string, password: string) {
    await loginPage.enterUsername(username);
    await loginPage.enterPassword(password);
    await loginPage.clickLoginButton();
  }
);

Then("the url will contains the inventory subdirectory.", async function () {
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  await page.waitForTimeout(2000);
  await browser.close();
});
