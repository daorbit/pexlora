import Image from "next/image";
import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { AiTagIcon } from "@/components/icons/AiTagIcon";
import { showcaseFile, showcaseTags } from "@/content/landing";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { WindowFrame } from "@/components/ui/WindowFrame";

function PaneHeader({ title, badge }: { title: string; badge: ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-separator px-5 py-3">
      <p className="text-[13px] font-semibold">{title}</p>
      {badge}
    </div>
  );
}

export function InspectorShowcase() {
  const aiCount = showcaseTags.filter((tag) => tag.ai).length;

  return (
    <Section
      id="inspector"
      eyebrow="See it in action"
      title="See what's hidden. Then remove it."
      description="Every file is read before it's cleaned, so you know exactly what was there and that nothing is left behind."
    >
      <WindowFrame title={`${showcaseFile.name} — Inspector`}>
        <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)_minmax(0,0.8fr)]">
          <div className="flex flex-col gap-3 border-b border-separator p-5 lg:border-r lg:border-b-0">
            <Image
              src={showcaseFile.src}
              alt="Sample AI-generated landscape"
              width={600}
              height={450}
              className="aspect-4/3 w-full rounded-lg border border-separator object-cover"
            />
            <div>
              <p className="text-[15px] font-medium">{showcaseFile.name}</p>
              <p className="text-[13px] text-secondary">{showcaseFile.details}</p>
            </div>
          </div>

          <div className="flex flex-col border-b border-separator lg:border-r lg:border-b-0">
            <PaneHeader
              title="Before"
              badge={
                <Badge tone="warning">
                  <AiTagIcon className="size-3.5" />
                  {aiCount} AI tags
                </Badge>
              }
            />
            <dl className="divide-y divide-separator">
              {showcaseTags.map((tag) => (
                <div key={`${tag.group}-${tag.key}`} className="flex items-center gap-3 px-5 py-2.5">
                  <dt className="w-36 shrink-0 truncate text-[13px] text-secondary">
                    <span className="text-[11px] uppercase tracking-wide">{tag.group}</span> {tag.key}
                  </dt>
                  <dd className="min-w-0 flex-1 truncate font-mono text-xs">{tag.value}</dd>
                  {tag.ai && <Badge tone="warning">AI</Badge>}
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col">
            <PaneHeader
              title="After"
              badge={
                <Badge tone="success">
                  <Check className="size-3" strokeWidth={3} aria-hidden />
                  Clean
                </Badge>
              }
            />
            <div className="flex flex-1 flex-col items-center justify-center gap-3 px-5 py-12 text-center">
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-success-soft text-success">
                <Check className="size-6" strokeWidth={2.5} aria-hidden />
              </span>
              <p className="text-[15px] font-medium">0 tags left</p>
              <p className="max-w-[16rem] text-[13px] text-secondary">
                Re-checked after cleaning. Same pixels, no metadata.
              </p>
            </div>
          </div>
        </div>
      </WindowFrame>
    </Section>
  );
}
