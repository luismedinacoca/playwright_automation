const { request, expect } = require("@playwright/test");

class APIutils {
  constructor() {
    this.token = null; // Almacenar el token aquí
  }

  async getToken(request, loginPayload) {
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

      this.token = await loginResponseJson.token; // Almacenar el token en la clase
      process.env.authToken = this.token;

      return this.token;
    } catch (error) {
      console.error("Error getting token:", error);
      throw error;
    }
  }

  async injectTokenIntoLocalStorage(page) {
    if (this.token) {
      await page.addInitScript((value) => {
        window.localStorage.setItem("token", value);
      }, this.token);
    } else {
      console.warn("Token is not available. Call getToken() first.");
    }
  }

  async createOrder(request, orderPayload) {
    try {
      if (!this.token) {
        throw new Error("Token is not available. Call getToken() first.");
      }

      const orderResponse = await request.post(
        "https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
          data: orderPayload,
          headers: {
            Authorization: this.token, // Usar el token almacenado
            "Content-Type": "application/json",
          },
        }
      );

      const orderResponseJson = await orderResponse.json();
      console.log("🧐 orderResponseJson: ", orderResponseJson);
      expect(orderResponseJson.orders).toBeDefined();

      const newOrders = orderResponseJson.orders;
      for (const orderId of newOrders) {
        console.log("my new Order ID: ", orderId);
      }
      const orderId = orderResponseJson.orders[0];

      return orderId;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  }
}

export { APIutils };
