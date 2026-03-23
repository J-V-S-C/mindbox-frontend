"use client";

import { use, useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import {
  GET_CATEGORY,
  GET_CATEGORIES,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "@/app/lib/queries/category-queries";
import {
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  TOGGLE_TASK_DONE,
} from "@/app/lib/queries/task-queries";
import { ConfirmDialog } from "@/app/components/ui/ConfirmDialog";
import {
  CategoryModal,
  type CategoryFormData,
} from "@/app/components/categories/CategoryModal";
import { TaskItem } from "@/app/components/tasks/TaskItem";
import { TaskModal, type TaskFormData } from "@/app/components/tasks/TaskModal";
import { CategoryHeader } from "@/app/components/categories/CategoryHeader";
import { TaskFilterTabs } from "@/app/components/tasks/TaskFilterTabs";
import { TaskEmptyState } from "@/app/components/tasks/TaskEmptyState";
import { CategoryPageSkeleton } from "@/app/components/ui/skeletons/category-page-skeleton";
import {
  filterTasks,
  type TaskItem as TaskItemType,
  type TaskFilter,
} from "@/app/lib/utils/task-utils";

type ModalState =
  | { type: "editCategory" }
  | { type: "deleteCategory" }
  | { type: "createTask" }
  | { type: "editTask"; task: TaskItemType }
  | { type: "deleteTask"; id: string }
  | null;

export default function CategoryPage({
  params,
}: {
  params: Promise<{ id: string; categoryId: string }>;
}) {
  const { id: roadmapId, categoryId } = use(params);
  const router = useRouter();

  const [modal, setModal] = useState<ModalState>(null);
  const [filter, setFilter] = useState<TaskFilter>("all");

  const { data, loading } = useQuery(GET_CATEGORY, {
    variables: { id: categoryId },
  });

  const category = data?.category;
  const tasks = category?.tasks ?? [];
  const filteredTasks = filterTasks(tasks, filter);

  const [updateCategory, { loading: updatingCategory }] = useMutation(
    UPDATE_CATEGORY,
    {
      refetchQueries: [GET_CATEGORY, GET_CATEGORIES],
    },
  );
  const [deleteCategory, { loading: deletingCategory }] = useMutation(
    DELETE_CATEGORY,
    {
      refetchQueries: [GET_CATEGORIES],
    },
  );
  const [createTask, { loading: creatingTask }] = useMutation(CREATE_TASK, {
    refetchQueries: [GET_CATEGORY],
  });
  const [updateTask, { loading: updatingTask }] = useMutation(UPDATE_TASK, {
    refetchQueries: [GET_CATEGORY],
  });
  const [deleteTask, { loading: deletingTask }] = useMutation(DELETE_TASK, {
    refetchQueries: [GET_CATEGORY],
  });
  const [toggleTaskDone] = useMutation(TOGGLE_TASK_DONE);

  const handleUpdateCategory = async (formData: CategoryFormData) => {
    await updateCategory({
      variables: {
        id: categoryId,
        input: {
          name: formData.name,
          description: formData.description || null,
          lifetime: formData.lifetime,
          roadmapId,
        },
      },
    });
    setModal(null);
  };

  const handleDeleteCategory = async () => {
    await deleteCategory({ variables: { id: categoryId } });
    router.push(`/roadmaps/${roadmapId}`);
  };

  const handleCreateTask = async (formData: TaskFormData) => {
    await createTask({
      variables: {
        input: {
          name: formData.name,
          description: formData.description || null,
          isDaily: formData.isDaily,
          lifetime: formData.lifetime || null,
          categoryId,
        },
      },
    });
    setModal(null);
  };

  const handleUpdateTask = async (formData: TaskFormData) => {
    if (modal?.type !== "editTask") return;
    await updateTask({
      variables: {
        id: modal.task.id,
        input: {
          name: formData.name,
          description: formData.description || null,
          isDaily: formData.isDaily,
          lifetime: formData.lifetime || null,
          categoryId,
        },
      },
    });
    setModal(null);
  };

  const handleDeleteTask = async () => {
    if (modal?.type !== "deleteTask") return;
    await deleteTask({ variables: { id: modal.id } });
    setModal(null);
  };

  const handleToggle = (taskId: string) => {
    toggleTaskDone({ variables: { id: taskId } });
  };

  return (
    <>
      {modal?.type === "editCategory" && category && (
        <CategoryModal
          mode="edit"
          initial={{
            name: category.name,
            description: category.description ?? "",
            lifetime: category.lifetime,
          }}
          onClose={() => setModal(null)}
          onSubmit={handleUpdateCategory}
          loading={updatingCategory}
        />
      )}

      {modal?.type === "deleteCategory" && (
        <ConfirmDialog
          title="Delete category?"
          description="All tasks inside will be permanently deleted. This cannot be undone."
          onConfirm={handleDeleteCategory}
          onCancel={() => setModal(null)}
          loading={deletingCategory}
        />
      )}

      {modal?.type === "createTask" && (
        <TaskModal
          mode="create"
          onClose={() => setModal(null)}
          onSubmit={handleCreateTask}
          loading={creatingTask}
        />
      )}

      {modal?.type === "editTask" && (
        <TaskModal
          mode="edit"
          initial={{
            name: modal.task.name,
            description: modal.task.description ?? "",
            isDaily: modal.task.isDaily,
            lifetime: modal.task.lifetime ?? "",
          }}
          onClose={() => setModal(null)}
          onSubmit={handleUpdateTask}
          loading={updatingTask}
        />
      )}

      {modal?.type === "deleteTask" && (
        <ConfirmDialog
          title="Delete task?"
          description="This task will be permanently deleted."
          onConfirm={handleDeleteTask}
          onCancel={() => setModal(null)}
          loading={deletingTask}
        />
      )}

      <main className="min-h-screen bg-[var(--color-base)]">
        <div className="max-w-2xl mx-auto px-5 pt-12 pb-24">
          {loading ? (
            <CategoryPageSkeleton />
          ) : category ? (
            <>
              <CategoryHeader
                category={category}
                roadmapId={roadmapId}
                tasks={tasks}
                onEdit={() => setModal({ type: "editCategory" })}
                onDelete={() => setModal({ type: "deleteCategory" })}
              />

              <div className="flex items-center justify-between mb-4">
                <h2
                  className="text-lg font-normal text-[var(--color-ink)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Tasks
                </h2>
                <button
                  onClick={() => setModal({ type: "createTask" })}
                  className="text-xs font-semibold px-4 py-2 rounded-lg bg-[var(--color-amber)] text-white hover:bg-[var(--color-amber-dark)] transition-colors duration-200 cursor-pointer"
                >
                  + New Task
                </button>
              </div>

              <TaskFilterTabs
                tasks={tasks}
                filter={filter}
                onFilterChange={setFilter}
              />

              {filteredTasks.length === 0 ? (
                <TaskEmptyState
                  filter={filter}
                  onCreateFirst={() => setModal({ type: "createTask" })}
                />
              ) : (
                <div className="flex flex-col gap-2">
                  {filteredTasks.map((task, i) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      index={i}
                      onToggle={handleToggle}
                      onEdit={(t) => setModal({ type: "editTask", task: t })}
                      onDelete={(tid) =>
                        setModal({ type: "deleteTask", id: tid })
                      }
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="text-[var(--color-ink-muted)] mb-10">
              Category not found.
            </p>
          )}
        </div>
      </main>
    </>
  );
}
