import type { Metadata } from "next";
import { getWorkspaceTool } from "@/config/tools";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: getWorkspaceTool("compress-pdf").name };

export default function CompressPdfDashboardPage() {
  return <ToolModule slug="compress-pdf" />;
}
