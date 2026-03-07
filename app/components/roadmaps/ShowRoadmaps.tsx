"use client";

import { RoadmapCard, type RoadmapItem } from "./RoadmapCard";
import { Search } from "../ui/search";
import { useState } from "react";
import { EmptyState } from "../ui/EmptyState";
import { RoadmapSkeleton } from "../ui/skeletons/roadmap-skeleton";

interface ShowRoadmapsProps {
  roadmaps: RoadmapItem[];
  loading: boolean;
  error: any;
  onNewClick: () => void;
}

export function ShowRoadmaps({
  roadmaps,
  loading,
  error,
  onNewClick,
}: ShowRoadmapsProps) {
  const [search, setSearch] = useState("");

  const filtered = roadmaps.filter((roadmap) => {
    return roadmap.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <main className="min-h-screen bg-base">
      <div className="max-w-2xl mx-auto px-5 pt-16 pb-24 sm:pt-24">
        <header className="mb-12">
          <p className="text-[14px] font-semibold uppercase tracking-[0.2em] text-amber mb-4">
            MindBox
          </p>
          <h1
            className="text-5xl sm:text-6xl font-light italic text-ink leading-[1.1] mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Your{" "}
            <span className="text-amber not-italic font-normal">roadmaps</span>
          </h1>

          <div className="relative">
            <span
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none select-none"
              aria-hidden="true"
            >
              ⌕
            </span>
            <Search
              onChange={setSearch}
              value={search}
              placeholder="Search roadmaps..."
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
              onClick={onNewClick}
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
            Array.from({ length: 4 }).map((_, i) => <RoadmapSkeleton key={i} />)
          ) : filtered.length === 0 ? (
            <EmptyState
              icon="🗺️"
              title="No roadmaps yet"
              description="Create your first roadmap to start organizing your learning journey."
              action={
                <button
                  onClick={onNewClick}
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
  );
}
