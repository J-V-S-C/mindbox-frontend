"use client";

import { useState } from "react";

type CreateModalProps = {
  onClose: () => void;
  onSubmit: (name: string, description: string) => void;
  loading: boolean;
};

export function CreateRoadmapModal({
  onClose,
  onSubmit,
  loading,
}: CreateModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit(name.trim(), description.trim());
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-surface border border-border rounded-2xl p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          className="text-2xl font-light italic text-ink mb-1"
          style={{ fontFamily: "var(--font-display)" }}
        >
          New roadmap
        </h2>
        <p className="text-sm text-ink-muted mb-6">
          Give your roadmap a name and an optional description.
        </p>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="roadmap-name"
              className="text-xs font-semibold uppercase tracking-wider text-ink-muted"
            >
              Name <span className="text-amber">*</span>
            </label>
            <input
              id="roadmap-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Backend Development"
              autoFocus
              className="bg-base border border-border rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-amber focus:ring-2 focus:ring-amber-border transition-all duration-200"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="roadmap-description"
              className="text-xs font-semibold uppercase tracking-wider text-ink-muted"
            >
              Description{" "}
              <span className="ml-1 text-ink-faint normal-case font-normal tracking-normal">
                (optional)
              </span>
            </label>
            <textarea
              id="roadmap-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this roadmap about?"
              rows={3}
              className="bg-base border border-border rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-amber focus:ring-2 focus:ring-amber-border transition-all duration-200 resize-none"
            />
          </div>

          <div className="flex gap-2 justify-end mt-2">
            <button
              onClick={onClose}
              className="text-sm px-4 py-2.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-hover transition-all duration-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!name.trim() || loading}
              className="text-sm font-semibold px-5 py-2.5 rounded-lg bg-amber text-white hover:bg-amber-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
            >
              {loading ? "Creating…" : "Create roadmap"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
