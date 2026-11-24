import { toolFactsCopy, type FactRow } from "@/content/facts";
import { GlanceSection } from "@/components/seo/glance/GlanceSection";

type ToolFactsSectionProps = { name: string; description: string; path: string; rows: FactRow[] };

export function ToolFactsSection({ name, description, path, rows }: ToolFactsSectionProps) {
  return (
    <GlanceSection
      eyebrow={toolFactsCopy.eyebrow}
      title={toolFactsCopy.title(name)}
      summary={toolFactsCopy.summary(name, description)}
      caption={toolFactsCopy.tableCaption(name)}
      rows={rows}
      path={path}
    />
  );
}
