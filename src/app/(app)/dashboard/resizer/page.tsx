import type { Metadata } from "next";
import { getWorkspaceTool } from "@/config/tools";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: getWorkspaceTool("resize-image").name };

export default function ResizerPage() {
  return <ToolModule slug="resize-image" />;
}
