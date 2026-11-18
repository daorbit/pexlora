import type { Metadata } from "next";
import { getWorkspaceTool } from "@/config/tools";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: getWorkspaceTool("excel-to-pdf").name };

export default function ExcelToPdfDashboardPage() {
  return <ToolModule slug="excel-to-pdf" />;
}
