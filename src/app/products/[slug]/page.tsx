import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/ProductDetailClient";
import { fetchProductBySlug } from "@/lib/api/product";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await fetchProductBySlug(params.slug);
  if (!product) return {};

  return {
    title: `${product.title} | Leather Store BD`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await fetchProductBySlug(params.slug);
  if (!product) return notFound();

  return <ProductDetailClient product={product} />;
}
