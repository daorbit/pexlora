import type { Metadata } from "next";
import { getWorkspaceTool } from "@/config/tools";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: getWorkspaceTool("pdf-to-jpg").name };

export default function PdfToJpgDashboardPage() {
  return <ToolModule slug="pdf-to-jpg" />;
}
