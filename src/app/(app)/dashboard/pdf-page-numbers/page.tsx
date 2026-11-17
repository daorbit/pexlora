import type { Metadata } from "next";
import { getWorkspaceTool } from "@/config/tools";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: getWorkspaceTool("pdf-page-numbers").name };

export default function PdfPageNumbersDashboardPage() {
  return <ToolModule slug="pdf-page-numbers" />;
}
