import type { Metadata } from "next";
import { getWorkspaceTool } from "@/config/tools";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: getWorkspaceTool("image-palette").name };

export default function ColorPaletteDashboardPage() {
  return <ToolModule slug="image-palette" />;
}
