import type { Metadata } from "next";
import { getWorkspaceTool } from "@/config/tools";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: getWorkspaceTool("view-metadata").name };

export default function InspectorPage() {
  return <ToolModule slug="view-metadata" />;
}
