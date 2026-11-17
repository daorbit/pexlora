import type { Metadata } from "next";
import { getWorkspaceTool } from "@/config/tools";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: getWorkspaceTool("svg-to-image").name };

export default function SvgToImageDashboardPage() {
  return <ToolModule slug="svg-to-image" />;
}
