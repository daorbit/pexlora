import type { Metadata } from "next";
import { getWorkspaceTool } from "@/config/tools";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: getWorkspaceTool("image-alt-text").name };

export default function AltTextPage() {
  return <ToolModule slug="image-alt-text" />;
}
