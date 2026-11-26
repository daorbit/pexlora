"use client";

import { dashboardToolHref, overviewPopularTools } from "@/config/dashboard";
import { getWorkspaceTool, toolIconSrc, workspaceTools, type WorkspaceToolSlug } from "@/config/tools";
import { overviewCopy } from "@/content/dashboard";
import { useRecentTools } from "@/hooks/useRecentTools";
import { GroupCard, GroupRows } from "@/components/dashboard/overview/GroupCard";
import { ToolRowLink } from "@/components/dashboard/overview/ToolRowLink";

const copy = overviewCopy.recentTools;
const slugs = new Set<string>(workspaceTools.map((tool) => tool.slug));

export function RecentToolsCard() {
  const recent = useRecentTools().filter((key): key is WorkspaceToolSlug => slugs.has(key));
  const tools = recent.length ? recent : overviewPopularTools;

  return (
    <GroupCard title={recent.length ? copy.title : copy.popular} className="h-full">
      <GroupRows>
        {tools.map((slug) => {
          const tool = getWorkspaceTool(slug);
          return (
            <li key={slug}>
              <ToolRowLink href={dashboardToolHref(slug)} iconSrc={toolIconSrc(slug)} name={tool.shortName} description={tool.headline} />
            </li>
          );
        })}
      </GroupRows>
    </GroupCard>
  );
}
