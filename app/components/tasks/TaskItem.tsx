"use client";

import type { TaskItem } from "@/app/lib/utils/task-utils";
import { formatTaskLifetime } from "@/app/lib/utils/task-utils";

interface TaskItemProps {
  task: TaskItem;
  onToggle: (id: string) => void;
  onEdit: (task: TaskItem) => void;
  onDelete: (id: string) => void;
  index: number;
}

export function TaskItem({
  task,
  onToggle,
  onEdit,
  onDelete,
  index,
}: TaskItemProps) {
  return (
    <div
      className="animate-fade-up group flex items-start gap-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-4 py-3.5 hover:border-[var(--color-border-strong)] transition-all duration-200"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        aria-label={task.done ? "Mark as undone" : "Mark as done"}
        className={`
          shrink-0 mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center
          transition-all duration-200 cursor-pointer
          ${
            task.done
              ? "bg-[var(--color-amber)] border-[var(--color-amber)]"
              : "border-[var(--color-border-strong)] hover:border-[var(--color-amber)]"
          }
        `}
      >
        {task.done && (
          <span className="text-white text-[10px] leading-none">✓</span>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm leading-snug transition-all duration-200 ${
            task.done
              ? "line-through text-[var(--color-ink-faint)]"
              : "text-[var(--color-ink)]"
          }`}
        >
          {task.name}
        </p>

        {task.description && (
          <p className="text-xs text-[var(--color-ink-muted)] mt-0.5 leading-relaxed line-clamp-1">
            {task.description}
          </p>
        )}

        {/* Badges row */}
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          {task.isDaily && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[var(--color-amber-bg)] text-[var(--color-amber-dark)] border border-[var(--color-amber-border)]">
              Daily
            </span>
          )}
          {task.isExpired && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-red-900/30 text-red-400 border border-red-800/50">
              Expired
            </span>
          )}
          {task.lifetime && !task.isExpired && (
            <span className="text-[10px] text-[var(--color-ink-faint)]">
              {formatTaskLifetime(task.lifetime)}
            </span>
          )}
        </div>
      </div>

      {/* Actions — visible on hover */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0 pt-0.5">
        <button
          onClick={() => onEdit(task)}
          aria-label="Edit task"
          className="p-1.5 rounded-lg text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface-hover)] transition-all duration-150 cursor-pointer text-sm"
        >
          ✎
        </button>
        <button
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
          className="p-1.5 rounded-lg text-[var(--color-ink-faint)] hover:text-red-400 hover:bg-red-900/20 transition-all duration-150 cursor-pointer text-sm"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
