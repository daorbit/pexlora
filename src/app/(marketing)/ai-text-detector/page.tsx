import { TextToolPage } from "@/components/text-tools/TextToolPage";
import { textToolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = textToolMetadata("ai-text-detector");

export default function AiTextDetectorPage() {
  return <TextToolPage slug="ai-text-detector" />;
}
