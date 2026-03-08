"use client";

import { useState } from "react";
import type { TaskItem } from "@/app/lib/utils/task-utils";

export type TaskFormData = {
  name: string;
  description: string;
  isDaily: boolean;
  lifetime: string;
};

interface TaskModalProps {
  mode: "create" | "edit";
  initial?: TaskFormData;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => void;
  loading: boolean;
}

export function TaskModal({
  mode,
  initial,
  onClose,
  onSubmit,
  loading,
}: TaskModalProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [isDaily, setIsDaily] = useState(initial?.isDaily ?? false);
  const [lifetime, setLifetime] = useState(initial?.lifetime ?? "");

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit({
      name: name.trim(),
      description: description.trim(),
      isDaily,
      lifetime,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          className="text-2xl font-light italic text-[var(--color-ink)] mb-1"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {mode === "create" ? "New task" : "Edit task"}
        </h2>
        <p className="text-sm text-[var(--color-ink-muted)] mb-6">
          {mode === "create"
            ? "Add a new task to this category."
            : "Update this task."}
        </p>

        <div className="flex flex-col gap-4">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]">
              Name <span className="text-[var(--color-amber)]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Learn SQL joins"
              autoFocus
              className="bg-[var(--color-base)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] outline-none focus:border-[var(--color-amber)] focus:ring-2 focus:ring-[var(--color-amber-border)] transition-all duration-200"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]">
              Description{" "}
              <span className="text-[var(--color-ink-faint)] normal-case font-normal tracking-normal">
                (optional)
              </span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Any extra details..."
              rows={2}
              className="bg-[var(--color-base)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] outline-none focus:border-[var(--color-amber)] transition-all duration-200 resize-none"
            />
          </div>

          {/* Deadline */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]">
              Deadline{" "}
              <span className="text-[var(--color-ink-faint)] normal-case font-normal tracking-normal">
                (optional)
              </span>
            </label>
            <input
              type="date"
              value={lifetime}
              onChange={(e) => setLifetime(e.target.value)}
              className="bg-[var(--color-base)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-amber)] transition-all duration-200"
            />
          </div>

          {/* Daily toggle */}
          <button
            onClick={() => setIsDaily(!isDaily)}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 cursor-pointer text-left
              ${
                isDaily
                  ? "bg-[var(--color-amber-bg)] border-[var(--color-amber-border)] text-[var(--color-amber-dark)]"
                  : "bg-[var(--color-base)] border-[var(--color-border)] text-[var(--color-ink-muted)]"
              }
            `}
          >
            <div
              className={`
                w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200
                ${isDaily ? "bg-[var(--color-amber)] border-[var(--color-amber)]" : "border-[var(--color-border-strong)]"}
              `}
            >
              {isDaily && <span className="text-white text-[8px]">✓</span>}
            </div>
            <div>
              <p className="text-sm font-medium">Repeat daily</p>
              <p className="text-xs opacity-70">
                This task will appear in your daily list
              </p>
            </div>
          </button>

          {/* Actions */}
          <div className="flex gap-2 justify-end mt-1">
            <button
              onClick={onClose}
              className="text-sm px-4 py-2.5 rounded-lg text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface-hover)] transition-all duration-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!name.trim() || loading}
              className="text-sm font-semibold px-5 py-2.5 rounded-lg bg-[var(--color-amber)] text-white hover:bg-[var(--color-amber-dark)] disabled:opacity-50 transition-all duration-200 cursor-pointer"
            >
              {loading
                ? mode === "create"
                  ? "Creating…"
                  : "Saving…"
                : mode === "create"
                  ? "Create task"
                  : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
