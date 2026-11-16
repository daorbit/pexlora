import { pricingCopy } from "@/content/pricing";
import { cn } from "@/lib/utils/cn";

export function PricingCompare() {
  const [first, ...rest] = pricingCopy.compareColumns;

  return (
    <div className="overflow-x-auto rounded-3xl border border-separator bg-surface">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead>
          <tr className="border-b border-separator">
            <th scope="col" className="px-5 py-4 font-semibold">
              <span className="sr-only">{first}</span>
            </th>
            {rest.map((column, index) => (
              <th key={column} scope="col" className={cn("px-5 py-4 font-semibold", index === rest.length - 1 && "text-accent-text")}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pricingCopy.compareRows.map(([label, ...values]) => (
            <tr key={label} className="border-b border-separator last:border-0">
              <th scope="row" className="px-5 py-4 font-medium text-secondary">
                {label}
              </th>
              {values.map((value, index) => (
                <td key={index} className={cn("px-5 py-4 tabular-nums", index === values.length - 1 && "font-semibold")}>
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
