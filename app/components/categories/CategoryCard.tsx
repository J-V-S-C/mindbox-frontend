"use client";

import Link from "next/link";
import {
  CategoryItem,
  formatLifetime,
  lifetimeColor,
  taskProgress,
} from "@/app/lib/utils/category-utils";

interface CategoryCardProps {
  category: CategoryItem;
  index: number;
  roadmapId: string;
  onEdit: (category: CategoryItem) => void;
  onDelete: (id: string) => void;
}

export function CategoryCard({
  category,
  index,
  roadmapId,
  onEdit,
  onDelete,
}: CategoryCardProps) {
  const progress = taskProgress(category.tasks);
  const doneTasks = category.tasks.filter((t) => t.done).length;

  return (
    <div
      className="animate-fade-up group bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 hover:border-[var(--color-border-strong)] hover:shadow-lg transition-all duration-200 flex flex-col gap-4"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <Link
          href={`/roadmaps/${roadmapId}/${category.id}`}
          className="flex-1 min-w-0 no-underline group/link"
        >
          <h3
            className="text-lg font-normal text-[var(--color-ink)] leading-snug group-hover/link:text-[var(--color-amber)] transition-colors duration-200 truncate"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {category.name}
          </h3>
          {category.description && (
            <p className="text-xs text-[var(--color-ink-muted)] mt-0.5 line-clamp-2 leading-relaxed">
              {category.description}
            </p>
          )}
        </Link>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
          <button
            onClick={() => onEdit(category)}
            aria-label="Edit category"
            className="p-1.5 rounded-lg text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface-hover)] transition-all duration-150 cursor-pointer"
          >
            ✎
          </button>
          <button
            onClick={() => onDelete(category.id)}
            aria-label="Delete category"
            className="p-1.5 rounded-lg text-[var(--color-ink-faint)] hover:text-red-400 hover:bg-red-900/20 transition-all duration-150 cursor-pointer"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <span className="text-[11px] text-[var(--color-ink-faint)] uppercase tracking-wider">
            Tasks
          </span>
          <span className="text-[11px] font-semibold text-[var(--color-ink-muted)]">
            {doneTasks}/{category.tasks.length}
          </span>
        </div>
        <div className="h-1.5 bg-[var(--color-border)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--color-amber)] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span
          className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${lifetimeColor(category.lifetime)}`}
        >
          {formatLifetime(category.lifetime)}
        </span>
        <span className="text-[11px] text-[var(--color-ink-faint)]">
          {progress}% done
        </span>
      </div>
    </div>
  );
}
