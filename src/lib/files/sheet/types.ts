export type SheetCell = { text: string; numeric: boolean };

export type SheetTable = { name: string; rows: SheetCell[][] };

export type CellValue = string | number | null;

export type OutputSheet = { name: string; rows: CellValue[][] };
