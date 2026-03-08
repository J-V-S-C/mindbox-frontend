export function CategorySkeleton() {
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 flex flex-col gap-4">
      <div className="shimmer h-5 w-32 rounded-lg" />
      <div className="shimmer h-3 w-full rounded-lg" />
      <div className="flex flex-col gap-1.5">
        <div className="shimmer h-1.5 w-full rounded-full" />
      </div>
      <div className="shimmer h-6 w-24 rounded-full" />
    </div>
  );
}
