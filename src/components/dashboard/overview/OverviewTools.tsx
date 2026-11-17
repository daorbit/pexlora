import { overviewToolColumns } from "@/config/dashboard";
import { dashboardGuideGroups, dashboardShortcutGroups } from "@/config/dashboard-links";
import { overviewCopy } from "@/content/dashboard";
import { GroupCard, GroupRows } from "@/components/dashboard/overview/GroupCard";
import { OverviewSection } from "@/components/dashboard/overview/OverviewSection";
import { ShortcutCard } from "@/components/dashboard/overview/ShortcutCard";
import { ToolRowLink } from "@/components/dashboard/overview/ToolRowLink";

const masonryCard = "mb-4 break-inside-avoid";

export function OverviewTools() {
  return (
    <>
      <OverviewSection {...overviewCopy.tools}>
        <div className="grid items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
          {overviewToolColumns.map((column) => (
            <div key={column[0].category} className="flex flex-col gap-4">
              {column.map((group) => (
                <GroupCard key={group.category} title={group.title}>
                  <GroupRows>
                    {group.items.map((item) => (
                      <li key={item.key}>
                        <ToolRowLink href={item.href} iconSrc={item.iconSrc} name={item.name} description={item.description} />
                      </li>
                    ))}
                  </GroupRows>
                </GroupCard>
              ))}
            </div>
          ))}
        </div>
      </OverviewSection>

      <OverviewSection {...overviewCopy.shortcuts}>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          {dashboardShortcutGroups.map((group) => (
            <ShortcutCard key={group.id} group={group} />
          ))}
        </div>
      </OverviewSection>

      <OverviewSection {...overviewCopy.guides}>
        <div className="-mb-4 columns-1 gap-4 md:columns-2 xl:columns-4">
          {dashboardGuideGroups.map((group) => (
            <GroupCard key={group.id} title={group.title} className={masonryCard}>
              <GroupRows>
                {group.links.map((link) => (
                  <li key={link.key}>
                    <ToolRowLink href={link.href} iconSrc={link.iconSrc} name={link.label} compact />
                  </li>
                ))}
              </GroupRows>
            </GroupCard>
          ))}
        </div>
      </OverviewSection>
    </>
  );
}
