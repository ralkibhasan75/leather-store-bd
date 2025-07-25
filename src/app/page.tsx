"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import SkeletonCard from "@/components/SkeletonCard";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen w-full">
      {/* Hero Section */}
      <section className="bg-[#f6f4f1] py-8 md:py-14 text-center px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-serif mb-6 leading-tight">
            Timeless Luxury in Every Stitch
          </h1>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-8">
            Explore handcrafted leather pieces that redefine elegance and
            durability.
          </p>
          <Button className="px-8 py-4 text-lg bg-[var(--color-brand)] hover:bg-[#2a1f1f] text-white">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-8 text-center">
          {[
            {
              icon: "👜",
              title: "Premium Leather",
              desc: "Only the finest quality materials",
            },
            {
              icon: "🚚",
              title: "Fast Delivery",
              desc: "Nationwide shipping available",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 w-full sm:w-64 border rounded shadow-sm hover:shadow-md transition"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 sm:px-6 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-semibold mb-10 text-center">
            Featured Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : products
                  .slice(0, 4)
                  .map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
          </div>
          <div className="mt-10 text-center">
            <Button
              asChild
              className="text-sm bg-transparent border border-[var(--color-brand)] text-[var(--color-brand)] hover:bg-[var(--color-brand)] hover:text-white"
            >
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-[var(--color-brand)] text-white text-center px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
          Ready to Elevate Your Style?
        </h2>
        <p className="text-base sm:text-lg mb-6">
          Shop our full collection and find your perfect piece today.
        </p>
        <Button className="bg-white text-[var(--color-brand)] px-8 py-3 text-lg hover:bg-gray-100">
          <Link href="/products">Explore Now</Link>
        </Button>
      </section>
    </main>
  );
}
