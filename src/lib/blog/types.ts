export type CmsImage = { url: string; alt: string };

export type CmsPage = {
  id: string;
  title: string;
  slug: string;
  description: string;
  group: string;
  tags: string[];
  heroImage: CmsImage;
  thumbnailImage: CmsImage;
  content: string;
  seo: { title: string; description: string; ogImage: string; noIndex: boolean };
  author: { name: string; role: string };
  readingMinutes: number;
  status: string;
  publishedAt: string | null;
  updatedAt: string;
};

export type PostHeading = { id: string; text: string; level: 2 | 3 };

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  tags: string[];
  author: { name: string; role: string };
  thumbnail: CmsImage;
  cover: CmsImage;
  seoTitle: string;
  seoDescription: string;
  noIndex: boolean;
  readingMinutes?: number;
};

export type Post = PostMeta & {
  html: string;
  headings: PostHeading[];
  readingMinutes: number;
};
