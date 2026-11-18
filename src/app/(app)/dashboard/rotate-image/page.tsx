import type { Metadata } from "next";
import { getWorkspaceTool } from "@/config/tools";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: getWorkspaceTool("rotate-image").name };

export default function RotateImageDashboardPage() {
  return <ToolModule slug="rotate-image" />;
}
