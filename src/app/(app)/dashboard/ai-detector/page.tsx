import type { Metadata } from "next";
import { getTextTool } from "@/config/text-tools";
import { TextToolModule } from "@/components/dashboard/TextToolModule";

export const metadata: Metadata = { title: getTextTool("ai-text-detector").name };

export default function AiDetectorPage() {
  return <TextToolModule slug="ai-text-detector" />;
}
