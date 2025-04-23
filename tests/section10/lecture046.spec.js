// import { test, expect, request } from "@playwright/test";
const { test, expect, request } = require("@playwright/test");

test.use({
  viewport: {
    width: 1512,
    height: 982,
  },
});

//Lecture 046
test.describe("Section 10 - API Testing with Playwright and Build mix of Web & API tests", () => {
  const loginPayload = {
    userEmail: "suspiros_mza@mailinator.com",
    userPassword: "Test!001",
  };

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
      console.log("expect(loginResponse.ok()).toBeTruthy()");
      console.log("loginResponse.ok(): ", loginResponse.ok());
      console.log("");

      expect(loginResponse.status()).toBe(200);
      console.log("expect(loginResponse.status()).toBe(200)");
      console.log("loginResponse.status(): ", loginResponse.status());
      console.log("");

      const loginResponseJson = await loginResponse.json();
      console.log("await loginResponse.json(): ", loginResponseJson);
      console.log("");

      expect(loginResponseJson.token).toBeDefined();
      console.log("expect(loginResponseJson.token).toBeDefined()");
      console.log("const loginResponseJson = await loginResponse.json()");
      console.log("loginResponseJson.token", loginResponseJson.token);
      console.log("");

      const token = loginResponseJson.token;
      console.log("const token = loginResponseJson.token");
      process.env.authToken = token;
      console.log("");

      console.log("Token obtenido:", token);
    } catch (error) {
      console.error("Error durante el login:", error);
      throw error;
    }
  });

  test.beforeEach(() => {
    //...
  });

  test("Lecture 046 - Playwright request method to make API calls and grab response - Example", async ({
    page,
  }) => {});
});
