// components/ui/ProductTableSkeleton.tsx
export default function ProductTableSkeleton() {
  return (
    <div className="animate-pulse space-y-4 p-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 border-b py-3">
          <div className="w-20 h-20 bg-gray-200 rounded" />
          <div className="flex-1 space-y-2">
            <div className="w-1/3 h-4 bg-gray-200 rounded" />
            <div className="w-1/4 h-4 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
