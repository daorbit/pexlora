import type { SeoFaq } from "@/content/seo-pages/types";

export const hinglishFaqs = {
  compress: {
    question: "Photo ka size KB mein kaise kam kare?",
    answer:
      "Photo upar daaliye, Target Size chuniye aur form mein jitne KB maange gaye hain (jaise 50 ya 100) woh likhiye. Pexlora quality dheere-dheere kam karke photo ko us size ke andar le aata hai, phir Download dabaiye.",
  },
  formPhoto: {
    question: "Form ke liye photo aur signature ka size kaise kam kare?",
    answer:
      "Form ki notice se width, height aur KB range copy karke yahan bhariye, ya neeche diya preset kholiye. Photo ya signature daaliye aur JPG download kar lijiye. Sab kuch aapke browser mein hota hai, photo upload nahi hoti.",
  },
  passport: {
    question: "Mobile se passport size photo kaise banaye?",
    answer:
      "Saaf, light background wali photo daaliye, 35 × 45 mm size aur 4 × 6 inch ya A4 sheet chuniye. JPG ya PDF save karke photo shop se print karwaiye ya ghar par 100% size par print kijiye.",
  },
  removeLocation: {
    question: "Photo se location kaise hataye?",
    answer:
      "Photo upar daaliye, Pexlora GPS location, date aur camera ki details hata deta hai. Saaf copy download karke WhatsApp ya email par bhejiye. JPG, PNG, WebP aur iPhone HEIC photos browser mein hi saaf hoti hain.",
  },
  imageToPdf: {
    question: "Photo ko PDF kaise banaye?",
    answer:
      "Ek ya kai photos daaliye, arrows se order theek kijiye aur Create PDF dabaiye. Har photo apne A4 page par aati hai aur PDF aapke browser mein hi banta hai.",
  },
} satisfies Record<string, SeoFaq>;

export function hinglishCompressTargetFaq(label: string): SeoFaq {
  return {
    question: `Photo ka size ${label} kaise kare?`,
    answer: `Photo upar daaliye, target pehle se ${label} par set hai. Pexlora quality utni hi kam karta hai jitni zaroori ho, phir aap photo download karke form par upload kar sakte hain.`,
  };
}

export function hinglishFormPresetFaq(presetName: string, specs: string): SeoFaq {
  return {
    question: `${presetName} ka size kaise kam kare?`,
    answer: `Apni photo ya signature daaliye, yeh page pehle se ${specs} par set hai. JPG download kijiye aur form par upload kar dijiye. Notice mein size alag ho to number badal lijiye.`,
  };
}
