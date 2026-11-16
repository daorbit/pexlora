import { ToolPage } from "@/components/tools/ToolPage";
import { toolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = toolMetadata("remove-metadata");

export default function RemoveMetadataPage() {
  return <ToolPage slug="remove-metadata" />;
}
