import type { Metadata } from "next";
import { getWorkspaceTool } from "@/config/tools";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: getWorkspaceTool("photo-signature").name };

export default function PhotoSignatureDashboardPage() {
  return <ToolModule slug="photo-signature" />;
}
