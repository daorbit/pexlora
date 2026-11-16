export const embeddedForms = {
  teamsEarlyAccess: {
    src: "https://forms.daorbit.in/form/6af9ba81e99c97da3afe62b8/view",
    origin: "https://forms.daorbit.in",
    title: "Get early access to Pexlora for Teams",
  },
} as const;

export type EmbeddedFormConfig = (typeof embeddedForms)[keyof typeof embeddedForms];
