import type { Metadata } from "next";
import { getWorkspaceTool } from "@/config/tools";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: getWorkspaceTool("pdf-to-excel").name };

export default function PdfToExcelDashboardPage() {
  return <ToolModule slug="pdf-to-excel" />;
}
