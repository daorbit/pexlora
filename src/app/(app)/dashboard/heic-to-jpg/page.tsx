import type { Metadata } from "next";
import { getWorkspaceTool } from "@/config/tools";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: getWorkspaceTool("heic-to-jpg").name };

export default function HeicToJpgDashboardPage() {
  return <ToolModule slug="heic-to-jpg" />;
}
