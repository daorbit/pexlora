import type { Post, PostMeta } from "@/lib/blog/types";
import { Container } from "@/components/ui/Container";
import { PostBody } from "@/components/blog/PostBody";
import { PostContentsDrawer, PostContentsRail } from "@/components/blog/PostContents";
import { PostCover } from "@/components/blog/PostCover";
import { PostFooter } from "@/components/blog/PostFooter";
import { PostHeader } from "@/components/blog/PostHeader";
import { PostToolCta } from "@/components/blog/PostToolCta";
import { RelatedPosts } from "@/components/blog/RelatedPosts";

type PostArticleProps = { post: Post; related: PostMeta[]; url: string };

export function PostArticle({ post, related, url }: PostArticleProps) {
  return (
    <div className="flex flex-col gap-12 pt-6 pb-14 sm:gap-20 sm:pt-12 sm:pb-24">
      <article className="flex flex-col gap-7 sm:gap-12">
        <Container className="max-w-6xl">
          <PostHeader post={post} />
        </Container>

        {post.cover.url && (
          <Container className="max-w-6xl motion-safe:animate-fade-up motion-safe:[animation-delay:160ms]">
            <PostCover
              image={post.cover}
              title={post.title}
              sizes="(min-width: 1152px) 1088px, 100vw"
              priority
              className="aspect-video rounded-[20px] sm:rounded-3xl"
            />
          </Container>
        )}

        <Container className="grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-16">
          <div className="mx-auto w-full max-w-[68ch] min-w-0">
            <PostContentsDrawer headings={post.headings} />
            <PostBody html={post.html} />
            <PostFooter post={post} url={url} />
          </div>
          <aside className="sticky top-24 hidden self-start lg:block">
            <PostContentsRail headings={post.headings} />
          </aside>
        </Container>
      </article>

      <Container className="flex max-w-6xl flex-col gap-12 sm:gap-20">
        <PostToolCta />
        <RelatedPosts posts={related} />
      </Container>
    </div>
  );
}
