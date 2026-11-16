import type { Metadata } from "next";
import { getWorkspaceTool } from "@/config/tools";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: getWorkspaceTool("convert-format").name };

export default function ConverterPage() {
  return <ToolModule slug="convert-format" />;
}
