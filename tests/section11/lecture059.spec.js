const { test, expect, request } = require("@playwright/test");
import { APIutils } from "../section10/utils/APIutils.js";
import { orderPayload, loginPayload } from "../section10/data/payloads.js";

test.use({
  viewport: {
    width: 1922,
    height: 974,
  },
});

test.describe("API Tests", () => {
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

    const deleteBtnAmount = await page
      .locator(".ng-star-inserted .btn.btn-danger")
      .count();

    const totalAmount = await page
      .locator(".ng-star-inserted .btn.btn-danger")
      .count();

    console.log("Amount of button: ", deleteBtnAmount);
    for (let i = 0; i < deleteBtnAmount; i++) {
      await page.locator(".ng-star-inserted .btn.btn-danger").first().click();
      await page.waitForSelector("tbody tr");
      const rowNumber = await page.locator("tbody tr").count();
      const btnAmount = await page
        .locator(".ng-star-inserted .btn.btn-danger")
        .count();
      expect(rowNumber).toBe(btnAmount);
      await page.waitForTimeout(1000);
    }

    //Verify all products were deleted and checking new title no orders appears
    const noOrdersTitle = await page
      .locator(".mt-4.ng-star-inserted")
      .textContent();
    console.log(noOrdersTitle);
    expect(noOrdersTitle).toContain("No Orders to show at this time.");

    const noOrderTitleVisible = await page
      .locator(".mt-4.ng-star-inserted")
      .isVisible();
    expect(noOrderTitleVisible).toBeTruthy();

    //Logging out
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

  test("Intercepting API response to No Orders", async ({ request, page }) => {
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.waitForTimeout(1500);

    await page.route(
      "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/67d08536c019fb1ad621a776",
      async (route) => {
        // current response:
        const response = await page.request.fetch(route.request());

        let body = JSON.stringify(fakePayloadOrders);
        await route.fulfill({
          // status: 200, // Código de estado HTTP (200 OK)
          // contentType: "application/json",
          response,
          body,
        }); //intercepting the response => API response => {playwright fake response} => browser => render data on frontend
      }
    );

    await page.getByRole("button", { name: "ORDERS" }).click();
    await page.waitForResponse(
      "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/67d08536c019fb1ad621a776"
    );
    await page.waitForLoadState("networkidle");

    const noOrdersTitle = await page
      .locator(".mt-4.ng-star-inserted")
      .textContent();
    console.log(noOrdersTitle);
    expect(noOrdersTitle).toContain("No Orders to show at this time.");

    const noOrderTitleVisible = await page
      .locator(".mt-4.ng-star-inserted")
      .isVisible();
    expect(noOrderTitleVisible).toBeTruthy();

    await page.getByRole("button", { name: "Sign Out" }).click();
    await page.waitForTimeout(1500);
  });
});
