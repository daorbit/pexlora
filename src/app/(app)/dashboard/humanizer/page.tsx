import type { Metadata } from "next";
import { getTextTool } from "@/config/text-tools";
import { TextToolModule } from "@/components/dashboard/TextToolModule";

export const metadata: Metadata = { title: getTextTool("ai-humanizer").name };

export default function HumanizerPage() {
  return <TextToolModule slug="ai-humanizer" />;
}
