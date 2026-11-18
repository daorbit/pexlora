import { ToolPage } from "@/components/tools/ToolPage";
import { toolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = toolMetadata("word-to-pdf");

export default function WordToPdfPage() {
  return <ToolPage slug="word-to-pdf" />;
}
