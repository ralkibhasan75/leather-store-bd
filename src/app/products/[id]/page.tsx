// src/app/products/[id]/page.tsx

import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/ProductDetailClient";
import { fetchProductById } from "@/lib/api/product";
import { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const product = await fetchProductById(params.id);
  if (!product) return {};

  return {
    title: `${product.title} | Leather Store BD`,
    description: product.description,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProductDetailPage({ params }: any) {
  const product = await fetchProductById(params.id);
  if (!product) return notFound();

  return <ProductDetailClient product={product} />;
}
