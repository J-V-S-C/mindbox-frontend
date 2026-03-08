"use client";

import type { TaskFilter } from "@/app/lib/utils/task-utils";

interface TaskEmptyStateProps {
  filter: TaskFilter;
  onCreateFirst: () => void;
}

export function TaskEmptyState({ filter, onCreateFirst }: TaskEmptyStateProps) {
  return (
    <div className="flex flex-col items-center text-center py-14 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl">
      <div className="text-3xl mb-3 text-[var(--color-ink-faint)]">
        {filter === "expired" ? "🎉" : "✓"}
      </div>
      <h3
        className="text-lg font-light italic text-[var(--color-ink)] mb-1"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {filter === "expired"
          ? "No expired tasks"
          : filter === "pending"
            ? "Nothing pending"
            : filter === "daily"
              ? "No daily tasks"
              : "No tasks yet"}
      </h3>
      <p className="text-xs text-[var(--color-ink-muted)] max-w-xs mb-5">
        {filter === "all"
          ? "Add your first task to start tracking progress."
          : "Try a different filter or add new tasks."}
      </p>
      {filter === "all" && (
        <button
          onClick={onCreateFirst}
          className="text-sm font-semibold px-5 py-2.5 rounded-lg bg-[var(--color-amber)] text-white hover:bg-[var(--color-amber-dark)] transition-colors duration-200 cursor-pointer"
        >
          Add first task
        </button>
      )}
    </div>
  );
}
