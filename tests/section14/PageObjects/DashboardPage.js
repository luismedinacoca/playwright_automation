class DashboardPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator(".card-body");
    this.productsText = page.locator(".card-body b");
    this.cart = page.locator('button[routerlink*="cart"]');
    this.orders = page.locator('[routerlink*="myorders"]');
    this.home = page.getByRole("button", { name: " HOME " });
  }

  async loadingDashboard() {
    await this.page.waitForSelector(".container .row");
    expect(await this.products.first().isVisible()).toBe(true);
    console.log("(3) loading dashobard page");
  }
  async addProduct(productName) {
    // page
    // .locator(".card-body")
    await this.page.waitForTimeout(3000);
    console.log(">>> clicking a product");
    const productCard = await this.products.filter({
      hasText: new RegExp(productName, "i"),
    });

    const addToCartButton = productCard.getByRole("button", {
      name: /Add To Cart/i, // Búsqueda insensible a mayúsculas/minúsculas para el texto del botón
    });

    await addToCartButton.waitFor({ state: "visible" });
    await addToCartButton.waitFor({ state: "enabled" });
    await addToCartButton.click({ force: true });

    console.log(">>> adding a product");
    await this.page.waitForTimeout(2000);
  }

  async navigateToCart() {
    await this.cart.click();
    console.log("Going to cart page");
  }
}

export default DashboardPage;
