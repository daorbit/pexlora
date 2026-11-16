export const UPSELLS = ["account", "pro"] as const;
export type Upsell = (typeof UPSELLS)[number] | null;

export function parseUpsell(value: unknown): Upsell {
  return UPSELLS.includes(value as (typeof UPSELLS)[number]) ? (value as Upsell) : null;
}
