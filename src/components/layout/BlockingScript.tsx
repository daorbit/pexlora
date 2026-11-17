export function BlockingScript({ id, code }: { id: string; code: string }) {
  return <script id={id} dangerouslySetInnerHTML={{ __html: code }} />;
}
