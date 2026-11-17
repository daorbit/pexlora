export function HistoryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-0 flex-col gap-0.5 rounded-xl bg-fill px-3 py-2.5">
      <dt className="text-[11.5px] text-secondary">{label}</dt>
      <dd className="truncate text-[17px] font-semibold tracking-[-0.02em] tabular-nums">{value}</dd>
    </div>
  );
}
