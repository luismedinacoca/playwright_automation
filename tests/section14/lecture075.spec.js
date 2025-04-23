import { test, expect, describe } from "@playwright/test";
import LoginPage from "./PageObjects/LoginPage";
import DashboardPage from "./PageObjects/DashboardPage";
import MenuPage from "./PageObjects/MenuPage";

test.use({
  viewport: {
    width: 1512,
    height: 960,
  },
});

test.describe("Page Object Model - Client page", () => {
  test("Create an Order with POM", async ({ page }) => {
    const userEmail = "suspiros_mza@mailinator.com";
    const userPwd = "Test!001";

    //Initialize Pages:
    const loginPage = new LoginPage(page);
    const menuPage = new MenuPage(page);
    const dashboardPage = new DashboardPage(page);

    // ************* Login page ************* \\
    loginPage.navigate();
    loginPage.validLogin(userEmail, userPwd);

    // ************* Home page ************* \\

    dashboardPage.loadingDashboard();

    // ************* Menu page ************* \\
    menuPage.clickCartMenu();
    menuPage.waitTwoSeconds();
    menuPage.clickLogoMenu();
    menuPage.waitTwoSeconds();
    menuPage.clickOrdersMenu();
    menuPage.waitTwoSeconds();
    menuPage.clickHomeMenu;
    //menuPage.clickSignOutMenu();

    // ************* Home page ************* \\
    // const dashboardPage = new DashboardPage(page);
    dashboardPage.loadingDashboard();

    //ADIDAS ORIGINAL product might be selected:
    dashboardPage.addProduct("ADIDAS ORIGINAL"); //failing!!
    dashboardPage.navigateToCart();

    // ************* Checkout page ************* \\
    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ADIDAS ORIGINAL")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Continue Shopping" })
    ).toBeVisible();

    //Click on "Checkout" button:
    await expect(page.getByRole("button", { name: "Checkout" })).toBeVisible();
    await page.getByRole("button", { name: "Checkout" }).click();

    // ************* Payment page ************* \\
    const cardInfoFields = page.locator(".field input");

    await cardInfoFields.nth(0).fill("4000 0000 0000 1000");
    await cardInfoFields.nth(1).fill("100");
    await cardInfoFields.nth(2).fill("Pyramid Glass");
    await cardInfoFields.nth(3).fill("rahulshettyacademy");
    await page.locator("button[type='submit']").click();

    await page.getByText("* Coupon Applied").waitFor();
    const coupon = await page.getByText("* Coupon Applied").isVisible();
    expect(coupon).toBeTruthy();

    await page.getByPlaceholder("Select Country").pressSequentially("United");

    const dropdown = page.locator(".ta-results");
    const countryName = "United Kingdom";

    await dropdown.waitFor();
    await expect(
      page.getByRole("button", { name: `${countryName}` })
    ).toBeVisible();
    await page.getByRole("button", { name: `${countryName}` }).click();

    const email = await page.locator(".user__name label").textContent();
    expect(email).toBe(userEmail);

    await page.getByText("place order").click();

    // ************* Thank You page ************* \\

    const titleThankyouTitle = await page
      .locator(".hero-primary")
      .textContent();
    expect(titleThankyouTitle).toContain("Thankyou for the order");
    await expect(page.locator(".hero-primary")).toHaveText(
      " Thankyou for the order. "
    );

    // saving orderNumberId:
    const orderNumber = await page
      .locator(".em-spacer-1 .ng-star-inserted")
      .textContent();

    await page.locator('button[routerlink*="myorders"]').click();

    // ************ ORDER Page ************ \\
    await page.locator("tbody").waitFor();

    await page.locator("h1").isVisible();
    const orderPageTitle = await page.locator("h1").textContent();
    expect(orderPageTitle).toBe("Your Orders");

    await page.locator(".row button").first().isVisible();
    const goBackToShopBtn = await page
      .locator(".row button")
      .first()
      .textContent();
    expect(goBackToShopBtn).toBe("Go Back to Shop");

    const rows = await page.locator("tbody tr");
    const rowsCount = await rows.count();
    // console.log(">>> rowsCount: ", rowsCount);

    let rowOrderId = "";

    for (let i = 0; i < rowsCount; i++) {
      rowOrderId = await rows.nth(i).locator("th").textContent();
      // console.log(rowOrderId)
      // console.log(orderNumber)
      if (orderNumber.includes(rowOrderId)) {
        console.log("Orders are equals");
        await rows.nth(i).locator("button.btn-primary").click();
        break;
      }
    }

    // ************** ORDER SUMMARY PAGE ************** \\
    expect(await page.locator(".email-title").isVisible());
    const orderSummaryTitle = await page.locator(".email-title").textContent();
    expect(orderSummaryTitle).toBe(" order summary ");

    await page.locator('[class*="col-text"]').isVisible();
    const orderSummaryPage = await page
      .locator('[class*="col-text"]')
      .textContent();
    // console.log("orderSummaryPage: ", orderSummaryPage);
    expect(orderSummaryPage).toContain(rowOrderId);
    console.log(`📌 👉🏽 ${orderSummaryPage} contains ${rowOrderId}`);

    await page.waitForTimeout(1000);
  });
});
