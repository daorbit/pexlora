export function AuthHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col gap-2 text-center">
      <h1 className="text-[28px] leading-[1.08] font-extrabold tracking-[-0.045em] sm:text-[34px]">{title}</h1>
      <p className="text-[14px] leading-normal text-balance text-secondary sm:text-[15px]">{description}</p>
    </div>
  );
}
