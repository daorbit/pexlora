import type { Metadata } from "next";
import { getWorkspaceTool } from "@/config/tools";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: getWorkspaceTool("split-pdf").name };

export default function SplitPdfDashboardPage() {
  return <ToolModule slug="split-pdf" />;
}
