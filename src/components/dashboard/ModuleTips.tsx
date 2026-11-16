import type { WorkspaceToolSlug } from "@/config/tools";
import { moduleTips, sharedLimits, shellCopy } from "@/content/dashboard";
import { PanelDetails } from "@/components/workspace/PanelDetails";

export function ModuleTips({ slug }: { slug: WorkspaceToolSlug }) {
  return (
    <div className="divide-y divide-separator">
      <PanelDetails title={shellCopy.tips}>
        <ul className="flex list-disc flex-col gap-1.5 pl-4 text-[13px] text-secondary">
          {moduleTips[slug].tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </PanelDetails>
      <PanelDetails title={shellCopy.limits}>
        <dl className="grid grid-cols-2 gap-y-1.5 text-[13px]">
          {sharedLimits.map((limit) => (
            <div key={limit.label} className="contents">
              <dt className="text-secondary">{limit.label}</dt>
              <dd className="text-right font-semibold">{limit.value}</dd>
            </div>
          ))}
        </dl>
      </PanelDetails>
    </div>
  );
}
