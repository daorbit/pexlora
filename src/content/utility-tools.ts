import type { UtilityToolSlug } from "@/config/utility-tools";
import { ZIP_MAX_TOTAL_MB } from "@/config/limits";
import type { MaskStyle, PiiKind } from "@/lib/utility/pii-redact";

type Faq = { question: string; answer: string };

export const utilityTitles: Record<UtilityToolSlug, string> = {
  "link-cleaner": "Link Cleaner: Remove Tracking from URLs Free",
  "remove-personal-info": "Remove Personal Info from Text Free",
  "zip-files": "ZIP & Unzip Files Online Free",
};

export const utilityShortLabels: Record<UtilityToolSlug, string> = {
  "link-cleaner": "Links",
  "remove-personal-info": "Redact",
  "zip-files": "ZIP",
};

export const linkCleanerCopy = {
  input: "Links or message",
  output: "Clean links",
  sample:
    "Look at this: https://www.youtube.com/watch?v=dQw4w9WgXcQ&si=Kp3aB7xYz_12&feature=shared and this deal https://www.amazon.in/dp/B0CHX1W1XY/ref=sr_1_3?tag=deals-21&psc=1&qid=1716892",
  empty: "Paste a link or a whole message. Tracking is removed as you type.",
  noLinks: "No links found in this text.",
  summary: (removed: number, links: number) =>
    removed ? `Removed ${removed} tracker${removed === 1 ? "" : "s"} from ${links} link${links === 1 ? "" : "s"}` : `${links} link${links === 1 ? " is" : "s are"} already clean`,
  removedLabel: "Removed",
  unwrapped: "redirect",
  shareTitle: "Clean link",
};

export const piiCopy = {
  input: "Text",
  output: "Safe to share",
  sample:
    "Hi, it's Aarav. Mail me at aarav.sharma@gmail.com or call +91 98765 43210. Pay to aarav@okaxis. My PAN is ABCPE1234F and the card ending is 4111 1111 1111 1111. Server IP 192.168.1.20.",
  empty: "Paste text with emails, phone numbers or IDs. They're hidden as you type.",
  nothingFound: "Nothing to hide was found.",
  found: (count: number) => `Hid ${count} item${count === 1 ? "" : "s"}`,
  hide: "Hide",
  style: "Style",
  styleLabel: "Masking style",
  styles: {
    partial: { label: "Partial", hint: "98•••••210" },
    label: { label: "Labels", hint: "[PHONE]" },
  } satisfies Record<MaskStyle, { label: string; hint: string }>,
  kinds: {
    email: "Emails",
    phone: "Phone numbers",
    card: "Card numbers",
    aadhaar: "Aadhaar",
    pan: "PAN",
    upi: "UPI IDs",
    ip: "IP addresses",
  } satisfies Record<PiiKind, string>,
  labels: {
    email: "EMAIL",
    phone: "PHONE",
    card: "CARD",
    aadhaar: "AADHAAR",
    pan: "PAN",
    upi: "UPI",
    ip: "IP",
  } satisfies Record<PiiKind, string>,
  note: "Detection uses patterns, so check the result before you share. Names and street addresses aren't detected.",
  shareTitle: "Redacted text",
};

export const zipCopy = {
  modes: { create: "Create ZIP", extract: "Unzip" },
  modeLabel: "ZIP mode",
  create: {
    title: "Drop files or click to browse",
    mobileTitle: "Tap to add files",
    formats: `Any file type · up to ${ZIP_MAX_TOTAL_MB} MB in total`,
    note: "Files are zipped in your browser and never uploaded.",
    nameLabel: "ZIP name",
    namePlaceholder: "files",
    action: "Create ZIP",
    working: "Zipping…",
    done: (count: number) => `ZIP with ${count} file${count === 1 ? "" : "s"} saved`,
  },
  extract: {
    title: "Drop a ZIP file or click to browse",
    mobileTitle: "Tap to add a ZIP",
    formats: `ZIP · up to ${ZIP_MAX_TOTAL_MB} MB`,
    note: "The ZIP is opened in your browser and never uploaded.",
    working: "Opening ZIP…",
    saveAll: "Save All",
    save: (name: string) => `Save ${name}`,
    notZip: "That isn't a ZIP file. Pick a file ending in .zip.",
    unreadable: "This ZIP couldn't be opened. It may be damaged or password protected.",
    empty: "This ZIP is empty.",
  },
  files: (count: number, size: string) => `${count} file${count === 1 ? "" : "s"} · ${size}`,
  remove: (name: string) => `Remove ${name}`,
  clear: "Clear",
  tooLarge: `Files are over ${ZIP_MAX_TOTAL_MB} MB in total. Remove some and try again.`,
};

const inBrowser: Faq = {
  question: "Is my data uploaded?",
  answer: "No. Everything runs in your browser, so the text and files you add never leave your device.",
};

export const utilityFaqs: Record<UtilityToolSlug, Faq[]> = {
  "link-cleaner": [
    {
      question: "What does the link cleaner remove?",
      answer:
        "Tracking parameters such as utm_source, fbclid, gclid and msclkid, YouTube and Spotify share codes (si), X and LinkedIn tracking, and Amazon and Flipkart referral tags. Google, Facebook, Instagram and YouTube redirect links are unwrapped to the real address.",
    },
    {
      question: "Will the cleaned link still work?",
      answer:
        "Yes. Only tracking is removed; parts that choose the page, video, product or variant stay. If a site ever breaks, compare it with the original, which you can still copy from your input.",
    },
    {
      question: "Why remove tracking from links?",
      answer:
        "Share codes can tie a link back to your account, and campaign tags tell sites where the click came from. Clean links are shorter and don't pass that along to the person you send them to.",
    },
    inBrowser,
  ],
  "remove-personal-info": [
    {
      question: "What personal info is detected?",
      answer: "Emails, phone numbers, card numbers (checked with the Luhn rule), Aadhaar numbers (checked with their checksum), PAN, UPI IDs and IPv4 addresses.",
    },
    {
      question: "Does it find names and addresses?",
      answer: "No. Names and street addresses have no fixed pattern, so read the result and remove them yourself before sharing.",
    },
    {
      question: "Partial or labels?",
      answer:
        "Partial keeps a few characters (a•••@g•••.com, ••••••3210) so the reader can still tell items apart. Labels replace each item with a tag like [PHONE], which is better for logs and support tickets.",
    },
    inBrowser,
  ],
  "zip-files": [
    {
      question: "Can I zip any type of file?",
      answer: `Yes. Photos, documents, videos or anything else, up to ${ZIP_MAX_TOTAL_MB} MB in total. Files with the same name are renamed so nothing is overwritten.`,
    },
    {
      question: "Can I open password-protected ZIP files?",
      answer: "Not yet. Encrypted ZIPs can't be opened here; use your computer's built-in tool or an app like 7-Zip.",
    },
    {
      question: "How do I unzip on an iPhone?",
      answer: "Choose Unzip, add the ZIP and tap Save All. Photos and videos go through the share sheet so you can save them to Photos.",
    },
    inBrowser,
  ],
};

export const utilityRelatedGuides: Record<UtilityToolSlug, string[]> = {
  "link-cleaner": ["remove-exif-data", "remove-gps-from-photo", "remove-location-from-iphone-photos", "exif-viewer"],
  "remove-personal-info": ["remove-exif-data", "remove-gps-from-photo", "remove-location-from-iphone-photos", "exif-viewer"],
  "zip-files": ["remove-exif-data", "remove-gps-from-photo", "exif-viewer", "remove-location-from-iphone-photos"],
};
