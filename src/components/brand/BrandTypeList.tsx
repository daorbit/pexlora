import { brandKitCopy } from "@/content/brand-kit";
import { cn } from "@/lib/utils/cn";

export function BrandTypeList() {
  return (
    <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
      {brandKitCopy.type.map((item) => (
        <div key={item.label} className="flex flex-col gap-2 rounded-3xl border border-separator bg-surface p-5 sm:p-6">
          <dt className="text-[13px] text-secondary">{item.label}</dt>
          <dd className={cn("text-[22px] font-semibold sm:text-2xl", item.mono ? "font-mono" : "tracking-[-0.02em]")}>
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
