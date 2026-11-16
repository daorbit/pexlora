import type { Metadata } from "next";
import { getWorkspaceTool } from "@/config/tools";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: getWorkspaceTool("compress-image").name };

export default function CompressorPage() {
  return <ToolModule slug="compress-image" />;
}
