import { ToolPage } from "@/components/tools/ToolPage";
import { toolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = toolMetadata("split-pdf");

export default function SplitPdfPage() {
  return <ToolPage slug="split-pdf" />;
}
