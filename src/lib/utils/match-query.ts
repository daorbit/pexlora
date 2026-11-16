export function matchesQuery(query: string, fields: (string | readonly string[])[]) {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return fields.flat().join(" ").toLowerCase().includes(needle);
}
