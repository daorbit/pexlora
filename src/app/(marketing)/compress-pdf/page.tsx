import { toolMetadata } from "@/lib/seo/tool-metadata";
import { ToolPage } from "@/components/tools/ToolPage";

export const metadata = toolMetadata("compress-pdf");

export default function CompressPdfPage() {
  return <ToolPage slug="compress-pdf" />;
}
