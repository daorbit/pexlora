import { dashboardModules } from "@/config/dashboard";
import { getWorkspaceTool } from "@/config/tools";
import { ToolCard } from "@/components/tools/ToolCard";

export function ModuleGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {dashboardModules.map(({ slug, href }) => {
        const tool = getWorkspaceTool(slug);
        return (
          <ToolCard key={slug} icon={tool.icon} name={tool.name} description={tool.description} href={href} />
        );
      })}
    </div>
  );
}
