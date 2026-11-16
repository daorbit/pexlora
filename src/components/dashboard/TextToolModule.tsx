import type { TextToolSlug } from "@/config/text-tools";
import { TextToolWorkspace } from "@/components/text-tools/TextToolWorkspace";

export function TextToolModule({ slug }: { slug: TextToolSlug }) {
  return <TextToolWorkspace slug={slug} context="dashboard" />;
}
