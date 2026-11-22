export const analyticsConfig = {
  trackerSrc: "https://quantalog-be.daorbit.in/tracker.js",
  siteId: "fY0q62_Tln7senc9",
  queueLimit: 50,
  retryMs: 1500,
  maxRetries: 20,
} as const;

export const analyticsEvents = {
  toolOpen: "tool_open",
  filesAdded: "files_added",
  toolRun: "tool_run",
  toolDone: "tool_done",
  fileSave: "file_save",
} as const;

export type AnalyticsEvent = (typeof analyticsEvents)[keyof typeof analyticsEvents];
