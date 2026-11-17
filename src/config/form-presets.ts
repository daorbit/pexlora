import { routes } from "@/config/site";
import type { FormPhotoOptions } from "@/lib/image/options";

export type FormPresetKind = "photo" | "signature" | "thumb" | "declaration";

export type FormPreset = FormPhotoOptions & {
  slug: string;
  name: string;
  exam: string;
  kind: FormPresetKind;
  maxKb: number;
};

export const formPresets: FormPreset[] = [
  { slug: "ibps-photo", name: "IBPS Photo", exam: "IBPS PO, Clerk and RRB", kind: "photo", width: 200, height: 230, minKb: 20, maxKb: 50 },
  { slug: "ibps-signature", name: "IBPS Signature", exam: "IBPS PO, Clerk and RRB", kind: "signature", width: 140, height: 60, minKb: 10, maxKb: 20 },
  { slug: "ibps-thumb-impression", name: "IBPS Thumb Impression", exam: "IBPS PO, Clerk and RRB", kind: "thumb", width: 240, height: 240, minKb: 20, maxKb: 50 },
  { slug: "ibps-handwritten-declaration", name: "IBPS Handwritten Declaration", exam: "IBPS PO, Clerk and RRB", kind: "declaration", width: 800, height: 400, minKb: 50, maxKb: 100 },
  { slug: "ssc-signature", name: "SSC Signature", exam: "SSC CGL, CHSL and GD", kind: "signature", width: null, height: null, minKb: 10, maxKb: 20 },
  { slug: "upsc-photo", name: "UPSC Photo", exam: "UPSC Civil Services and other UPSC exams", kind: "photo", width: null, height: null, minKb: 20, maxKb: 200 },
  { slug: "upsc-signature", name: "UPSC Signature", exam: "UPSC Civil Services and other UPSC exams", kind: "signature", width: 500, height: null, minKb: 20, maxKb: 100 },
  { slug: "neet-photo", name: "NEET Passport Photo", exam: "NEET UG (NTA)", kind: "photo", width: null, height: null, minKb: 10, maxKb: 200 },
  { slug: "neet-postcard-photo", name: "NEET Postcard Photo", exam: "NEET UG (NTA)", kind: "photo", width: 400, height: 600, minKb: 10, maxKb: 200 },
  { slug: "neet-signature", name: "NEET Signature", exam: "NEET UG (NTA)", kind: "signature", width: null, height: null, minKb: 10, maxKb: 30 },
  { slug: "pan-card-photo", name: "PAN Card Photo", exam: "PAN applications (NSDL / UTIITSL)", kind: "photo", width: 197, height: 276, minKb: null, maxKb: 20 },
  { slug: "passport-size-photo", name: "Passport Size Photo", exam: "Indian passport size (35 × 45 mm)", kind: "photo", width: 413, height: 531, minKb: null, maxKb: 200 },
  { slug: "us-visa-photo", name: "US Visa Photo", exam: "US visa applications (DS-160)", kind: "photo", width: 600, height: 600, minKb: null, maxKb: 240 },
];

export const formPresetIconSrc = "/icons/tools/form-photo.svg";

export const formPresetPath = (slug: string) => `${routes.formPhoto}/${slug}`;

export function getFormPreset(slug: string) {
  return formPresets.find((preset) => preset.slug === slug);
}

export function formPresetOptions({ width, height, minKb, maxKb }: FormPreset): FormPhotoOptions {
  return { width, height, minKb, maxKb };
}
