import { Fragment } from "react";
import { pricingCopy } from "@/content/pricing";
import { cn } from "@/lib/utils/cn";
import { CompareValue } from "@/components/pricing/CompareValue";

const columns = pricingCopy.compareColumns;
const proIndex = columns.length - 1;

const cellClass = (index: number) =>
  cn("px-2 py-3.5 text-center tabular-nums sm:px-4 sm:py-4", index === proIndex && "bg-accent-soft font-semibold");

export function PricingCompare() {
  return (
    <div className="overflow-hidden rounded-3xl bg-surface shadow-card">
      <table className="w-full table-fixed text-left text-[13px] sm:text-sm">
        <thead>
          <tr>
            <th scope="col" className="w-[37%] px-4 py-4 sm:w-[43%] sm:px-6">
              <span className="sr-only">{pricingCopy.compareTitle}</span>
            </th>
            {columns.map((column, index) => (
              <th
                key={column.label}
                scope="col"
                className={cn(
                  "w-[21%] px-2 py-4 text-center text-[12px] font-semibold sm:w-[19%] sm:px-4 sm:text-sm",
                  index === proIndex && "bg-accent-soft text-accent-text",
                )}
              >
                <span className="sm:hidden">{column.short}</span>
                <span className="hidden sm:inline">{column.label}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pricingCopy.compareGroups.map((group) => (
            <Fragment key={group.title}>
              <tr className="border-t border-separator">
                <th
                  scope="colgroup"
                  colSpan={proIndex + 1}
                  className="px-4 pt-5 pb-2 text-[11px] font-semibold tracking-[0.08em] text-tertiary uppercase sm:px-6"
                >
                  {group.title}
                </th>
                <td className="bg-accent-soft" aria-hidden />
              </tr>
              {group.rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="px-4 py-3.5 font-medium text-secondary sm:px-6 sm:py-4">
                    {row.label}
                  </th>
                  {row.values.map((value, index) => (
                    <td key={index} className={cellClass(index)}>
                      <span className="inline-flex justify-center">
                        <CompareValue value={value} pro={index === proIndex} />
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
