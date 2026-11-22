import { Cpu, Laptop, Server, type LucideIcon } from "lucide-react";
import { fileHandlingCopy } from "@/content/file-handling";
import { Badge } from "@/components/ui/Badge";
import { FlowSteps } from "@/components/file-handling/FlowSteps";

type PathId = keyof typeof fileHandlingCopy.paths;

const pathIcons: Record<PathId, LucideIcon> = { device: Laptop, server: Server, ai: Cpu };

const pathOrder: PathId[] = ["device", "server", "ai"];

export function PathCards() {
  return (
    <section aria-labelledby="paths-title" className="flex flex-col gap-4 sm:gap-5">
      <h2 id="paths-title" className="text-[22px] font-semibold tracking-[-0.02em] sm:text-2xl">
        {fileHandlingCopy.pathsTitle}
      </h2>
      <ul className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-3">
        {pathOrder.map((id) => {
          const path = fileHandlingCopy.paths[id];
          const Icon = pathIcons[id];
          return (
            <li key={id} className="flex flex-col gap-4 rounded-3xl border border-separator bg-surface p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-fill">
                  <Icon className="size-5" strokeWidth={2} aria-hidden />
                </span>
                <Badge tone={id === "device" ? "success" : "neutral"}>{path.kept}</Badge>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-semibold tracking-[-0.015em]">{path.title}</h3>
                <p className="text-[14px] leading-relaxed text-secondary sm:text-[15px]">{path.body}</p>
              </div>
              <div className="mt-auto">
                <FlowSteps steps={path.steps} highlight={id === "device"} />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
