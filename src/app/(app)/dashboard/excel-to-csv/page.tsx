import type { Metadata } from "next";
import { getWorkspaceTool } from "@/config/tools";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: getWorkspaceTool("excel-to-csv").name };

export default function ExcelToCsvDashboardPage() {
  return <ToolModule slug="excel-to-csv" />;
}
