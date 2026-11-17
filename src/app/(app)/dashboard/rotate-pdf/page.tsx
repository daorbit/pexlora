import type { Metadata } from "next";
import { getWorkspaceTool } from "@/config/tools";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: getWorkspaceTool("rotate-pdf").name };

export default function RotatePdfDashboardPage() {
  return <ToolModule slug="rotate-pdf" />;
}
