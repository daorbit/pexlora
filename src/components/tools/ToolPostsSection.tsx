import { blogPostPath } from "@/config/blog";
import { toolPostSlugs } from "@/config/tool-posts";
import { blogCopy } from "@/content/blog";
import { getPostsBySlugs } from "@/lib/blog/posts";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { Section } from "@/components/ui/Section";

export async function ToolPostsSection({ tool }: { tool: string }) {
  const posts = await getPostsBySlugs(toolPostSlugs[tool] ?? []);
  if (!posts.length) return null;

  return (
    <Section className="py-6 sm:py-10">
      <RelatedLinks
        title={blogCopy.toolPosts}
        links={posts.map((post) => ({ label: post.title, href: blogPostPath(post.slug) }))}
      />
    </Section>
  );
}
