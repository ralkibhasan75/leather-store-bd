// src/app/products/page.tsx
import { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";

// ✅ Optional: SEO metadata for this page
export const metadata: Metadata = {
  title: "All Products | Leather Store",
  description:
    "Browse all premium leather goods including wallets, belts, bags and more.",
};

export default async function ProductsPage() {
  await connectDB();

  const products = await Product.find({ isActive: true }).sort({
    createdAt: -1,
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-serif font-bold mb-8">All Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
