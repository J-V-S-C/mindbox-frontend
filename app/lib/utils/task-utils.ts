import type { GetCategoryQuery } from "@/app/lib/gql/graphql";

// Derived from the single-category query — contains all task fields
export type TaskItem = NonNullable<
  GetCategoryQuery["category"]
>["tasks"][number];

export type TaskFilter = "all" | "pending" | "daily" | "expired";

export function filterTasks(tasks: TaskItem[], filter: TaskFilter): TaskItem[] {
  switch (filter) {
    case "pending":
      return tasks.filter((t) => !t.done && !t.isExpired);
    case "daily":
      return tasks.filter((t) => t.isDaily);
    case "expired":
      return tasks.filter((t) => t.isExpired);
    default:
      return tasks;
  }
}

export function formatTaskLifetime(
  lifetime: string | null | undefined,
): string {
  if (!lifetime) return "";
  const date = new Date(lifetime);
  const now = new Date();
  const diffDays = Math.ceil(
    (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays < 0) return "Expired";
  if (diffDays === 0) return "Due today";
  if (diffDays === 1) return "Due tomorrow";
  if (diffDays <= 7) return `${diffDays} days left`;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
