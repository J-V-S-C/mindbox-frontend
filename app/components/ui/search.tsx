interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function Search({
  value,
  onChange,
  placeholder = "Search...",
}: SearchProps) {
  return (
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={placeholder}
      className="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-amber focus:ring-2 focus:ring-amber-border transition-all duration-200"
    />
  );
}
