// src/app/products/page.tsx
import { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { fetchAllProducts } from "@/lib/api/product";

export const metadata: Metadata = {
  title: "Buy Premium Leather Products in Bangladesh | Leather Store BD",
  description:
    "Explore a wide range of premium leather wallets, belts, bags, and more. Quality craftsmanship, stylish designs, and fast delivery across Bangladesh.",
  keywords: [
    "leather products Bangladesh",
    "buy leather wallet",
    "leather bag BD",
    "leather belt",
    "premium leather goods",
    "leather store bangladesh",
  ],
  openGraph: {
    title: "Premium Leather Products | Leather Store BD",
    description:
      "Shop our collection of high-quality leather goods including wallets, belts, and accessories with fast delivery in Bangladesh.",
    url: "https://leatherstorebd.com/products",
    siteName: "Leather Store BD",
    images: [
      {
        url: "https://leatherstorebd.com/og-image.jpg", // Optional OG image
        width: 1200,
        height: 630,
        alt: "Leather Store Product Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://leatherstorebd.com/products",
  },
};

export default async function ProductsPage() {
  const products = await fetchAllProducts();

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold font-serif mb-6 text-gray-800">
        Explore Our Premium Leather Collection
      </h1>
      <p className="mb-10 text-gray-600">
        Handcrafted leather wallets, belts, bags, and accessories. Designed for
        durability, elegance, and everyday style.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </main>
  );
}
