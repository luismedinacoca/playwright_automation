import { test, expect, describe } from "@playwright/test";

class RegisterPage {
  constructor(page) {
    this.page = page;
    this.selectors = {
      username: 'input[placeholder="Nombre"]',
      email: 'input[placeholder="Email"]',
      password: 'input[placeholder="Password"]',
      registrarse: 'button[type="submit"]',
      tengoCuentaLink: '[href="/login"]',
    };
  }

  getUsernameInput() {
    return this.page.locator(this.selectors.username);
  }

  getEmailInput() {
    return this.page.locator(this.selectors.email);
  }

  getPasswordInput() {
    return this.page.locator(this.selectors.password);
  }

  getBtnRegistrarse() {
    return this.page.locator(this.selectors.registrarse);
  }

  getTengoCuentaLink() {
    return this.page.locator(this.selectors.tengoCuentaLink);
  }

  // methods
  async enterUsername(username) {
    await this.getUsernameInput().fill(username);
  }

  async enterEmail(email) {
    await this.getEmailInput().fill(email);
  }

  async enterPassword(password) {
    await this.getPasswordInput().fill(password);
  }

  async clickRegistrarse() {
    await this.getBtnRegistrarse().click();
  }
}

export default RegisterPage;
