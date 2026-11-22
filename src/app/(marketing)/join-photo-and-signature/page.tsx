import { toolMetadata } from "@/lib/seo/tool-metadata";
import { ToolPage } from "@/components/tools/ToolPage";

export const metadata = toolMetadata("photo-signature");

export default function PhotoSignaturePage() {
  return <ToolPage slug="photo-signature" />;
}
