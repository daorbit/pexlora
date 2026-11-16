import { dashboardToolGroups } from "@/config/dashboard";
import { HubCard } from "@/components/home/HubCard";

export function ModuleGrid() {
  return (
    <div className="flex flex-col gap-8">
      {dashboardToolGroups.map((group) => (
        <section key={group.category} className="flex flex-col gap-3">
          <p className="text-xs font-medium text-secondary uppercase">{group.title}</p>
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {group.items.map((item) => (
              <li key={item.key}>
                <HubCard item={item} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
