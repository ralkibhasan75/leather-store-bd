// src/app/products/category/[categorySlug]/page.tsx
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

async function getCategoryProducts(slug: string): Promise<Product[]> {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_SITE_URL
    }/api/products/category?slug=${encodeURIComponent(slug)}`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];

  const data = await res.json();
  return data.products;
}

export default async function CategoryPage({
  params,
}: {
  params: { categorySlug: string };
}) {
  const { categorySlug } = params;
  const categoryName = decodeURIComponent(categorySlug).replace(/-/g, " ");
  const products = await getCategoryProducts(categorySlug);

  if (!products || products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center text-gray-600">
        <h1 className="text-2xl md:text-3xl font-bold">
          No products found in “{categoryName}”
        </h1>
        <p className="mt-2 text-sm">Try exploring another category.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-[var(--color-brand)] capitalize">
        Category: {categoryName}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
