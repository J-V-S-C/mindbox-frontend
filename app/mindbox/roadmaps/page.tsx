"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  CREATE_ROADMAP,
  GET_ROADMAPS,
} from "@/app/lib/queries/roadmap-queries";
import { RoadmapCard, type RoadmapItem } from "@/app/components/RoadmapCard";
import { RoadmapSkeleton } from "@/app/components/ui/skeletons/roadmap-skeleton";
import { EmptyState } from "@/app/components/ui/EmptyState";

// ── Create Roadmap Modal ───────────────────────────────────────────────────────

type CreateModalProps = {
  onClose: () => void;
  onSubmit: (name: string, description: string) => void;
  loading: boolean;
};

function CreateRoadmapModal({ onClose, onSubmit, loading }: CreateModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit(name.trim(), description.trim());
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      {/* Modal — stop click propagation so clicking inside doesn't close */}
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

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RoadmapsPage() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Hooks must always be called at the top level — never inside handlers
  const { data, loading, error } = useQuery(GET_ROADMAPS, {
    variables: { limit: 20, offset: 0 },
  });

  const [createRoadmap, { loading: creating }] = useMutation(CREATE_ROADMAP, {
    // refetchQueries re-runs GET_ROADMAPS after mutation succeeds
    // so the new card appears in the list without a manual refresh
    refetchQueries: [GET_ROADMAPS],
  });

  const roadmaps: RoadmapItem[] = data?.roadmaps ?? [];
  const filtered = roadmaps.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleCreate = async (name: string, description: string) => {
    await createRoadmap({
      variables: {
        input: { name, description: description || null },
      },
    });
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <CreateRoadmapModal
          onClose={() => setShowModal(false)}
          onSubmit={handleCreate}
          loading={creating}
        />
      )}

      <main className="min-h-screen bg-base">
        <div className="max-w-2xl mx-auto px-5 pt-16 pb-24 sm:pt-24">
          <header className="mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber mb-4">
              MindBox
            </p>
            <h1
              className="text-5xl sm:text-6xl font-light italic text-ink leading-[1.1] mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Your{" "}
              <span className="text-amber not-italic font-normal">
                roadmaps
              </span>
            </h1>

            <div className="relative">
              <span
                className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none select-none"
                aria-hidden="true"
              >
                ⌕
              </span>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search roadmaps..."
                aria-label="Search roadmaps"
                className="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-amber focus:ring-2 focus:ring-amber-border transition-all duration-200"
              />
            </div>
          </header>

          {!loading && !error && (
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
              <p className="text-xs text-ink-muted">
                <span className="text-amber font-semibold">
                  {filtered.length}
                </span>{" "}
                {filtered.length === 1 ? "roadmap" : "roadmaps"}
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="text-xs font-semibold px-4 py-2 rounded-lg bg-amber text-white hover:bg-amber-dark transition-colors duration-200 cursor-pointer"
              >
                + New Roadmap
              </button>
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm"
            >
              Something went wrong — {error.message}
            </div>
          )}

          <div className="flex flex-col gap-2.5" role="list">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <RoadmapSkeleton key={i} />
              ))
            ) : filtered.length === 0 ? (
              <EmptyState
                icon="🗺️"
                title="No roadmaps yet"
                description="Create your first roadmap to start organizing your learning journey."
                action={
                  <button
                    onClick={() => setShowModal(true)}
                    className="text-sm font-semibold px-5 py-2.5 rounded-lg bg-amber text-white hover:bg-amber-dark transition-colors duration-200 cursor-pointer"
                  >
                    Create your first roadmap
                  </button>
                }
              />
            ) : (
              filtered.map((roadmap, i) => (
                <RoadmapCard key={roadmap.id} roadmap={roadmap} index={i} />
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}
