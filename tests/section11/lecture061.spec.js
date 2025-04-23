const { test, expect, request } = require("@playwright/test");
import { APIutils } from "../section10/utils/APIutils.js";
import { orderPayload, loginPayload } from "../section10/data/payloads.js";

test.use({
  viewport: {
    width: 1512,
    height: 960,
  },
});

test.describe("Lecture 061 - How to Intecept Network request calls", () => {
  let apiUtils;
  const fakePayloadOrders = { data: [], message: "No Orders" };

  test.beforeAll(async ({ request }) => {
    apiUtils = new APIutils();
    await apiUtils.getToken(request, loginPayload); // Obtener el token una vez
  });

  test.beforeEach(async ({ page }) => {
    await apiUtils.injectTokenIntoLocalStorage(page); // Inyectar el token antes de cada test
  });

  test("Deleting all existent orders", async ({ request, page }) => {
    await page.goto("https://rahulshettyacademy.com/client/");

    await page.getByRole("button", { name: "ORDERS" }).click();
    await page.waitForSelector("tbody tr");
    await page.waitForLoadState("networkidle");

    //Inteception
    await page.route(
      "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
      (route) =>
        route.continue({
          url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=67ebf1effc76541aad1b13f9",
        })
    );

    await page.locator("button:has-text('View')").first().click();
    await page.waitForSelector(".blink_me");

    //Verify blinking meesage:
    const blinkMessage = page.locator(".blink_me");
    expect(await blinkMessage.isVisible()).toBeTruthy();
    expect(await blinkMessage.textContent()).toBe(
      "You are not authorize to view this order"
    );

    //Logging out
    await page.getByRole("button", { name: "Sign Out" }).click();
  });
});
