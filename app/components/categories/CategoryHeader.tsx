"use client";

import Link from "next/link";
import { formatLifetime, lifetimeColor } from "@/app/lib/utils/category-utils";
import type { TaskItem as TaskItemType } from "@/app/lib/utils/task-utils";

interface Category {
  name: string;
  description?: string | null;
  lifetime: string;
  roadmap: { name: string };
}

interface CategoryHeaderProps {
  category: Category;
  roadmapId: string;
  tasks: TaskItemType[];
  onEdit: () => void;
  onDelete: () => void;
}

export function CategoryHeader({
  category,
  roadmapId,
  tasks,
  onEdit,
  onDelete,
}: CategoryHeaderProps) {
  const doneCount = tasks.filter((t) => t.done).length;
  const progress =
    tasks.length > 0 ? Math.round((doneCount / tasks.length) * 100) : 0;

  return (
    <>
      <nav className="flex items-center gap-2 mb-8 text-xs text-[var(--color-ink-faint)]">
        <Link
          href="/mindbox/roadmaps"
          className="hover:text-[var(--color-amber)] transition-colors duration-200 no-underline"
        >
          Roadmaps
        </Link>
        <span>/</span>
        <Link
          href={`/mindbox/roadmaps/${roadmapId}`}
          className="hover:text-[var(--color-amber)] transition-colors duration-200 no-underline"
        >
          {category.roadmap.name}
        </Link>
        <span>/</span>
        <span className="text-[var(--color-ink-muted)]">{category.name}</span>
      </nav>

      <header className="mb-10">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-amber)] mb-2">
              Category
            </p>
            <h1
              className="text-4xl font-light italic text-[var(--color-ink)] leading-[1.1] mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {category.name}
            </h1>
            {category.description && (
              <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">
                {category.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0 pt-1">
            <button
              onClick={onEdit}
              className="text-xs font-semibold px-3 py-2 rounded-lg border border-[var(--color-border)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:border-[var(--color-border-strong)] transition-all duration-200 cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="text-xs font-semibold px-3 py-2 rounded-lg border border-red-900/40 text-red-400 hover:bg-red-900/20 transition-all duration-200 cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <span
            className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${lifetimeColor(category.lifetime)}`}
          >
            {formatLifetime(category.lifetime)}
          </span>
          <span className="text-xs text-[var(--color-ink-faint)]">
            {doneCount}/{tasks.length} tasks done
          </span>
        </div>

        <div className="h-1.5 bg-[var(--color-border)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--color-amber)] rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>
    </>
  );
}
