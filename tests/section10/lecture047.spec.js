// import { test, expect, request } from "@playwright/test";
const { test, expect, request } = require("@playwright/test");

test.describe("Section 10 - API Testing with Playwright and Build mix of Web & API tests", () => {
  const loginPayload = {
    userEmail: "suspiros_mza@mailinator.com",
    userPassword: "Test!001",
  };

  let token;

  test.beforeAll(async ({ request }) => {
    try {
      const loginResponse = await request.post(
        "https://rahulshettyacademy.com/api/ecom/auth/login",
        {
          data: loginPayload,
          headers: {
            "Content-Type": "application/json", // Asegura que el tipo de contenido es correcto
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

  test.beforeEach(async () => {
    //...
    //Inject token in each test case:
  });

  test("Lecture 047 - Parsing API response & passing token to browser local storage with Playwright", async ({
    page,
  }) => {
    await page.addInitScript((value) => {
      window.localStorage.setItem("token", value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.waitForTimeout(5000);
  });
});
