import type { Metadata } from "next";
import { getWorkspaceTool } from "@/config/tools";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: getWorkspaceTool("image-watermark").name };

export default function WatermarkImageDashboardPage() {
  return <ToolModule slug="image-watermark" />;
}
