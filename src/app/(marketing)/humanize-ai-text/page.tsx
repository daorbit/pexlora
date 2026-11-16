import { TextToolPage } from "@/components/text-tools/TextToolPage";
import { textToolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = textToolMetadata("ai-humanizer");

export default function HumanizeAiTextPage() {
  return <TextToolPage slug="ai-humanizer" />;
}
