type Props = {
  icon?: string;
  title: string;
  description: string;
  action?: React.ReactNode;
};

export function EmptyState({ icon = "◎", title, description, action }: Props) {
  return (
    <div className="flex flex-col items-center text-center py-16 px-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl">
      <div
        className="text-4xl mb-4 text-[var(--color-ink-faint)]"
        aria-hidden="true"
      >
        {icon}
      </div>
      <h3
        className="text-xl font-normal text-[var(--color-ink)] mb-2 leading-snug"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h3>
      <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed max-w-xs mb-6">
        {description}
      </p>
      {action}
    </div>
  );
}
