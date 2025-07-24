// app/products/all/page.tsx
"use client";

import { Suspense } from "react";
import SearchResults from "@/components/SearchResults";
import SearchSkeleton from "@/components/SearchSkeleton"; // ✅ import this

export default function SearchPage() {
  return (
    <main className="min-h-screen w-full px-4 py-8 md:px-6 lg:px-8">
      <Suspense fallback={<SearchSkeleton />}>
        <SearchResults />
      </Suspense>
    </main>
  );
}
