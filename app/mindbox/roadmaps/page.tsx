"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_ROADMAPS } from "@/app/lib/queries";
import { RoadmapCard, type RoadmapItem } from "@/app/components/RoadmapCard";
import { RoadmapSkeleton } from "@/app/components/ui/skeletons/roadmap-skeleton";
import { EmptyState } from "@/app/components/ui/EmptyState";

export default function RoadmapsPage() {
  const [search, setSearch] = useState("");

  const { data, loading, error } = useQuery(GET_ROADMAPS, {
    variables: { limit: 20, offset: 0 },
  });

  const roadmaps: RoadmapItem[] = data?.roadmaps ?? [];
  const filtered = roadmaps.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-[var(--color-base)]">
      <div className="max-w-2xl mx-auto px-5 pt-16 pb-24 sm:pt-24">
        {/* ── Header ── */}
        <header className="mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-amber)] mb-4">
            MindBox
          </p>
          <h1
            className="text-5xl sm:text-6xl font-light italic text-[var(--color-ink)] leading-[1.1] mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Your{" "}
            <span className="text-[var(--color-amber)] not-italic font-normal">
              roadmaps
            </span>
          </h1>

          {/* Search */}
          <div className="relative">
            <span
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-ink-faint)] pointer-events-none select-none"
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
              className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl pl-10 pr-4 py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] outline-none focus:border-[var(--color-amber)] focus:ring-2 focus:ring-[var(--color-amber-border)] transition-all duration-200"
            />
          </div>
        </header>

        {/* ── Meta row ── */}
        {!loading && !error && (
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-[var(--color-border)]">
            <p className="text-xs text-[var(--color-ink-muted)]">
              <span className="text-[var(--color-amber)] font-semibold">
                {filtered.length}
              </span>{" "}
              {filtered.length === 1 ? "roadmap" : "roadmaps"}
            </p>
            <button className="text-xs font-semibold px-4 py-2 rounded-lg bg-[var(--color-amber)] text-white hover:bg-[var(--color-amber-dark)] transition-colors duration-200 cursor-pointer">
              + New Roadmap
            </button>
          </div>
        )}

        {/* ── Error ── */}
        {error && (
          <div
            role="alert"
            className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm"
          >
            Something went wrong — {error.message}
          </div>
        )}

        {/* ── Cards ── */}
        <div className="flex flex-col gap-2.5" role="list">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <RoadmapSkeleton key={i} />)
          ) : filtered.length === 0 ? (
            <EmptyState
              icon="🗺️"
              title="No roadmaps yet"
              description="Create your first roadmap to start organizing your learning journey."
              action={
                <button className="text-sm font-semibold px-5 py-2.5 rounded-lg bg-[var(--color-amber)] text-white hover:bg-[var(--color-amber-dark)] transition-colors duration-200 cursor-pointer">
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
  );
}
