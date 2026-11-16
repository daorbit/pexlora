import type { Metadata } from "next";
import { getWorkspaceTool } from "@/config/tools";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: getWorkspaceTool("edit-metadata").name };

export default function EditorPage() {
  return <ToolModule slug="edit-metadata" />;
}
