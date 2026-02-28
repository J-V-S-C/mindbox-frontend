/*
  This skeleton mirrors RoadmapCard's layout exactly:
  [index] | [divider] | [title + description] | [pills] | [arrow]
  Same padding, same gap, same border radius.
*/

export function RoadmapSkeleton() {
  return (
    <div
      className="flex items-center gap-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl px-5 py-4"
      aria-hidden="true"
    >
      {/* Index */}
      <div className="shimmer shrink-0 w-6 h-3 rounded-full" />

      {/* Divider */}
      <div className="shrink-0 w-px h-10 bg-[var(--color-border)]" />

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="shimmer h-5 w-44 rounded-lg" />
        <div className="shimmer h-3.5 w-64 rounded-lg" />
      </div>

      {/* Pills */}
      <div className="hidden sm:flex items-center gap-1.5 shrink-0">
        <div className="shimmer h-6 w-16 rounded-full" />
        <div className="shimmer h-6 w-20 rounded-full" />
      </div>

      {/* Arrow */}
      <div className="shimmer shrink-0 w-4 h-4 rounded" />
    </div>
  );
}
