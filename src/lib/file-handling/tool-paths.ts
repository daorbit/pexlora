import { toolBehaviors } from "@/components/workspace/toolBehaviors";
import { textToolIconSrc, textTools } from "@/config/text-tools";
import { toolIconSrc, workspaceTools, type WorkspaceTool } from "@/config/tools";
import { utilityToolIconSrc, utilityTools } from "@/config/utility-tools";
import { fileHandlingCopy, type HandlingPath } from "@/content/file-handling";

export type HandledTool = { key: string; name: string; href: string; iconSrc: string; note?: string };

const mixedNotes: Partial<Record<string, string>> = fileHandlingCopy.mixedNotes;

export function pathOf(tool: WorkspaceTool): HandlingPath {
  if (tool.category === "ai") return "ai";
  if (mixedNotes[tool.slug]) return "mixed";
  return toolBehaviors[tool.slug].localCapable ? "device" : "server";
}

export function toolsByPath(): Record<HandlingPath, HandledTool[]> {
  const groups: Record<HandlingPath, HandledTool[]> = { device: [], mixed: [], server: [], ai: [] };

  for (const tool of workspaceTools) {
    groups[pathOf(tool)].push({
      key: tool.slug,
      name: tool.name,
      href: tool.href,
      iconSrc: toolIconSrc(tool.slug),
      note: mixedNotes[tool.slug],
    });
  }
  for (const tool of utilityTools) {
    groups.device.push({ key: tool.slug, name: tool.name, href: tool.href, iconSrc: utilityToolIconSrc(tool.slug) });
  }
  for (const tool of textTools) {
    groups.ai.push({ key: tool.slug, name: tool.name, href: tool.href, iconSrc: textToolIconSrc(tool.slug) });
  }

  return groups;
}
