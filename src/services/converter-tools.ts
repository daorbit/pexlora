import type { PdfPageOptions, PdfSheetOptions } from "@/lib/image/options";
import { withExtension } from "@/lib/utils/file-name";
import { bundle, finish, guard } from "@/services/local-result";

const pdfToOffice = () => import("@/lib/files/convert/pdf-to-office");
const sheetConvert = () => import("@/lib/files/convert/sheet-convert");

export async function excelToPdfFile(file: File, options: PdfPageOptions) {
  const { excelToPdf } = await import("@/lib/files/convert/excel-to-pdf");
  return finish(await guard(() => excelToPdf(file, options)), withExtension(file.name, "pdf"));
}

export async function wordToPdfFile(file: File, options: PdfPageOptions) {
  const { wordToPdf } = await import("@/lib/files/convert/word-to-pdf");
  return finish(await guard(() => wordToPdf(file, options)), withExtension(file.name, "pdf"));
}

export async function pdfToExcelFile(file: File, options: PdfSheetOptions) {
  const { pdfToXlsx } = await pdfToOffice();
  return finish(await guard(() => pdfToXlsx(file, options)), withExtension(file.name, "xlsx"));
}

export async function pdfToWordFile(file: File) {
  const { pdfToDocx } = await pdfToOffice();
  return finish(await guard(() => pdfToDocx(file)), withExtension(file.name, "docx"));
}

export async function pdfToTextFile(file: File) {
  const { pdfToPlainText } = await pdfToOffice();
  return finish(await guard(() => pdfToPlainText(file)), withExtension(file.name, "txt"));
}

export async function csvToExcelFile(file: File) {
  const { csvToXlsx } = await sheetConvert();
  return finish(await guard(() => csvToXlsx(file)), withExtension(file.name, "xlsx"));
}

export async function excelToCsvFile(file: File) {
  const { workbookToCsv } = await sheetConvert();
  return bundle(await guard(() => workbookToCsv(file)), file, "-csv");
}
