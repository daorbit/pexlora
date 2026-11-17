export function movePage(pages: number[], index: number, offset: number) {
  const target = index + offset;
  if (target < 0 || target >= pages.length) return pages;
  const next = [...pages];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

export function removePageAt(pages: number[], index: number) {
  return pages.filter((_, position) => position !== index);
}

export function restorePage(pages: number[], page: number) {
  const before = pages.findIndex((kept) => kept > page);
  return before === -1 ? [...pages, page] : [...pages.slice(0, before), page, ...pages.slice(before)];
}

export function missingPages(pages: number[], count: number) {
  const kept = new Set(pages);
  return Array.from({ length: count }, (_, index) => index + 1).filter((page) => !kept.has(page));
}
