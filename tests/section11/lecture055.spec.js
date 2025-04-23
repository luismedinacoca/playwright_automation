// import { test, expect, request } from "@playwright/test";
const { test, expect, request } = require("@playwright/test");

test.use({
  viewport: {
    width: 1512,
    height: 982,
  },
});

let webContext;
let page;

test.describe("Section 11 - Session Storage & Intercepting network request/response", () => {
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client/");

    await page.locator("#userEmail").fill("suspiros_mza@mailinator.com");
    await page.locator("#userPassword").fill("Test!001");
    await page.locator("#login").click();

    await page.waitForLoadState("networkidle");
    await context.storageState({ path: "utils/state.json" });

    webContext = await browser.newContext({ storageState: "utils/state.json" });
  });

  test.beforeEach(async () => {
    page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
  });

  test("Lecture 055 - Go to Order page", async () => {
    const titles = await page.locator(".card-body b").allTextContents();
    await page.waitForLoadState("networkidle");
    console.log("Titles: ", titles);

    await page.getByRole("button", { name: "ORDERS" }).click();
    await expect(page).toHaveURL(/myorders/);
  });

  test("Lecture 055 - Go to Cart page then sign-out", async () => {
    const titles = await page.locator(".card-body b").allTextContents();
    await page.waitForLoadState("networkidle");
    console.log("Titles: ", titles);

    await Promise.all([
      page.getByRole("button", { name: "   Cart " }).click(),
      page.waitForURL("https://rahulshettyacademy.com/client/dashboard/cart"),
    ]);
    await page.getByRole("button", { name: "Sign Out" }).click();
  });
});
