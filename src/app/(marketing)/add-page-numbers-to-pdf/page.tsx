import { ToolPage } from "@/components/tools/ToolPage";
import { toolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = toolMetadata("pdf-page-numbers");

export default function PdfPageNumbersPage() {
  return <ToolPage slug="pdf-page-numbers" />;
}
