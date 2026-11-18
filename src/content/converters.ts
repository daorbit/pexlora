import { PDF_PAGE_LIMIT, SHEET_CELL_LIMIT } from "@/config/limits";
import type { PageOrientation, PdfPageSize, PdfSheetLayout } from "@/lib/image/options";

export const converterOptionsCopy = {
  pageSize: "Page size",
  pageSizeLabel: "PDF page size",
  pageSizes: {
    a4: { label: "A4", hint: "India, Europe" },
    letter: { label: "Letter", hint: "US, Canada" },
  } satisfies Record<PdfPageSize, { label: string; hint: string }>,
  orientation: "Orientation",
  orientationLabel: "Page orientation",
  orientations: {
    auto: { label: "Auto", hint: "Fits the content" },
    portrait: { label: "Portrait", hint: "Tall" },
    landscape: { label: "Landscape", hint: "Wide" },
  } satisfies Record<PageOrientation, { label: string; hint: string }>,
  excelHint: "Each sheet becomes a table. Wide sheets switch to landscape on Auto and shrink to fit the page width.",
  wordHint: "Headings, lists, tables and images are kept. Exact Word fonts and page layout may differ.",
  sheetLayout: "Sheets",
  sheetLayoutLabel: "How pages map to sheets",
  sheetLayouts: {
    single: { label: "One Sheet", hint: "All pages, one table" },
    page: { label: "Sheet per Page", hint: "Page 1, Page 2…" },
  } satisfies Record<PdfSheetLayout, { label: string; hint: string }>,
  pdfExcelHint: "Columns are detected from where the text sits. Scanned PDFs have no text to read.",
};

export const converterErrors = {
  noText: "No text found in this PDF. It may be a scanned image, and text in scans can't be read yet.",
  emptySheet: "This spreadsheet has no data to convert.",
  emptyDocument: "This document has no text or images to convert.",
  tooManyCells: `Spreadsheets over ${SHEET_CELL_LIMIT.toLocaleString("en-US")} cells aren't supported yet.`,
  tooManyPages: `The PDF would be over ${PDF_PAGE_LIMIT} pages. Split the spreadsheet into smaller files first.`,
  encryptedSheet: "Password-protected spreadsheets can't be opened here. Remove the password first.",
};

export const converterOutput = {
  pageSheet: (page: number) => `Page ${page}`,
  sheetFallback: (index: number) => `Sheet ${index}`,
  continued: (name: string) => `${name} (continued)`,
  rupee: "Rs.",
  missingGlyph: "?",
};

export const previewTextCopy = {
  lines: (shown: number, total: number) => (shown === total ? `${total} lines` : `First ${shown} of ${total} lines`),
  rows: (shown: number, total: number) => (shown === total ? `${total} rows` : `First ${shown} of ${total} rows`),
  sheets: (count: number) => `${count} ${count === 1 ? "sheet" : "sheets"}`,
  sheetPicker: "Sheet",
  emptyText: "This file is empty.",
  error: "This file couldn't be opened for a preview. Save it to check it.",
};
