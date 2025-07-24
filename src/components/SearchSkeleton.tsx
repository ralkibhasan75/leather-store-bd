"use client";

import SkeletonCard from "@/components/SkeletonCard";

export default function SearchSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <h1 className="text-xl md:text-3xl font-bold font-serif mb-6 text-[var(--color-brand)]">
        Loading search results...
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
