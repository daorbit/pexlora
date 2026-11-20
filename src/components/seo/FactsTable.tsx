import type { FactRow } from "@/content/facts";

export function FactsTable({ caption, rows }: { caption: string; rows: FactRow[] }) {
  return (
    <table className="w-full min-w-0 overflow-hidden rounded-2xl border border-separator bg-surface text-left">
      <caption className="sr-only">{caption}</caption>
      <tbody>
        {rows.map((row) => (
          <tr
            key={row.label}
            className="flex flex-col gap-1 border-b border-separator px-4 py-3.5 last:border-b-0 sm:table-row sm:p-0"
          >
            <th scope="row" className="text-[13px] font-semibold sm:w-48 sm:px-6 sm:py-4.5 sm:align-top sm:text-[15px]">
              {row.label}
            </th>
            <td className="text-[14px] leading-relaxed text-secondary sm:py-4.5 sm:pr-6 sm:text-[15px]">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
