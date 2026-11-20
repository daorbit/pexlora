import "server-only";
import { formatsOfKinds, type FileFormat, type FileKind } from "@/config/file-formats";
import { UTILITY_TEXT_MAX_CHARACTERS, ZIP_MAX_TOTAL_MB } from "@/config/limits";
import { getWorkspaceTool, type WorkspaceToolSlug } from "@/config/tools";
import type { UtilityToolSlug } from "@/config/utility-tools";
import { toolFactsCopy, type FactRow } from "@/content/facts";
import { toolBehaviors } from "@/components/workspace/toolBehaviors";
import { runsInBrowser, sizeLimitMb } from "@/lib/files/detect";
import { formatMegabytes } from "@/lib/utils/format-bytes";

const labelsOf = (formats: FileFormat[]) => [...new Set(formats.map((format) => format.label))];

function sizeGroups(formats: FileFormat[], localCapable: boolean) {
  const groups = new Map<number, FileFormat[]>();
  for (const format of formats) {
    const limit = sizeLimitMb(format, localCapable);
    groups.set(limit, [...(groups.get(limit) ?? []), format]);
  }
  return [...groups.entries()]
    .sort(([a], [b]) => b - a)
    .map(([limit, group]) => ({ limit: formatMegabytes(limit), labels: labelsOf(group) }));
}

export function workspaceToolFacts(slug: WorkspaceToolSlug, kinds?: FileKind[]): FactRow[] {
  const behavior = toolBehaviors[slug];
  const formats = formatsOfKinds(kinds ?? behavior.accepts, behavior.localCapable, behavior.formats);
  const groups = sizeGroups(formats, behavior.localCapable);
  const isAi = getWorkspaceTool(slug).category === "ai";
  const browser = formats.filter((format) => runsInBrowser(format, behavior.localCapable));
  const server = formats.filter((format) => !runsInBrowser(format, behavior.localCapable));

  return [
    isAi ? toolFactsCopy.aiLimit : toolFactsCopy.price,
    toolFactsCopy.formats(labelsOf(formats)),
    toolFactsCopy.sizeLimit(groups, groups.length === 1),
    isAi ? toolFactsCopy.aiProcessing : toolFactsCopy.processing(labelsOf(browser), labelsOf(server)),
    toolFactsCopy.batch,
    toolFactsCopy.saved,
  ];
}

export function textToolFacts(): FactRow[] {
  return [toolFactsCopy.aiLimit, toolFactsCopy.textInput, toolFactsCopy.textProcessing, toolFactsCopy.aiBudget];
}

const utilityLimits: Record<UtilityToolSlug, FactRow> = {
  "link-cleaner": toolFactsCopy.textLimit(UTILITY_TEXT_MAX_CHARACTERS),
  "remove-personal-info": toolFactsCopy.textLimit(UTILITY_TEXT_MAX_CHARACTERS),
  "zip-files": toolFactsCopy.zipLimit(ZIP_MAX_TOTAL_MB),
};

export function utilityToolFacts(slug: UtilityToolSlug): FactRow[] {
  return [toolFactsCopy.utilityPrice, toolFactsCopy.utilityProcessing, utilityLimits[slug]];
}
