import { ToolPage } from "@/components/tools/ToolPage";
import { toolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = toolMetadata("organize-pdf");

export default function OrganizePdfPage() {
  return <ToolPage slug="organize-pdf" />;
}
