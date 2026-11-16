export const siteConfig = {
  name: "Pexlora",
  tagline: "Clean your files before you share them",
  description:
    "Remove AI tags, C2PA credentials, GPS and author details from photos, PDFs, Office documents, audio and video, or convert, compress and resize JPG, PNG, WebP and AVIF images. Free, no sign-up.",
  googleSiteVerification: "HiZBxbDomDb7TUXm27xBbCModk82j3wdBABq0wHr5xM",
} as const;

export const routes = {
  home: "/",
  signIn: "/signin",
  signUp: "/signup",
  dashboard: "/dashboard",
  dashboardCleaner: "/dashboard/cleaner",
  dashboardConverter: "/dashboard/converter",
  dashboardInspector: "/dashboard/inspector",
  dashboardCompressor: "/dashboard/compressor",
  dashboardResizer: "/dashboard/resizer",
  dashboardEditor: "/dashboard/editor",
  dashboardSettings: "/dashboard/settings",
  removeMetadata: "/remove-ai-metadata",
  convert: "/convert-image",
  viewMetadata: "/metadata-viewer",
  compress: "/compress-image",
  resize: "/resize-image",
  editMetadata: "/edit-image-metadata",
  faq: "/#faq",
  contact: "/contact",
  googleAuth: "/api/auth/google",
  googleCallback: "/api/auth/google/callback",
  googleOneTap: "/api/auth/google/one-tap",
  usageApi: "/api/usage",
} as const;

export const toolAnchor = (slug: string) => `/#${slug}`;

export const navLinks = [
  { label: "Remove Metadata", href: toolAnchor("remove-metadata") },
  { label: "Convert", href: toolAnchor("convert-format") },
  { label: "Inspect", href: toolAnchor("view-metadata") },
  { label: "Privacy", href: "/#privacy" },
  { label: "FAQ", href: routes.faq },
  { label: "Contact", href: routes.contact },
];

export const protectedRoutes = [routes.dashboard];
export const authRoutes = [routes.signIn, routes.signUp];
