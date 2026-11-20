import type { WorkspaceToolSlug } from "@/config/tools";

export const toolKeywords: Partial<Record<WorkspaceToolSlug, string[]>> = {
  "remove-metadata": [
    "photo se location kaise hataye",
    "photo ka metadata kaise hataye",
    "photo se gps location remove kaise kare",
    "फोटो से लोकेशन कैसे हटाएं",
  ],
  "view-metadata": [
    "photo kab kheechi gayi kaise pata kare",
    "photo kahan kheechi gayi kaise pata kare",
    "photo ki details kaise dekhe",
    "फोटो की लोकेशन कैसे पता करें",
  ],
  "compress-image": [
    "photo ka size kaise kam kare",
    "photo ka size kam karne wala app",
    "image ka size kam kaise kare",
    "photo ka mb kam kaise kare",
    "फोटो का साइज कैसे कम करें",
  ],
  "resize-image": [
    "photo resize kaise kare",
    "photo ki height width kaise badle",
    "फोटो का साइज कैसे बदलें",
  ],
  "form-photo": [
    "form ke liye photo ka size kaise kam kare",
    "photo aur signature ka size kam kaise kare",
    "signature ka size kaise kam kare",
    "online form ke liye photo resize",
    "फॉर्म के लिए फोटो का साइज कैसे कम करें",
  ],
  "passport-photo": [
    "passport size photo kaise banaye",
    "mobile se passport size photo kaise banaye",
    "passport size photo print kaise kare",
    "पासपोर्ट साइज फोटो कैसे बनाएं",
  ],
  "heic-to-jpg": ["iphone photo ko jpg kaise banaye", "heic file kaise khole"],
  "jpg-to-pdf": [
    "photo ko pdf kaise banaye",
    "photo ko pdf me kaise convert kare",
    "फोटो को पीडीएफ कैसे बनाएं",
  ],
  "merge-pdf": ["pdf ko ek sath kaise jode", "do pdf ko ek kaise kare", "पीडीएफ जोड़ें"],
  "split-pdf": ["pdf se page kaise alag kare", "pdf ke pages alag kaise kare"],
  "pdf-to-jpg": ["pdf ko photo kaise banaye", "pdf ko jpg me kaise convert kare"],
  "pdf-to-word": ["pdf ko word me kaise convert kare", "pdf ko edit kaise kare"],
  "word-to-pdf": ["word file ko pdf kaise banaye"],
  "crop-image": ["photo crop kaise kare", "photo ko square kaise banaye"],
  "change-dpi": ["photo ka dpi kaise badle", "photo ko 300 dpi kaise kare"],
  "rotate-image": ["photo ko seedha kaise kare", "photo rotate kaise kare"],
  "organize-pdf": ["pdf se page kaise delete kare", "pdf ke pages ka order kaise badle"],
};

export const compressTargetLocalKeywords = (size: string, slug: string) => [
  `photo ka size ${size} kaise kare`,
  `photo ko ${size} me kaise kare`,
  `photo ko ${slug} me convert kare`,
  `photo ${slug} converter`,
  `image size kam kare ${slug}`,
  `${slug} photo kaise banaye`,
  `फोटो का साइज ${size} कैसे करें`,
  `फोटो को ${size} में कैसे करें`,
  `फोटो ${size} कन्वर्टर`,
  `इमेज का साइज ${size} करें`,
  `फोटो का साइज कम करें ${size}`,
  `${size} फोटो कैसे बनाएं`,
];

export const formPresetLocalKeywords = (presetName: string) => [
  `${presetName.toLowerCase()} ka size kaise kam kare`,
  `${presetName.toLowerCase()} resize kaise kare`,
];
