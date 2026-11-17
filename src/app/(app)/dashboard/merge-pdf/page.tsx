import type { Metadata } from "next";
import { getWorkspaceTool } from "@/config/tools";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: getWorkspaceTool("merge-pdf").name };

export default function MergePdfDashboardPage() {
  return <ToolModule slug="merge-pdf" />;
}
