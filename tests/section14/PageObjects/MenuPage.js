class MenuPage {
  constructor(page) {
    this.page = page;
    this.logo = 'label[routerlink="/dashboard"]';
    this.home = 'button[routerlink="/dashboard/"]';
    this.orders = 'button[routerlink*="myorders"]';
    this.cart = 'button[routerlink*="cart"]';
    this.signOut = page
      .getByRole("listitem")
      .getByRole("button", { name: "Sign Out" });
  }

  async clickLogoMenu() {
    await this.page.click(this.logo);
  }

  async clickHomeMenu() {
    await this.page.click(this.home);
  }
  async clickOrdersMenu() {
    await this.page.click(this.orders);
  }
  async clickCartMenu() {
    await this.page.click(this.cart);
  }
  async clickSignOutMenu() {
    await this.signOut.click();
  }

  async waitTwoSeconds() {
    await this.page.waitForTimeout(2000);
  }
}

export default MenuPage;
