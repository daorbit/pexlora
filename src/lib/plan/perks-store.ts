import { FREE_PERKS, perksFor, type WorkspacePerks } from "@/lib/plan/perks";

let current: WorkspacePerks = FREE_PERKS;
const listeners = new Set<() => void>();

export function setWorkspacePro(pro: boolean) {
  const next = perksFor(pro);
  if (next === current) return;
  current = next;
  listeners.forEach((listener) => listener());
}

export function subscribePerks(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getPerks() {
  return current;
}

export function getServerPerks() {
  return FREE_PERKS;
}
