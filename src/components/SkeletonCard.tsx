// src/components/SkeletonCard.tsx
export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded shadow bg-white p-4 space-y-3">
      <div className="w-full h-40 bg-gray-200 rounded" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  );
}
