import { workspaceTools } from "@/config/tools";
import { ToolCard } from "@/components/tools/ToolCard";

export function ToolGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {workspaceTools.map((tool) => (
        <ToolCard key={tool.slug} icon={tool.icon} name={tool.name} description={tool.description} href={tool.href} />
      ))}
    </div>
  );
}
