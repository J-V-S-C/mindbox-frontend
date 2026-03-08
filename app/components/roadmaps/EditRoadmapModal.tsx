"use client";

import { useState } from "react";

interface EditRoadmapModalProps {
  initialName: string;
  initialDescription: string;
  onClose: () => void;
  onSubmit: (name: string, description: string) => void;
  loading: boolean;
}

export function EditRoadmapModal({
  initialName,
  initialDescription,
  onClose,
  onSubmit,
  loading,
}: EditRoadmapModalProps) {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);

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
          Edit roadmap
        </h2>
        <p className="text-sm text-[var(--color-ink-muted)] mb-6">
          Update the name or description of this roadmap.
        </p>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-muted)]">
              Name <span className="text-[var(--color-amber)]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              className="bg-[var(--color-base)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] outline-none focus:border-[var(--color-amber)] focus:ring-2 focus:ring-[var(--color-amber-border)] transition-all duration-200"
            />
          </div>
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
              rows={3}
              className="bg-[var(--color-base)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] outline-none focus:border-[var(--color-amber)] focus:ring-2 focus:ring-[var(--color-amber-border)] transition-all duration-200 resize-none"
            />
          </div>
          <div className="flex gap-2 justify-end mt-1">
            <button
              onClick={onClose}
              className="text-sm px-4 py-2.5 rounded-lg text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface-hover)] transition-all duration-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => onSubmit(name.trim(), description.trim())}
              disabled={!name.trim() || loading}
              className="text-sm font-semibold px-5 py-2.5 rounded-lg bg-[var(--color-amber)] text-white hover:bg-[var(--color-amber-dark)] disabled:opacity-50 transition-all duration-200 cursor-pointer"
            >
              {loading ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
