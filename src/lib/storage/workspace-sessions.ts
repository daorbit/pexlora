import { workspaceTools, type WorkspaceToolSlug } from "@/config/tools";
import type { SavedQueueItem } from "@/hooks/useFileQueue";
import type { MetadataFields } from "@/lib/image/options";
import { loadSessions, snapshotSessions, updateSession, type SessionSnapshot } from "@/lib/storage/session-store";

const PREFIX = "workspace:";

export type WorkspaceSession = { items: SavedQueueItem[]; metadata?: MetadataFields };

export type RecentResult = {
  id: string;
  sessionKey: string;
  index: number;
  tool: WorkspaceToolSlug;
  name: string;
  blob: Blob;
  savedAt: number;
};

export function workspaceSessionKey(tool: WorkspaceToolSlug, scope?: string) {
  return scope ? `${PREFIX}${tool}:${scope}` : `${PREFIX}${tool}`;
}

function toolOfKey(key: string) {
  const slug = key.slice(PREFIX.length).split(":")[0];
  return workspaceTools.find((tool) => tool.slug === slug)?.slug ?? null;
}

export async function loadRecentResults(): Promise<RecentResult[]> {
  const sessions = await loadSessions<WorkspaceSession>(PREFIX);
  return sessions
    .flatMap(({ key, savedAt, value }) => {
      const tool = toolOfKey(key);
      if (!tool) return [];
      return value.items.flatMap((item, index) =>
        item.status === "done" && item.result
          ? [{ id: `${key}:${index}`, sessionKey: key, index, tool, name: item.result.name, blob: item.result.blob, savedAt }]
          : [],
      );
    })
    .sort((a, b) => b.savedAt - a.savedAt);
}

export async function removeRecentResult({ sessionKey, index }: RecentResult): Promise<SessionSnapshot> {
  const snapshot = (await snapshotSessions(sessionKey)).filter(({ key }) => key === sessionKey);
  await updateSession<WorkspaceSession>(sessionKey, (session) => {
    const items = session.items.filter((_, position) => position !== index);
    return items.length ? { ...session, items } : null;
  });
  return snapshot;
}
