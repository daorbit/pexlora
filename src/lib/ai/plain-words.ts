import type { HumanizeTone } from "@/lib/ai/types";

const replacements: [RegExp, string][] = [
  [/\bit(?: is|'s) (?:important|worth|crucial|essential) to (?:note|mention|remember) that\s*/gi, ""],
  [/\bin today's (?:fast-paced|digital|modern|ever-changing) (?:world|landscape|age|era),?\s*/gi, ""],
  [/\bin conclusion,\s*/gi, "So, "],
  [/\bin summary,\s*/gi, "In short, "],
  [/\bmoreover,\s*/gi, "Also, "],
  [/\bfurthermore,\s*/gi, "Plus, "],
  [/\badditionally,\s*/gi, "Also, "],
  [/\bultimately,\s*/gi, ""],
  [/\bleveraging\b/gi, "using"],
  [/\bleverages\b/gi, "uses"],
  [/\bleverage\b/gi, "use"],
  [/\butilizing\b/gi, "using"],
  [/\butilizes\b/gi, "uses"],
  [/\butilize\b/gi, "use"],
  [/\bdelves? into\b/gi, "looks at"],
  [/\bdelving into\b/gi, "looking at"],
  [/\ba (?:myriad|plethora) of\b/gi, "many"],
  [/\bseamlessly\b/gi, "smoothly"],
  [/\bseamless\b/gi, "smooth"],
  [/\bplays? a (?:crucial|pivotal|vital|key) role in\b/gi, "matters a lot for"],
  [/\bever-evolving\b/gi, "changing"],
  [/\bnavigate the complexities of\b/gi, "deal with"],
  [/\bembark on\b/gi, "start"],
  [/\bharness the power of\b/gi, "use"],
  [/\bunlock (?:the|their|your|its) full potential\b/gi, "do their best work"],
  [/\bis a testament to\b/gi, "shows"],
  [/\bin the realm of\b/gi, "in"],
  [/\bcutting-edge\b/gi, "modern"],
  [/\bparamount\b/gi, "key"],
  [/\bpivotal\b/gi, "key"],
  [/\bunderscores\b/gi, "shows"],
  [/\bshowcasing\b/gi, "showing"],
  [/\bfosters?\b/gi, "builds"],
  [/\bfostering\b/gi, "building"],
  [/\s*—\s*/g, " - "],
];

const contractions: [RegExp, string][] = [
  [/\bdo not\b/gi, "don't"],
  [/\bdoes not\b/gi, "doesn't"],
  [/\bdid not\b/gi, "didn't"],
  [/\bis not\b/gi, "isn't"],
  [/\bare not\b/gi, "aren't"],
  [/\bwas not\b/gi, "wasn't"],
  [/\bwere not\b/gi, "weren't"],
  [/\bcannot\b/gi, "can't"],
  [/\bwill not\b/gi, "won't"],
  [/\bwould not\b/gi, "wouldn't"],
  [/\bshould not\b/gi, "shouldn't"],
  [/\bcould not\b/gi, "couldn't"],
  [/\bhave not\b/gi, "haven't"],
  [/\bhas not\b/gi, "hasn't"],
  [/\bit is (?=[a-z])/gi, "it's "],
  [/\bthat is (?=[a-z])/gi, "that's "],
  [/\bthere is (?=[a-z])/gi, "there's "],
  [/\byou are (?=[a-z])/gi, "you're "],
  [/\bwe are (?=[a-z])/gi, "we're "],
  [/\bthey are (?=[a-z])/gi, "they're "],
  [/\bI am\b/g, "I'm"],
];

const contractedTones: HumanizeTone[] = ["natural", "casual", "simple"];

function keepCase(original: string, replacement: string) {
  if (!replacement || original[0] !== original[0].toUpperCase()) return replacement;
  return replacement[0].toUpperCase() + replacement.slice(1);
}

function applyAll(text: string, rules: [RegExp, string][]) {
  return rules.reduce((current, [pattern, value]) => current.replace(pattern, (match) => keepCase(match, value)), text);
}

function capitaliseSentences(text: string) {
  return text.replace(/(^|[.!?]\s+|\n\s*)([a-z])/g, (_, start: string, letter: string) => start + letter.toUpperCase());
}

export function plainWords(text: string, tone: HumanizeTone = "natural") {
  const plain = applyAll(text, replacements);
  const relaxed = contractedTones.includes(tone) ? applyAll(plain, contractions) : plain;
  return capitaliseSentences(relaxed.replace(/[ \t]{2,}/g, " ").replace(/ +([,.!?;:])/g, "$1"));
}
