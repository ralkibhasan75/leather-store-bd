"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";
import SearchSkeleton from "./SearchSkeleton";

export default function SearchResults() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/products/search?query=${encodeURIComponent(search)}`
        );
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Search failed", err);
      } finally {
        setLoading(false);
      }
    };

    if (search) fetchResults();
  }, [search]);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-xl md:text-3xl font-bold font-serif mb-6 text-[var(--color-brand)] px-2 sm:px-0">
        Search results for: <span className="capitalize">“{search}”</span>
      </h1>

      {loading ? (
        <SearchSkeleton />
      ) : products.length === 0 ? (
        <p className="text-gray-500 px-2">No products matched your search.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 px-2">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
