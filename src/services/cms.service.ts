import "server-only";
import { env } from "@/lib/env";
import type { CmsPage } from "@/lib/blog/types";

type ListResponse = { items: CmsPage[]; total: number; page: number; perPage: number };

type ListOptions = {
  group?: string;
  tag?: string;
  fields?: (keyof CmsPage)[];
  perPage?: number;
};

function workspaceUrl() {
  const { apiUrl, workspaceId } = env.cms;
  return `${apiUrl}/workspaces/${workspaceId}`;
}

async function readJson<T>(res: Response, what: string): Promise<T> {
  const type = res.headers.get("content-type") ?? "";
  if (!type.includes("json")) {
    throw new Error(`CMS ${what}: expected JSON from ${res.url} but got "${type}"`);
  }
  return (await res.json()) as T;
}

export async function listCmsPages({ group, tag, fields, perPage = 100 }: ListOptions): Promise<CmsPage[]> {
  const query = new URLSearchParams({ perPage: String(perPage) });
  if (group) query.set("group", group);
  if (tag) query.set("tag", tag);
  if (fields?.length) query.set("fields", fields.join(","));

  const res = await fetch(`${workspaceUrl()}/pagebyslug?${query}`);
  if (!res.ok) throw new Error(`CMS list failed: ${res.status} ${res.statusText}`);

  return (await readJson<ListResponse>(res, "list")).items;
}

export async function getCmsPage(slug: string): Promise<CmsPage | null> {
  const res = await fetch(`${workspaceUrl()}/page-details/${encodeURIComponent(slug)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`CMS page "${slug}" failed: ${res.status} ${res.statusText}`);

  return readJson<CmsPage>(res, `page "${slug}"`);
}
