import { ToolPage } from "@/components/tools/ToolPage";
import { toolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = toolMetadata("pdf-to-text");

export default function PdfToTextPage() {
  return <ToolPage slug="pdf-to-text" />;
}
