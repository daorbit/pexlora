export const siteConfig = {
  name: "Pexlora",
  tagline: "Clean your files before you share them",
  description:
    "Remove EXIF, GPS and AI metadata from photos, PDFs, Office documents, audio and video, view and edit EXIF data, and compress, resize or convert JPG, PNG, WebP and AVIF images. Free, no sign-up.",
  googleSiteVerification: "HiZBxbDomDb7TUXm27xBbCModk82j3wdBABq0wHr5xM",
} as const;

export const routes = {
  home: "/",
  signIn: "/signin",
  signUp: "/signup",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  dashboard: "/dashboard",
  dashboardCleaner: "/dashboard/cleaner",
  dashboardConverter: "/dashboard/converter",
  dashboardInspector: "/dashboard/inspector",
  dashboardCompressor: "/dashboard/compressor",
  dashboardResizer: "/dashboard/resizer",
  dashboardEditor: "/dashboard/editor",
  dashboardAltText: "/dashboard/alt-text",
  dashboardAiDetector: "/dashboard/ai-detector",
  dashboardHumanizer: "/dashboard/humanizer",
  dashboardSettings: "/dashboard/settings",
  dashboardAdmin: "/dashboard/admin",
  sessionExpired: "/api/auth/session-expired",
  verifyEmail: "/verify-email",
  removeMetadata: "/remove-ai-metadata",
  convert: "/convert-image",
  viewMetadata: "/metadata-viewer",
  compress: "/compress-image",
  compressTo: "/compress-image-to",
  resize: "/resize-image",
  editMetadata: "/edit-image-metadata",
  altText: "/ai-alt-text-generator",
  aiDetector: "/ai-text-detector",
  humanizer: "/humanize-ai-text",
  faq: "/#faq",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
  cookies: "/cookies",
  security: "/security",
  googleAuth: "/api/auth/google",
  googleLink: "/api/auth/google?link=1",
  googleCallback: "/api/auth/google/callback",
  googleOneTap: "/api/auth/google/one-tap",
  usageApi: "/api/usage",
} as const;

export type NavLink = { label: string; href: string; wideOnly?: boolean };

export const navLinks: NavLink[] = [
  { label: "Remove Metadata", href: routes.removeMetadata },
  { label: "Compress", href: routes.compress },
  { label: "Resize", href: routes.resize, wideOnly: true },
  { label: "Convert", href: routes.convert },
  { label: "Contact", href: routes.contact, wideOnly: true },
];

export const infoLinks: NavLink[] = [
  { label: "FAQ", href: routes.faq },
  { label: "Contact", href: routes.contact },
];

export const protectedRoutes = [routes.dashboard];
export const authRoutes = [routes.signIn, routes.signUp, routes.forgotPassword, routes.resetPassword, routes.verifyEmail];
