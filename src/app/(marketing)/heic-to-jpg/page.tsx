import { ToolPage } from "@/components/tools/ToolPage";
import { toolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = toolMetadata("heic-to-jpg");

export default function HeicToJpgPage() {
  return <ToolPage slug="heic-to-jpg" />;
}
