import type { Metadata } from "next";
import { getWorkspaceTool } from "@/config/tools";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: getWorkspaceTool("pdf-to-word").name };

export default function PdfToWordDashboardPage() {
  return <ToolModule slug="pdf-to-word" />;
}
