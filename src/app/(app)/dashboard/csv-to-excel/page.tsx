import type { Metadata } from "next";
import { getWorkspaceTool } from "@/config/tools";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: getWorkspaceTool("csv-to-excel").name };

export default function CsvToExcelDashboardPage() {
  return <ToolModule slug="csv-to-excel" />;
}
