import type { Metadata } from "next";
import { getWorkspaceTool } from "@/config/tools";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: getWorkspaceTool("organize-pdf").name };

export default function OrganizePdfDashboardPage() {
  return <ToolModule slug="organize-pdf" />;
}
