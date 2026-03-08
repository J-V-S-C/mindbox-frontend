"use client";

import {
  filterTasks,
  type TaskItem as TaskItemType,
  type TaskFilter,
} from "@/app/lib/utils/task-utils";

const FILTERS: { value: TaskFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "daily", label: "Daily" },
  { value: "expired", label: "Expired" },
];

interface TaskFilterTabsProps {
  tasks: TaskItemType[];
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
}

export function TaskFilterTabs({
  tasks,
  filter,
  onFilterChange,
}: TaskFilterTabsProps) {
  return (
    <div className="flex items-center gap-1 mb-5 p-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl w-fit">
      {FILTERS.map((f) => {
        const count = filterTasks(tasks, f.value).length;
        return (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={`
              text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer
              ${
                filter === f.value
                  ? "bg-[var(--color-amber)] text-white shadow-sm"
                  : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
              }
            `}
          >
            {f.label}
            <span
              className={`ml-1.5 text-[10px] ${
                filter === f.value ? "opacity-80" : "opacity-50"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
