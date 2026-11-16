import { ToolPage } from "@/components/tools/ToolPage";
import { toolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = toolMetadata("edit-metadata");

export default function EditImageMetadataPage() {
  return <ToolPage slug="edit-metadata" />;
}
