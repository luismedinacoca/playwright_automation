//const ExcelJs = require("exceljs");
import ExcelJs from "exceljs";
import { test, expect } from "@playwright/test";

async function excelTest() {
  
  //********************************************************************************** */
  const cosasArgentinas = [
    "mate",
    "jengibre",
    "pandulce",
    "medialuna",
    "asado",
    "empanada",
    "pastel-de-papa",
    "magdalena",
    "facturas",
    "tortitas",
    "mollejitas",
  ];
  const randomValue = (number) => {
    return Math.floor(Math.random() * number);
  };
  const indice = randomValue(cosasArgentinas.length);
  const nuevoValor = cosasArgentinas[indice];
  //********************************************************************************** */

  const filePath =
  "/Users/luisjaviermedinacoca/Desktop/WORKCENTER/[Playwright]/playwright-automation/excel-download-test.xlsx";
  
  const workbook = new ExcelJs.Workbook();
  
  try {
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet(1);

    const rowNumberToModify = 3;
    const colNumberToModify = 2;

    // getting the specific cell value:
    const cellToModify = worksheet.getCell(
      rowNumberToModify,
      colNumberToModify
    );

    // getting the current cell value:
    const originalCellValue = cellToModify.value;
    console.log(
      `Valor original de la celda (${rowNumberToModify}, ${colNumberToModify}): ${originalCellValue}`
    );

    // modifying the cell value
    cellToModify.value = nuevoValor;
    console.log(
      `Valor de la celda (${rowNumberToModify}, ${colNumberToModify}) modificado a: ${nuevoValor}`
    );

    // saving the value in the excel file:
    await workbook.xlsx.writeFile(filePath);
    console.log("Archivo Excel guardado con los cambios.");
  } catch (error) {
    console.error("Error al procesar el archivo Excel:", error);
  }
}

// Ejecutar la función asíncrona: $ node tests/section12/lecture068.spec.js
excelTest();
