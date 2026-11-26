import { dashboardToolGroups } from "@/config/dashboard";
import { dashboardGuideGroups, dashboardShortcutGroups } from "@/config/dashboard-links";
import { overviewCopy } from "@/content/dashboard";
import { OverviewSection } from "@/components/dashboard/overview/OverviewSection";
import { ShortcutCard } from "@/components/dashboard/overview/ShortcutCard";
import { ToolTileGroup } from "@/components/dashboard/overview/ToolTileGroup";

export function OverviewShortcuts() {
  return (
    <OverviewSection {...overviewCopy.shortcuts}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        {dashboardShortcutGroups.map((group) => (
          <ShortcutCard key={group.id} group={group} />
        ))}
      </div>
    </OverviewSection>
  );
}

export function OverviewTools() {
  return (
    <>
      <OverviewSection {...overviewCopy.tools}>
        <div className="flex flex-col gap-6">
          {dashboardToolGroups.map((group) => (
            <ToolTileGroup key={group.category} title={group.title} items={group.items} />
          ))}
        </div>
      </OverviewSection>

      <OverviewSection {...overviewCopy.guides}>
        <div className="flex flex-col gap-6">
          {dashboardGuideGroups.map((group) => (
            <ToolTileGroup
              key={group.id}
              title={group.title}
              items={group.links.map((link) => ({ key: link.key, href: link.href, iconSrc: link.iconSrc, name: link.label }))}
              compact
            />
          ))}
        </div>
      </OverviewSection>
    </>
  );
}
