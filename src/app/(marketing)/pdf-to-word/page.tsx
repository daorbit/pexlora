import { ToolPage } from "@/components/tools/ToolPage";
import { toolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = toolMetadata("pdf-to-word");

export default function PdfToWordPage() {
  return <ToolPage slug="pdf-to-word" />;
}
