import { Card } from "@/components/ui/Card";

export function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <Card className="flex min-w-0 flex-col gap-1 rounded-[22px] p-4 sm:gap-1.5 sm:rounded-2xl sm:p-5">
      <dt className="text-[12.5px] text-secondary sm:text-[13px]">{label}</dt>
      <dd className="truncate text-[22px] leading-tight font-semibold tracking-[-0.02em] tabular-nums sm:text-[26px]">{value}</dd>
    </Card>
  );
}
