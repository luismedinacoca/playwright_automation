import { test, expect } from "@playwright/test";

test("Creating previous variable/locators", async ({ page }) => {
  //await page.route("**/*.{jpeg, jpg, png, css}", (route) => route.abort());
  await page.route(/\.(jpeg|jpg|png|css)$/, (route) => route.abort());

  page.on("request", (request) => console.log("📌 request: ", request.url()));
  page.on("response", (response) =>
    console.log("👉🏽 response: ", response.url(), response.status())
  );

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  //variables: without await
  const username = page.locator("#username");
  const password = page.locator('[type="password"]');
  const signInBtn = page.locator("#signInBtn");
  const cardTitle = page.locator(".card-body a");

  //actions
  await username.fill("rahulshettyacademy");
  await password.fill("learning");
  await signInBtn.click();
  const firstTitle = await cardTitle.first().textContent();
  console.log(firstTitle);
  console.log(await cardTitle.nth(0).textContent());
  console.log("with .selectText()", await cardTitle.nth(0).selectText());
  console.log(await cardTitle.nth(1).textContent());
  await page.waitForTimeout(3500);
});
