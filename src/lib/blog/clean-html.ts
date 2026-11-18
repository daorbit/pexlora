const INLINE_STYLE = /\sstyle\s*=\s*("[^"]*"|'[^']*')/gi;

export function stripInlineStyles(html: string) {
  return html.replace(INLINE_STYLE, "");
}
