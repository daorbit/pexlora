import { ToolPage } from "@/components/tools/ToolPage";
import { toolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = toolMetadata("pdf-to-excel");

export default function PdfToExcelPage() {
  return <ToolPage slug="pdf-to-excel" />;
}
