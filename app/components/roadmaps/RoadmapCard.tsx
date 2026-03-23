import Link from "next/link";
import type { GetRoadmapsQuery } from "@/app/lib/gql/graphql";

export type RoadmapItem = GetRoadmapsQuery["roadmaps"][number];

type Props = {
  roadmap: RoadmapItem;
  index: number;
};

export function RoadmapCard({ roadmap, index }: Props) {
  const visibleCategories = roadmap.categories.slice(0, 3);
  const overflow = roadmap.categories.length - 3;

  return (
    <Link
      href={`/roadmaps/${roadmap.id}`}
      className="animate-fade-up group flex items-center gap-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl px-5 py-4 hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-strong)] hover:shadow-md transition-all duration-200 no-underline"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Index number */}
      <span
        className="shrink-0 text-[11px] font-semibold text-[var(--color-ink-faint)] group-hover:text-[var(--color-amber)] transition-colors duration-200 w-6 text-center tabular-nums"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Vertical divider */}
      <div className="shrink-0 w-px h-10 bg-[var(--color-border)] group-hover:bg-[var(--color-amber-border)] transition-colors duration-200" />

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <h2
          className="text-lg font-normal text-[var(--color-ink)] leading-tight truncate mb-0.5"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {roadmap.name}
        </h2>
        {roadmap.description ? (
          <p className="text-sm text-[var(--color-ink-muted)] truncate leading-relaxed">
            {roadmap.description}
          </p>
        ) : (
          <p className="text-sm text-[var(--color-ink-faint)] italic">
            No description
          </p>
        )}
      </div>

      {/* Category pills — hidden on mobile */}
      <div className="hidden sm:flex items-center gap-1.5 shrink-0 flex-wrap justify-end max-w-[200px]">
        {visibleCategories.map((cat) => (
          <span
            key={cat.id}
            className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[var(--color-amber-bg)] text-[var(--color-amber-dark)] border border-[var(--color-amber-border)] whitespace-nowrap leading-none"
          >
            {cat.name}
          </span>
        ))}
        {overflow > 0 && (
          <span className="text-[11px] text-[var(--color-ink-muted)] font-medium">
            +{overflow}
          </span>
        )}
        {roadmap.categories.length === 0 && (
          <span className="text-[11px] text-[var(--color-ink-faint)] italic">
            No categories
          </span>
        )}
      </div>

      {/* Arrow */}
      <span className="shrink-0 text-[var(--color-ink-faint)] group-hover:text-[var(--color-amber)] group-hover:translate-x-0.5 transition-all duration-200 text-base">
        →
      </span>
    </Link>
  );
}
