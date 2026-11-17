import type { Metadata } from "next";
import { getWorkspaceTool } from "@/config/tools";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: getWorkspaceTool("pdf-watermark").name };

export default function PdfWatermarkDashboardPage() {
  return <ToolModule slug="pdf-watermark" />;
}
