import Link from "next/link";
import React from "react";

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "mb-8" }: BreadcrumbsProps) {
  return (
    <nav className={`flex items-center gap-2 text-xs text-[var(--color-ink-faint)] ${className}`}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <React.Fragment key={index}>
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-[var(--color-amber)] transition-colors duration-200 no-underline"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-[var(--color-ink-muted)]" : ""}>
                {item.label}
              </span>
            )}
            
            {!isLast && <span>/</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
