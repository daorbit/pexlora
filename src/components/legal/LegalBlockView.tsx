import type { LegalBlock } from "@/content/legal";

const text = "text-[15.5px] leading-relaxed text-secondary";

export function LegalBlockView({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "p":
      return <p className={text}>{block.text}</p>;
    case "list":
      return (
        <ul className={`flex list-disc flex-col gap-2 pl-5 marker:text-tertiary ${text}`}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <div className="flex flex-col gap-1.5 rounded-2xl bg-accent-soft px-5 py-4">
          <p className="text-[15px] font-semibold">{block.title}</p>
          <p className={text}>{block.text}</p>
        </div>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl border border-separator">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="bg-fill">
              <tr>
                {block.columns.map((column) => (
                  <th key={column} scope="col" className="px-4 py-3 font-semibold">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-separator">
              {block.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, index) => (
                    <td key={`${row[0]}-${index}`} className={index === 0 ? "px-4 py-3 font-medium" : "px-4 py-3 text-secondary"}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}
