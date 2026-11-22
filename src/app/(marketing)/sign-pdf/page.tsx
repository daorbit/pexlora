import { toolMetadata } from "@/lib/seo/tool-metadata";
import { ToolPage } from "@/components/tools/ToolPage";

export const metadata = toolMetadata("sign-pdf");

export default function SignPdfPage() {
  return <ToolPage slug="sign-pdf" />;
}
