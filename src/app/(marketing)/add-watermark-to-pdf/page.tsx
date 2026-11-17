import { ToolPage } from "@/components/tools/ToolPage";
import { toolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = toolMetadata("pdf-watermark");

export default function PdfWatermarkPage() {
  return <ToolPage slug="pdf-watermark" />;
}
