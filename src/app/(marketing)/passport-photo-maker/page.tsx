import { ToolPage } from "@/components/tools/ToolPage";
import { toolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = toolMetadata("passport-photo");

export default function PassportPhotoPage() {
  return <ToolPage slug="passport-photo" />;
}
