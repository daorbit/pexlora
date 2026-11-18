import { textToolCopy } from "@/content/ai";

export function DetectorReasons({ signals }: { signals: string[] }) {
  if (!signals.length) return null;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-semibold">{textToolCopy.signals}</p>
      <ol className="flex flex-col gap-2">
        {signals.map((signal, index) => (
          <li key={signal} className="flex gap-3 text-[14px] leading-relaxed text-secondary">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-fill text-[11px] font-semibold text-foreground tabular-nums">
              {index + 1}
            </span>
            {signal}
          </li>
        ))}
      </ol>
    </div>
  );
}
