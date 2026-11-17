import { ToolPage } from "@/components/tools/ToolPage";
import { toolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = toolMetadata("form-photo");

export default function FormPhotoPage() {
  return <ToolPage slug="form-photo" />;
}
