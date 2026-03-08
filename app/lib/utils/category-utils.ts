import type { GetCategoriesQuery } from "@/app/lib/gql/graphql";

export type CategoryItem = GetCategoriesQuery["categories"][number];

export function formatLifetime(lifetime: string): string {
  const date = new Date(lifetime);
  const now = new Date();
  const diffDays = Math.ceil(
    (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays < 0) return "Expired";
  if (diffDays === 0) return "Expires today";
  if (diffDays === 1) return "1 day left";
  if (diffDays <= 7) return `${diffDays} days left`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function lifetimeColor(lifetime: string): string {
  const date = new Date(lifetime);
  const now = new Date();
  const diffDays = Math.ceil(
    (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays < 0) return "text-red-400 bg-red-900/30 border-red-800/50";
  if (diffDays <= 3)
    return "text-orange-300 bg-orange-900/30 border-orange-800/50";
  if (diffDays <= 7)
    return "text-yellow-300 bg-yellow-900/30 border-yellow-800/50";
  return "text-[var(--color-ink-muted)] bg-[var(--color-surface)] border-[var(--color-border)]";
}

export function taskProgress(tasks: CategoryItem["tasks"]): number {
  if (tasks.length === 0) return 0;
  return Math.round((tasks.filter((t) => t.done).length / tasks.length) * 100);
}
