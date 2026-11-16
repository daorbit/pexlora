import type { Metadata } from "next";
import { getWorkspaceTool } from "@/config/tools";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: getWorkspaceTool("remove-metadata").name };

export default function CleanerPage() {
  return <ToolModule slug="remove-metadata" />;
}
