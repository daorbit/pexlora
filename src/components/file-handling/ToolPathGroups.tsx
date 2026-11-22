import Link from "next/link";
import { fileHandlingCopy, type HandlingPath } from "@/content/file-handling";
import { toolsByPath } from "@/lib/file-handling/tool-paths";
import { HubItemIcon } from "@/components/tools/HubItemIcon";

const groupOrder: HandlingPath[] = ["device", "mixed", "server", "ai"];

export function ToolPathGroups() {
  const groups = toolsByPath();

  return (
    <section aria-labelledby="tools-title" className="flex flex-col gap-5 sm:gap-6">
      <div className="flex flex-col gap-2">
        <h2 id="tools-title" className="text-[22px] font-semibold tracking-[-0.02em] sm:text-2xl">
          {fileHandlingCopy.toolsTitle}
        </h2>
        <p className="text-[15px] leading-relaxed text-secondary sm:text-base">{fileHandlingCopy.toolsLead}</p>
      </div>
      {groupOrder.map((id) =>
        groups[id].length ? (
          <div key={id} className="flex flex-col gap-3">
            <h3 className="flex items-center gap-2 text-[15px] font-semibold">
              {fileHandlingCopy.groups[id]}
              <span className="text-[13px] font-medium text-tertiary">{groups[id].length}</span>
            </h3>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {groups[id].map((tool) => (
                <li key={tool.key}>
                  <Link
                    href={tool.href}
                    className="group flex h-full items-start gap-3 rounded-2xl border border-separator bg-surface p-3 transition-colors hover:border-border-strong focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    <HubItemIcon src={tool.iconSrc} size="xs" />
                    <span className="flex min-w-0 flex-col gap-0.5 pt-1">
                      <span className="text-sm font-semibold">{tool.name}</span>
                      {tool.note && <span className="text-[12.5px] leading-snug text-secondary">{tool.note}</span>}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null,
      )}
    </section>
  );
}
