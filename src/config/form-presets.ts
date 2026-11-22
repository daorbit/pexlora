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
  { slug: "jee-main-photo", name: "JEE Main Photo", exam: "JEE Main (NTA)", kind: "photo", width: null, height: null, minKb: 10, maxKb: 200 },
  { slug: "jee-main-signature", name: "JEE Main Signature", exam: "JEE Main (NTA)", kind: "signature", width: null, height: null, minKb: 10, maxKb: 30 },
  { slug: "cuet-ug-photo", name: "CUET UG Photo", exam: "CUET UG (NTA)", kind: "photo", width: null, height: null, minKb: 10, maxKb: 200 },
  { slug: "cuet-ug-signature", name: "CUET UG Signature", exam: "CUET UG (NTA)", kind: "signature", width: null, height: null, minKb: 10, maxKb: 30 },
  { slug: "sbi-po-photo", name: "SBI PO Photo", exam: "SBI PO and Clerk", kind: "photo", width: 200, height: 230, minKb: 20, maxKb: 50 },
  { slug: "sbi-po-signature", name: "SBI PO Signature", exam: "SBI PO and Clerk", kind: "signature", width: 140, height: 60, minKb: 10, maxKb: 20 },
  { slug: "rrb-ntpc-signature", name: "RRB NTPC Signature", exam: "RRB NTPC", kind: "signature", width: null, height: null, minKb: 30, maxKb: 40 },
  { slug: "pan-card-photo", name: "PAN Card Photo", exam: "PAN applications (NSDL / UTIITSL)", kind: "photo", width: 197, height: 276, minKb: null, maxKb: 20 },
  { slug: "pan-card-signature", name: "PAN Card Signature", exam: "PAN applications (NSDL / UTIITSL)", kind: "signature", width: 354, height: 157, minKb: null, maxKb: 20 },
  { slug: "driving-licence-photo", name: "Driving Licence Photo", exam: "Driving licence applications on Sarathi Parivahan", kind: "photo", width: 420, height: 525, minKb: null, maxKb: 20 },
  { slug: "driving-licence-signature", name: "Driving Licence Signature", exam: "Driving licence applications on Sarathi Parivahan", kind: "signature", width: 256, height: 64, minKb: null, maxKb: 10 },
  { slug: "passport-size-photo", name: "Passport Size Photo", exam: "Indian passport size (35 × 45 mm)", kind: "photo", width: 413, height: 531, minKb: null, maxKb: 200 },
  { slug: "us-visa-photo", name: "US Visa Photo", exam: "US visa applications (DS-160)", kind: "photo", width: 600, height: 600, minKb: null, maxKb: 240 },
  { slug: "schengen-visa-photo", name: "Schengen Visa Photo", exam: "Schengen visa applications (35 × 45 mm)", kind: "photo", width: 413, height: 531, minKb: null, maxKb: 200 },
];

export const formPresetIconSrc = "/icons/tools/form-photo.svg";

export const formPresetPath = (slug: string) => `${routes.formPhoto}/${slug}`;

export function getFormPreset(slug: string) {
  return formPresets.find((preset) => preset.slug === slug);
}

export function formPresetOptions({ width, height, minKb, maxKb }: FormPreset): FormPhotoOptions {
  return { width, height, minKb, maxKb };
}
