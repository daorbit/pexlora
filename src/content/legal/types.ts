export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; title: string; text: string }
  | { type: "table"; columns: string[]; rows: string[][] };

export type LegalSection = { id: string; heading: string; blocks: LegalBlock[] };

export type LegalHighlight = { title: string; body: string };

export type LegalDocument = {
  slug: "privacy" | "terms" | "cookies" | "security" | "refunds";
  path: string;
  navLabel: string;
  title: string;
  metaTitle: string;
  description: string;
  lead: string;
  highlights: LegalHighlight[];
  sections: LegalSection[];
};
