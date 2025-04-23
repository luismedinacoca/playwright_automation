import { test, expect, describe } from "@playwright/test";

class HomePage {
  constructor(page) {
    this.page = page;
    this.homeSelectors = {
      headers: {
        home: '.dukztG  a[href="/"]',
        user_name: ".sc-gkJlnC.bFbbhP",
        cart: ".sc-gUAEMC.ffclIZ svg:nth-child(1)",
        userIcon: ".jKyGmi svg",
        nucbaZappiLogo: 'a[href="/"]',
      },
      hero: {
        title: "h1.title",
        searchInput: '[placeholder="Ej. Pizzas a la piedra"]',
        buscarBtn: page.getByRole("button", { name: "BUSCAR" }),
      },
      recomendado: {
        title: ".sc-kDDrLX.iQaYCo>h2",
      },
      categorias: {},
      productos: {},
    };
  }

  //Menu
  getBtnHome() {
    return this.page.locator(this.homeSelectors.headers.home);
  }

  getUsernameLink() {
    return this.page.locator(this.homeSelectors.headers.user_name);
  }

  getCartLink() {
    return this.page.locator(this.homeSelectors.headers.cart);
  }

  getUserIcon() {
    return this.page.locator(this.homeSelectors.headers.userIcon);
  }

  getNucbaZappiLogo() {
    return this.page.locator(this.homeSelectors.headers.nucbaZappiLogo);
  }

  //Hero:
  getHeroTitle() {
    return this.page.locator(this.homeSelectors.hero.title);
  }

  // recomendado:
  getTitleRecomendado() {
    return this.page.locator(this.homeSelectors.recomendado.title);
  }
  //methods:

  async verifyTitleHeroIsDisplayed() {
    const title = await this.getHeroTitle().isVisible();
    expect(title).toBeTruthy();
  }

  async verifyTitleContent(textContent) {
    const titleText = await this.getHeroTitle().textContent();
    expect(titleText).toBe(textContent);
  }

  async verifySuggestedPizzaTitleIsDisplayed() {
    const title = await this.getTitleRecomendado().isVisible();
    expect(title).toBeTruthy();
  }

  async verifySuggestedPizzaTitleText(suggestedPizzaTitle) {
    const titleText = await this.getTitleRecomendado().textContent();
    expect(titleText).toBe(suggestedPizzaTitle);
  }

  async clickBuscarBtn() {
    await this.homeSelectors.hero.buscarBtn.click();
  }

  async buscarBtnIsVisible() {
    await this.homeSelectors.hero.buscarBtn.isVisible();
  }

  async clickHomeBtn() {
    await this.getBtnHome().click();
  }

  async clickUserName() {
    await this.getUsernameLink().click();
  }

  async clickCartLink() {
    await this.getCartLink().click();
  }

  async clickUserIcon() {
    await this.getUserIcon().click();
  }

  async clickNucbaZappiLogo() {
    await this.getNucbaZappiLogo().clikc();
  }

  async isUsernameLinkVisible() {
    await this.getUsernameLink().isVisible();
  }
}

export default HomePage;
