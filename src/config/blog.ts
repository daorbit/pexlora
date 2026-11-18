export const BLOG_CMS = {
  apiUrl: "https://cms.daorbit.in/api",
  workspaceId: "6afd4bef7e22ed9a22a27280",
  group: "blogs",
  cacheTag: "blog-posts",
};

export const BLOG_PLACEHOLDER_SLUG = "_";
export const BLOG_RELATED_COUNT = 3;
export const BLOG_WORDS_PER_MINUTE = 225;

export function blogPostPath(slug: string) {
  return `/blog/${slug}`;
}
