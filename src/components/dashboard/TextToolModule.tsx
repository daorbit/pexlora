import { getTextTool, type TextToolSlug } from "@/config/text-tools";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { TextToolWorkspace } from "@/components/text-tools/TextToolWorkspace";

export function TextToolModule({ slug }: { slug: TextToolSlug }) {
  const tool = getTextTool(slug);

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title={tool.name} description={tool.description} />
      <TextToolWorkspace slug={slug} context="dashboard" />
    </div>
  );
}
