import type { Metadata } from "next";
import { getWorkspaceTool } from "@/config/tools";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: getWorkspaceTool("pdf-to-text").name };

export default function PdfToTextDashboardPage() {
  return <ToolModule slug="pdf-to-text" />;
}
