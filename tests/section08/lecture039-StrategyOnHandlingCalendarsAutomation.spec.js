import { test, expect, describe } from "@playwright/test";

test.describe("Calendar handling test", () => {
  test("Strategy On Handling Calendars Automation", async ({page}) => {

    const monthNumber = "April";
    const day = '6'
    const year = "2027"
    const date = `button [aria-label="${monthNumber} ${day}, ${year}"]`;

    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers')

    await page.locator('.react-date-picker__inputGroup').click()
    await page.locator('.react-calendar__navigation__label').click()
    await page.locator('.react-calendar__navigation__label').click()
    await page.getByText(year).click();
    await page.getByText(monthNumber).click();
    console.log("My date: ",date)
    await page.locator(date).click();


    //[class="react-date-picker__inputGroup"]
    //.react-calendar__navigation__label
    await page.waitForTimeout(2000);
  })
})
