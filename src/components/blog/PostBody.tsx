export function PostBody({ html }: { html: string }) {
  return <div className="blog-prose" dangerouslySetInnerHTML={{ __html: html }} />;
}
