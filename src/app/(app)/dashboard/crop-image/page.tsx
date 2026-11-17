import type { Metadata } from "next";
import { getWorkspaceTool } from "@/config/tools";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: getWorkspaceTool("crop-image").name };

export default function CropImageDashboardPage() {
  return <ToolModule slug="crop-image" />;
}
