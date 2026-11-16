import { ToolPage } from "@/components/tools/ToolPage";
import { toolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = toolMetadata("view-metadata");

export default function MetadataViewerPage() {
  return <ToolPage slug="view-metadata" />;
}
