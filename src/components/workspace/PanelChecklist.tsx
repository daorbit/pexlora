import { Check } from "lucide-react";

export function PanelChecklist({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[13px] font-semibold text-secondary">{title}</p>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm">
            <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
