const replacements: [RegExp, string][] = [
  [/\bit is important to note that\s*/gi, ""],
  [/\bit's important to note that\s*/gi, ""],
  [/\bin conclusion,\s*/gi, ""],
  [/\bmoreover,\s*/gi, "Also, "],
  [/\bfurthermore,\s*/gi, "Plus, "],
  [/\badditionally,\s*/gi, "Also, "],
  [/\bleveraging\b/gi, "using"],
  [/\bleverage\b/gi, "use"],
  [/\butilizing\b/gi, "using"],
  [/\butilize\b/gi, "use"],
  [/\bdelve into\b/gi, "look at"],
  [/\ba myriad of\b/gi, "many"],
  [/\bseamlessly\b/gi, "smoothly"],
  [/\bplays a crucial role in\b/gi, "matters for"],
  [/\bever-evolving\b/gi, "changing"],
  [/\bin today's fast-paced world,?\s*/gi, ""],
];

function capitaliseSentences(text: string) {
  return text.replace(/(^|[.!?]\s+)([a-z])/g, (_, start: string, letter: string) => start + letter.toUpperCase());
}

export function plainWords(text: string) {
  const replaced = replacements.reduce((current, [pattern, value]) => current.replace(pattern, value), text);
  return capitaliseSentences(replaced.replace(/ {2,}/g, " "));
}
