export function CategoryPageSkeleton() {
  return (
    <div className="mb-10">
      <div className="shimmer h-9 w-56 rounded-xl mb-3" />
      <div className="shimmer h-3 w-80 rounded-lg mb-6" />
      <div className="shimmer h-2 w-full rounded-full mb-10" />

      <div className="flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="shimmer h-16 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
