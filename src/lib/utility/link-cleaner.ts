const URL_PATTERN = /https?:\/\/[^\s<>"'`]+/gi;
const TRAILING_PUNCTUATION = /[.,;:!?)\]}>]+$/;

const TRACKING_PARAMS = new Set([
  "fbclid",
  "gclid",
  "gclsrc",
  "dclid",
  "gbraid",
  "wbraid",
  "msclkid",
  "yclid",
  "twclid",
  "ttclid",
  "li_fat_id",
  "mc_cid",
  "mc_eid",
  "igshid",
  "igsh",
  "_hsenc",
  "_hsmi",
  "hsctatracking",
  "mkt_tok",
  "vero_id",
  "vero_conv",
  "_openstat",
  "rb_clickid",
  "s_cid",
  "wickedid",
  "ref_src",
  "ref_url",
  "spm",
  "scm",
  "mibextid",
  "rdid",
  "share_id",
  "srsltid",
  "sca_esv",
  "ved",
  "ei",
  "gs_lcrp",
  "sxsrf",
  "aqs",
  "oq",
  "uact",
  "iflsig",
]);

const TRACKING_PREFIXES = ["utm_", "pk_", "mtm_", "hsa_", "oly_", "pd_rd_", "pf_rd_", "affext"];

type HostRule = { hosts: RegExp; params: string[]; path?: RegExp };

const HOST_RULES: HostRule[] = [
  { hosts: /(^|\.)(youtube\.com|youtu\.be)$/, params: ["si", "feature", "pp"] },
  { hosts: /(^|\.)spotify\.com$/, params: ["si", "nd", "context"] },
  { hosts: /(^|\.)(twitter\.com|x\.com)$/, params: ["s", "t"] },
  { hosts: /(^|\.)instagram\.com$/, params: ["img_index"] },
  { hosts: /(^|\.)linkedin\.com$/, params: ["trk", "trackingid", "lipi", "rcm"] },
  { hosts: /(^|\.)tiktok\.com$/, params: ["is_from_webapp", "sender_device", "_r", "_t", "u_code", "preview_pb", "share_app_id", "share_link_id", "timestamp", "user_id", "sec_user_id", "utm_campaign"] },
  { hosts: /(^|\.)flipkart\.com$/, params: ["affid", "lid", "marketplace", "store", "srno", "otracker", "iid", "ssid", "qh", "fm", "ppt", "ppn"] },
  {
    hosts: /(^|\.)amazon\.[a-z.]+$/,
    params: ["tag", "ref", "ref_", "linkcode", "linkid", "camp", "creative", "creativeasin", "ascsubtag", "qid", "sr", "crid", "sprefix", "dib", "dib_tag", "content-id", "social_share", "starsleft", "skiptwisterog"],
    path: /\/ref=[^/]*/,
  },
];

const REDIRECTS: { hosts: RegExp; path: RegExp; param: string }[] = [
  { hosts: /(^|\.)google\.[a-z.]+$/, path: /^\/url$/, param: "q" },
  { hosts: /(^|\.)google\.[a-z.]+$/, path: /^\/url$/, param: "url" },
  { hosts: /^(l|lm)\.facebook\.com$/, path: /^\/l\.php$/, param: "u" },
  { hosts: /^l\.instagram\.com$/, path: /^\/$/, param: "u" },
  { hosts: /(^|\.)youtube\.com$/, path: /^\/redirect$/, param: "q" },
];

export type CleanedLink = { original: string; cleaned: string; removed: string[]; unwrapped: boolean };
export type LinkCleanResult = { text: string; links: CleanedLink[]; removedCount: number };

function isTracking(key: string, rule?: HostRule) {
  const lower = key.toLowerCase();
  if (TRACKING_PARAMS.has(lower) || TRACKING_PREFIXES.some((prefix) => lower.startsWith(prefix))) return true;
  return rule?.params.some((param) => param.toLowerCase() === lower) ?? false;
}

function unwrap(url: URL) {
  const redirect = REDIRECTS.find((entry) => entry.hosts.test(url.hostname) && entry.path.test(url.pathname) && url.searchParams.get(entry.param));
  const target = redirect && url.searchParams.get(redirect.param);
  if (!target || !/^https?:\/\//i.test(target)) return null;
  try {
    return new URL(target);
  } catch {
    return null;
  }
}

export function cleanUrl(input: string): CleanedLink {
  let url: URL;
  try {
    url = new URL(input);
  } catch {
    return { original: input, cleaned: input, removed: [], unwrapped: false };
  }

  const target = unwrap(url);
  const unwrapped = Boolean(target);
  if (target) url = target;

  const rule = HOST_RULES.find((entry) => entry.hosts.test(url.hostname));
  const removed = [...url.searchParams.keys()].filter((key) => isTracking(key, rule));
  removed.forEach((key) => url.searchParams.delete(key));
  if (rule?.path && rule.path.test(url.pathname)) {
    url.pathname = url.pathname.replace(rule.path, "");
    removed.push("ref");
  }

  const cleaned = url.toString().replace(/\?$/, "").replace(/\?#/, "#");
  return { original: input, cleaned, removed: [...new Set(removed)], unwrapped };
}

export function cleanLinks(text: string): LinkCleanResult {
  const links: CleanedLink[] = [];
  const output = text.replace(URL_PATTERN, (match) => {
    const trailing = match.match(TRAILING_PUNCTUATION)?.[0] ?? "";
    const link = cleanUrl(trailing ? match.slice(0, -trailing.length) : match);
    links.push(link);
    return link.cleaned + trailing;
  });
  return {
    text: output,
    links,
    removedCount: links.reduce((total, link) => total + link.removed.length + (link.unwrapped ? 1 : 0), 0),
  };
}
