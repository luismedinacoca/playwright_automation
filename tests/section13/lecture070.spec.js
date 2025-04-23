//const ExcelJs = require("exceljs");
import ExcelJs from "exceljs";
import { test, expect } from "@playwright/test";

async function excelTest() {
  const workbook = new ExcelJs.Workbook();
  try {
    await workbook.xlsx.readFile(
      "/Users/luisjaviermedinacoca/Desktop/WORKCENTER/[Playwright]/playwright-automation/excel-download-test.xlsx"
    );

    const worksheet = workbook.getWorksheet("Sheet1");

    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        //console.log(cell.value);
        if (cell.value === "Apple") {
          console.log(`Row number: ${rowNumber} - Column number: ${colNumber}`);
        }
      });
      //console.log("");
    });
  } catch (error) {
    console.error("Error al leer el archivo Excel:", error);
  }
}