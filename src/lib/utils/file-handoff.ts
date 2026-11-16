const pending = new Map<string, unknown>();

export function handOff<T>(target: string, value: T) {
  pending.set(target, value);
}

export function takeHandOff<T>(target: string): T | undefined {
  const value = pending.get(target) as T | undefined;
  pending.delete(target);
  return value;
}

export function handOffFiles(tool: string, files: File[]) {
  handOff(`files:${tool}`, files);
}

export function takeHandedOffFiles(tool: string) {
  return takeHandOff<File[]>(`files:${tool}`) ?? [];
}
