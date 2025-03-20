const { test, expect, request } = require("@playwright/test");
import { APIutils } from "../section10/utils/APIutils.js";
import { orderPayload, loginPayload } from "../section10/data/payloads.js";

test.describe("API Tests", () => {
  let apiUtils;

  test.beforeAll(async ({ request }) => {
    apiUtils = new APIutils();
    await apiUtils.getToken(request, loginPayload); // Obtener el token una vez
  });

  test.beforeEach(async ({ page }) => {
    await apiUtils.injectTokenIntoLocalStorage(page); // Inyectar el token antes de cada test
  });

  test("Log Out from ecommerce Test", async ({ request, page }) => {
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.waitForTimeout(1500);

    await page.getByRole("button", { name: "ORDERS" }).click();
    await page.waitForTimeout(2500);

    await page.getByRole("button", { name: "Sign Out" }).click();
    await page.waitForTimeout(1500);
  });

  test("Create Order Test", async ({ request, page }) => {
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.waitForTimeout(1500);

    const orderId = await apiUtils.createOrder(request, orderPayload);
    expect(orderId).toBeDefined();

    await page.getByRole("button", { name: "ORDERS" }).click();
    await page.waitForTimeout(2500);

    await page.getByRole("button", { name: "Sign Out" }).click();
    await page.waitForTimeout(1500);
  });
});
