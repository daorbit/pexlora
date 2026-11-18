export function PaneEmpty({ message }: { message: string }) {
  return (
    <div className="flex flex-1 items-center justify-center p-8 text-center text-[14.5px] text-tertiary">{message}</div>
  );
}
