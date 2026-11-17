import { ToolPage } from "@/components/tools/ToolPage";
import { toolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = toolMetadata("merge-pdf");

export default function MergePdfPage() {
  return <ToolPage slug="merge-pdf" />;
}
