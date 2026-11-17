import { ToolPage } from "@/components/tools/ToolPage";
import { toolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = toolMetadata("jpg-to-pdf");

export default function JpgToPdfPage() {
  return <ToolPage slug="jpg-to-pdf" />;
}
