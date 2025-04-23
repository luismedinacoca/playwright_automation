import { test, expect, describe } from "@playwright/test";
import { obtenerFechaHoraActual } from "../../functions.js";
import POManagerPage from "../POManager.js";

// test.use({
//   viewport: {
//     width: 1512,
//     height: 960,
//   },
// });

const username = "jaim.aaron_bm" + obtenerFechaHoraActual();
const email = username + "@example.io";
const userPwd = "Test!001";
const URL = "https://nucba-zappi2-0.vercel.app/register";
let token = "";

test("Create an account in Nucba Zappi page", async ({ page }) => {
  const poManager = new POManagerPage(page);
  const register = poManager.getRegisterPage();

  await page.goto(URL);

  await register.enterUsername(username);
  await register.enterEmail(email);
  await register.enterPassword(userPwd);

  await register.clickRegistrarse();

  //const home = new HomePage(page);
  const home = poManager.getHomePage();

  const response = await page.waitForResponse(
    "https://nucbaz-api.vercel.app/auth/login"
  );

  //backend loading process:
  if (response.ok()) {
    console.log("Login successful.");

    const responseInJson = await response.json();
    const responseString = JSON.stringify(responseInJson);
    console.log(`response body: ${responseString}`);

    if (responseInJson.token) {
      token = responseInJson.token;
      console.log(`Token: \n${responseInJson.token}`);
    } else {
      console.log("Token no found.");
    }
  } else {
    console.log(
      `Login session request failed with status code: ${response.status()}`
    );
    const responseText = await response.text();
    console.log(`response text: ${responseText}`);
  }

  await home.verifyTitleHeroIsDisplayed();
  await home.verifyTitleContent("¿Qué categoría estás buscando?");

  await home.verifySuggestedPizzaTitleIsDisplayed();
  await home.verifySuggestedPizzaTitleText("Hoy te recomendamos");

  console.log(username);
  console.log(email);
  console.log(userPwd);

  //expect(await home.isUsernameLinkVisible()).toBe(true);
  expect(await home.getUsernameLink().textContent()).toBe(username);
  console.log(`Token variable value: ${token}`);
  await page.waitForTimeout(3500);
});
