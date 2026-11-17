"use client";

import { usePathname, useRouter } from "next/navigation";
import { dashboardToolHref } from "@/config/dashboard";
import { routes } from "@/config/site";
import { getWorkspaceTool, nextStepTools, toolIconSrc, type WorkspaceToolSlug } from "@/config/tools";
import { nextStepsCopy } from "@/content/workspace";
import type { QueueResult } from "@/hooks/useFileQueue";
import { handOffFiles } from "@/lib/utils/file-handoff";
import { isGalleryMedia } from "@/lib/utils/save-file";
import { HubItemIcon } from "@/components/tools/HubItemIcon";

type NextStepsProps = { current: WorkspaceToolSlug; results: QueueResult[] };

export function NextSteps({ current, results }: NextStepsProps) {
  const router = useRouter();
  const inDashboard = usePathname().startsWith(routes.dashboard);
  const images = results.filter((result) => isGalleryMedia(result.blob.type) && result.blob.type.startsWith("image/"));
  const tools = nextStepTools.filter((slug) => slug !== current);
  if (!images.length) return null;

  const sendTo = (slug: WorkspaceToolSlug) => {
    handOffFiles(slug, images.map((result) => new File([result.blob], result.name, { type: result.blob.type })));
    router.push(inDashboard ? dashboardToolHref(slug) : getWorkspaceTool(slug).href);
  };

  return (
    <div className="flex flex-col gap-2.5 motion-safe:animate-fade-up motion-safe:[animation-duration:0.4s]">
      <div className="flex flex-col">
        <p className="text-[13px] font-semibold text-secondary">{nextStepsCopy.title}</p>
        <p className="text-xs text-tertiary">{nextStepsCopy.files(images.length)}</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {tools.map((slug) => (
          <button
            key={slug}
            type="button"
            onClick={() => sendTo(slug)}
            className="group flex items-center gap-2.5 rounded-2xl bg-fill px-2.5 py-2 text-left text-[13px] font-semibold transition-colors hover:bg-fill-strong focus-visible:outline-2 focus-visible:outline-ring"
          >
            <HubItemIcon src={toolIconSrc(slug)} size="xs" />
            <span className="min-w-0 truncate">{getWorkspaceTool(slug).shortName}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
