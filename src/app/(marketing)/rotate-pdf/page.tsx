import { ToolPage } from "@/components/tools/ToolPage";
import { toolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = toolMetadata("rotate-pdf");

export default function RotatePdfPage() {
  return <ToolPage slug="rotate-pdf" />;
}
