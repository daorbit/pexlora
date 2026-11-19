export const embeddedForms = {
  contact: {
    src: "https://forms.daorbit.in/form/6af9ba81e99c97da3afe62b8/view",
    origin: "https://forms.daorbit.in",
    title: "Contact Pexlora",
  },
} as const;

export type EmbeddedFormConfig = (typeof embeddedForms)[keyof typeof embeddedForms];
