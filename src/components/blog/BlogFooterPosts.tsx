import { BLOG_FOOTER_COUNT } from "@/config/blog";
import { blogCopy } from "@/content/blog";
import { getLatestPosts } from "@/lib/blog/posts";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { PostGrid } from "@/components/blog/PostGrid";
import { PostListHeader } from "@/components/blog/PostListHeader";

export async function BlogFooterPosts() {
  const posts = await getLatestPosts(BLOG_FOOTER_COUNT);
  if (posts.length === 0) return null;

  const copy = blogCopy.footerPosts;

  return (
    <Section aria-labelledby="footer-posts" className="sm:py-16">
      <div className="flex flex-col gap-4 sm:gap-6">
        <PostListHeader id="footer-posts" title={copy.title} linkLabel={copy.all}>
          <Eyebrow className="text-[11px] sm:text-xs">{copy.eyebrow}</Eyebrow>
        </PostListHeader>
        <PostGrid posts={posts} showDescription className="lg:grid-cols-4" />
      </div>
    </Section>
  );
}
