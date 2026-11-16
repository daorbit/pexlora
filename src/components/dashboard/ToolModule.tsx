import { Check } from "lucide-react";
import { getWorkspaceTool, toolIconSrc, type WorkspaceToolSlug } from "@/config/tools";
import { moduleTips, sharedLimits } from "@/content/dashboard";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { ToolWorkspace } from "@/components/workspace/ToolWorkspace";

export function ToolModule({ slug }: { slug: WorkspaceToolSlug }) {
  const tool = getWorkspaceTool(slug);
  const { title, tips } = moduleTips[slug];

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title={tool.name} description={tool.description} iconSrc={toolIconSrc(slug)} />
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <ToolWorkspace tool={slug} />
        <aside className="flex flex-col gap-4">
          <Card className="flex flex-col gap-4 p-5">
            <p className="text-sm font-semibold">{title}</p>
            <ul className="flex flex-col gap-3">
              {tips.map((tip) => (
                <li key={tip} className="flex gap-2.5 text-sm text-secondary">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                  {tip}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-5">
            <p className="mb-3 text-sm font-semibold">Limits</p>
            <dl className="flex flex-col gap-2.5 text-sm">
              {sharedLimits.map((limit) => (
                <div key={limit.label} className="flex justify-between gap-4">
                  <dt className="text-secondary">{limit.label}</dt>
                  <dd className="font-medium">{limit.value}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </aside>
      </div>
    </div>
  );
}
