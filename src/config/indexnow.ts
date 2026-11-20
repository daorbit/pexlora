export const indexNow = {
  endpoint: "https://api.indexnow.org/indexnow",
  keyPath: "/indexnow-key.txt",
  keyPattern: /^[A-Za-z0-9-]{8,128}$/,
  lookbackDays: 2,
  maxUrlsPerRequest: 10_000,
  sitemapPath: "/sitemap.xml",
};
