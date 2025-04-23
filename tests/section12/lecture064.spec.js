import { test, expect } from "@playwright/test";

function obtenerFechaHoraActual() {
  const ahora = new Date();

  const año = ahora.getFullYear();
  const mes = String(ahora.getMonth() + 1).padStart(2, "0"); // Suma 1 porque los meses van de 0 a 11
  const dia = String(ahora.getDate()).padStart(2, "0");
  const horas = String(ahora.getHours()).padStart(2, "0");
  const minutos = String(ahora.getMinutes()).padStart(2, "0");
  const segundos = String(ahora.getSeconds()).padStart(2, "0");

  const fechaHoraFormateada = `${año}_${mes}_${dia}_${horas}_${minutos}_${segundos}`;
  return fechaHoraFormateada;
}

test("Creating previous variable/locators", async ({ page }) => {
  const date001 = obtenerFechaHoraActual();
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page
    .locator(".right-align fieldset")
    .nth(1)
    .screenshot({
      path: `tests/section12/screenshotsFolder/${date001}_beforeClickingHideBtn.png`,
    });
  await page.locator("#hide-textbox").click();

  const date002 = obtenerFechaHoraActual();
  await page
    .locator(".right-align fieldset")
    .nth(1)
    .screenshot({
      path: `tests/section12/screenshotsFolder/${date002}_afterClickingHideBtn.png`,
    });
  await expect(page.locator("#displayed-text")).toBeHidden();
});
