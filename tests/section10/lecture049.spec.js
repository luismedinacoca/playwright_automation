// import { test, expect, request } from "@playwright/test";
const { test, expect, request } = require("@playwright/test");

test.use({
  viewport: {
    width: 1512,
    height: 982,
  },
});

test.describe("Section 10 - API Testing with Playwright and Build mix of Web & API tests", () => {
  const loginPayload = {
    userEmail: "suspiros_mza@mailinator.com",
    userPassword: "Test!001",
  };

  const orderPayload = {
    orders: [
      {
        country: "Argentina",
        productOrderedId: "67a8dde5c0d3e6622a297cc8",
      },
      // {
      //   country: "United Kingdom",
      //   productOrderedId: "67a8df1ac0d3e6622a297ccb",
      // },
      {
        country: "Egypt",
        productOrderedId: "67a8df56c0d3e6622a297ccd",
      },
    ],
  };

  let token;
  let orderId;

  // 🔐 Getting TOKEN for Login
  test.beforeAll(async ({ request }) => {
    try {
      const loginResponse = await request.post(
        "https://rahulshettyacademy.com/api/ecom/auth/login",
        {
          data: loginPayload,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      expect(loginResponse.ok()).toBeTruthy();
      expect(loginResponse.status()).toBe(200);

      const loginResponseJson = await loginResponse.json();
      expect(loginResponseJson.token).toBeDefined();

      token = loginResponseJson.token;
      process.env.authToken = token;

      console.log("Token obtenido:", token);
    } catch (error) {
      console.error("Error durante el login:", error);
      throw error;
    }
  });

  test.beforeEach(async ({ page, request }) => {
    //...
    // 📌 Inject token in each test case:
    await page.addInitScript((value) => {
      window.localStorage.setItem("token", value);
    }, token);
  });

  test("Lecture 047 - Parsing API response & passing token to browser local storage with Playwright", async ({
    page,
  }) => {
    //Login API
    // await page.addInitScript((value) => {
    //   window.localStorage.setItem("token", value);
    // }, token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator('button[routerlink="/dashboard/myorders"]').click();
    await page.waitForTimeout(500);
    await page.getByRole("button", { name: "Sign Out" }).click();
    await page.waitForTimeout(500);
  });

  test("Lecture 049 - End to end validation with mix of API & Web concepts - Reduce test time", async ({
    page,
    request,
  }) => {
    // Login API
    // await page.addInitScript((value) => {
    //   window.localStorage.setItem("token", value);
    // }, token);

    await page.goto("https://rahulshettyacademy.com/client/");

    try {
      console.log("Valor de request:", request);
      console.log("Order Payload:", orderPayload);
      console.log("Headers:", {
        Authorization: token,
        "Content-Type": "application/json",
      });

      const orderResponse = await request.post(
        "https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
          data: orderPayload,
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("orderResponse.ok(): ", orderResponse.ok());
      expect(orderResponse.ok()).toBeTruthy();
      console.log("expect(orderResponse.ok()).toBeTruthy()");

      console.log("orderResponse.status()", orderResponse.status());
      expect(orderResponse.status()).toBe(201); // El status de creación de orden es 201
      console.log("expect(orderResponse.status()).toBe(201)");

      const orderResponseJson = await orderResponse.json();
      console.log("📌 orderResponseJson: ", orderResponseJson);
      expect(orderResponseJson.orders).toBeDefined(); // verify orderResponseJson is not "Undefined"

      const newOrders = orderResponseJson.orders; //array
      const orderIds = orderResponseJson.orders.length; //array length

      for (orderId of newOrders) {
        console.log("my new Order ID: ", orderId);
      }

      orderId = orderResponseJson.orders[0];
      const orderLink = await page.locator(
        'button[routerlink="/dashboard/myorders"]'
      );
      await orderLink.click();

      await page.locator("tbody").waitFor();
      const rows = page.locator("tbody .ng-star-inserted"); // remember, there are more than one elements so you need to select one element only.

      expect(await rows.nth(0).isVisible()).toBeTruthy(); //First element visible.
      console.log("expect(await rows.nth(0).isVisible()).toBeTruthy()");

      for (let i = 0; i < (await rows.count()); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        console.log("Order Id in each row: ", rowOrderId);

        if (orderId.includes(rowOrderId)) {
          await rows.nth(i).locator("button").first().click();
          break;
        }
      }
      await page.waitForTimeout(1500);

      await page.getByRole("button", { name: "Sign Out" }).click();
      await page.waitForTimeout(3500);
    } catch (error) {
      console.error("Error al crear la orden:", error);
      throw error;
    }
  });

  test("Verificar request fixture", async ({ page, request }) => {
    console.log("Request en test simple:", request);
    expect(request).toBeDefined();

    // await page.addInitScript((value) => {
    //   window.localStorage.setItem("token", value);
    // }, token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.getByRole("button", { name: "Sign Out" }).click();
    await page.waitForTimeout(2000);
  });
});
