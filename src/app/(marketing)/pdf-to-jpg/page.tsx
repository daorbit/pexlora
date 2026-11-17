import { ToolPage } from "@/components/tools/ToolPage";
import { toolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = toolMetadata("pdf-to-jpg");

export default function PdfToJpgPage() {
  return <ToolPage slug="pdf-to-jpg" />;
}
