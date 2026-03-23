"use client";

import { useState, use } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  GET_ROADMAPS,
  UPDATE_ROADMAP,
  DELETE_ROADMAP,
} from "@/app/lib/queries/roadmap-queries";
import {
  GET_CATEGORIES,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "@/app/lib/queries/category-queries";
import { ConfirmDialog } from "@/app/components/ui/ConfirmDialog";
import { EditRoadmapModal } from "@/app/components/roadmaps/EditRoadmapModal";
import {
  CategoryModal,
  type CategoryFormData,
} from "@/app/components/categories/CategoryModal";
import { CategoryCard } from "@/app/components/categories/CategoryCard";
import { CategorySkeleton } from "@/app/components/ui/skeletons/category-skeleton";
import type { CategoryItem } from "@/app/lib/utils/category-utils";
import { Breadcrumbs } from "@/app/components/ui/Breadcrumbs";

type ModalState =
  | { type: "editRoadmap" }
  | { type: "deleteRoadmap" }
  | { type: "createCategory" }
  | { type: "editCategory"; category: CategoryItem }
  | { type: "deleteCategory"; id: string }
  | null;

export default function RoadmapPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [modal, setModal] = useState<ModalState>(null);

  const { data: roadmapsData, loading: roadmapLoading } = useQuery(
    GET_ROADMAPS,
    {
      variables: { limit: 100, offset: 0 },
    },
  );

  const { data: categoriesData, loading: categoriesLoading } = useQuery(
    GET_CATEGORIES,
    {
      variables: { limit: 100, offset: 0 },
    },
  );

  const roadmap = roadmapsData?.roadmaps.find((r) => r.id === id);
  const categories =
    categoriesData?.categories.filter((c) => c.roadmap.id === id) ?? [];

  const [updateRoadmap, { loading: updatingRoadmap }] = useMutation(
    UPDATE_ROADMAP,
    {
      refetchQueries: [
        { query: GET_ROADMAPS, variables: { limit: 100, offset: 0 } },
      ],
    },
  );
  const [deleteRoadmap, { loading: deletingRoadmap }] = useMutation(
    DELETE_ROADMAP,
    {
      update(cache) {
        cache.evict({ id: `Roadmap:${id}` });
        cache.gc(); // Garbage collect to clean up dangling references
      },
      refetchQueries: [
        { query: GET_ROADMAPS, variables: { limit: 100, offset: 0 } },
      ],
    },
  );
  const [createCategory, { loading: creatingCategory }] = useMutation(
    CREATE_CATEGORY,
    {
      refetchQueries: [GET_CATEGORIES],
    },
  );
  const [updateCategory, { loading: updatingCategory }] = useMutation(
    UPDATE_CATEGORY,
    {
      refetchQueries: [GET_CATEGORIES],
    },
  );
  const [deleteCategory, { loading: deletingCategory }] = useMutation(
    DELETE_CATEGORY,
    {
      refetchQueries: [GET_CATEGORIES],
    },
  );

  const handleUpdateRoadmap = async (name: string, description: string) => {
    await updateRoadmap({
      variables: { id, input: { name, description: description || null } },
    });
    setModal(null);
  };

  const handleDeleteRoadmap = async () => {
    await deleteRoadmap({ variables: { id } });
    router.push("/");
  };

  const handleCreateCategory = async (data: CategoryFormData) => {
    await createCategory({
      variables: {
        input: {
          name: data.name,
          description: data.description || null,
          lifetime: data.lifetime,
          roadmapId: id,
        },
      },
    });
    setModal(null);
  };

  const handleUpdateCategory = async (data: CategoryFormData) => {
    if (modal?.type !== "editCategory") return;
    await updateCategory({
      variables: {
        id: modal.category.id,
        input: {
          name: data.name,
          description: data.description || null,
          lifetime: data.lifetime,
          roadmapId: id,
        },
      },
    });
    setModal(null);
  };

  const handleDeleteCategory = async () => {
    if (modal?.type !== "deleteCategory") return;
    await deleteCategory({ variables: { id: modal.id } });
    setModal(null);
  };

  const isLoading = roadmapLoading || categoriesLoading;

  return (
    <>
      {modal?.type === "editRoadmap" && roadmap && (
        <EditRoadmapModal
          initialName={roadmap.name}
          initialDescription={roadmap.description ?? ""}
          onClose={() => setModal(null)}
          onSubmit={handleUpdateRoadmap}
          loading={updatingRoadmap}
        />
      )}

      {modal?.type === "deleteRoadmap" && (
        <ConfirmDialog
          title="Delete roadmap?"
          description={`"${roadmap?.name}" and all its categories will be permanently deleted. This cannot be undone.`}
          onConfirm={handleDeleteRoadmap}
          onCancel={() => setModal(null)}
          loading={deletingRoadmap}
        />
      )}

      {modal?.type === "createCategory" && (
        <CategoryModal
          mode="create"
          onClose={() => setModal(null)}
          onSubmit={handleCreateCategory}
          loading={creatingCategory}
        />
      )}

      {modal?.type === "editCategory" && (
        <CategoryModal
          mode="edit"
          initial={{
            name: modal.category.name,
            description: modal.category.description ?? "",
            lifetime: modal.category.lifetime,
          }}
          onClose={() => setModal(null)}
          onSubmit={handleUpdateCategory}
          loading={updatingCategory}
        />
      )}

      {modal?.type === "deleteCategory" && (
        <ConfirmDialog
          title="Delete category?"
          description="All tasks inside this category will also be deleted. This cannot be undone."
          onConfirm={handleDeleteCategory}
          onCancel={() => setModal(null)}
          loading={deletingCategory}
        />
      )}

      <main className="min-h-screen bg-[var(--color-base)]">
        <div className="max-w-4xl mx-auto px-5 pt-12 pb-24">
          <Breadcrumbs
            items={[
              { label: "Roadmaps", href: "/" },
              { label: roadmap ? roadmap.name : "Loading..." }
            ]}
          />

          {isLoading ? (
            <div className="mb-12">
              <div className="shimmer h-10 w-64 rounded-xl mb-3" />
              <div className="shimmer h-4 w-96 rounded-lg" />
            </div>
          ) : roadmap ? (
            <header className="mb-12 flex items-start justify-between gap-6">
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-amber)] mb-3">
                  Roadmap
                </p>
                <h1
                  className="text-4xl sm:text-5xl font-light italic text-[var(--color-ink)] leading-[1.1] mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {roadmap.name}
                </h1>
                {roadmap.description && (
                  <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed max-w-lg">
                    {roadmap.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0 pt-2">
                <button
                  onClick={() => setModal({ type: "editRoadmap" })}
                  className="text-xs font-semibold px-3 py-2 rounded-lg border border-[var(--color-border)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:border-[var(--color-border-strong)] transition-all duration-200 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => setModal({ type: "deleteRoadmap" })}
                  className="text-xs font-semibold px-3 py-2 rounded-lg border border-red-900/40 text-red-400 hover:bg-red-900/20 transition-all duration-200 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </header>
          ) : (
            <p className="text-[var(--color-ink-muted)] mb-12">
              Roadmap not found.
            </p>
          )}

          <div className="flex items-center justify-between mb-5 pb-4 border-b border-[var(--color-border)]">
            <div>
              <h2
                className="text-lg font-normal text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Categories
              </h2>
              <p className="text-xs text-[var(--color-ink-muted)] mt-0.5">
                <span className="text-[var(--color-amber)] font-semibold">
                  {categories.length}
                </span>{" "}
                {categories.length === 1 ? "category" : "categories"}
              </p>
            </div>
            <button
              onClick={() => setModal({ type: "createCategory" })}
              className="text-xs font-semibold px-4 py-2 rounded-lg bg-[var(--color-amber)] text-white hover:bg-[var(--color-amber-dark)] transition-colors duration-200 cursor-pointer"
            >
              + New Category
            </button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <CategorySkeleton key={i} />
              ))}
            </div>
          ) : categories.length === 0 ? (
            <div className="flex flex-col items-center text-center py-16 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl">
              <div className="text-4xl mb-4 text-[var(--color-ink-faint)]">
                📂
              </div>
              <h3
                className="text-xl font-light italic text-[var(--color-ink)] mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                No categories yet
              </h3>
              <p className="text-sm text-[var(--color-ink-muted)] max-w-xs mb-6">
                Break down this roadmap into focused categories.
              </p>
              <button
                onClick={() => setModal({ type: "createCategory" })}
                className="text-sm font-semibold px-5 py-2.5 rounded-lg bg-[var(--color-amber)] text-white hover:bg-[var(--color-amber-dark)] transition-colors duration-200 cursor-pointer"
              >
                Create first category
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category, i) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  index={i}
                  roadmapId={id}
                  onEdit={(cat) =>
                    setModal({ type: "editCategory", category: cat })
                  }
                  onDelete={(catId) =>
                    setModal({ type: "deleteCategory", id: catId })
                  }
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
