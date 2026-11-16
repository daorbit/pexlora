import { dashboardQuickLinks } from "@/config/dashboard-links";
import { LinkTile } from "@/components/tools/LinkTile";

export function QuickLinks() {
  return (
    <div className="flex flex-col gap-8">
      {dashboardQuickLinks.map((group) => (
        <section key={group.id} className="flex flex-col gap-3">
          <p className="text-xs font-medium text-secondary uppercase">{group.title}</p>
          <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {group.links.map((link) => (
              <li key={link.key}>
                <LinkTile href={link.href} iconSrc={link.iconSrc} label={link.label} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
