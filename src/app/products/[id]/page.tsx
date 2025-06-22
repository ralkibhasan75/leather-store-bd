import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/ProductDetailClient";
import { fetchProductById } from "@/lib/api/product";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = await fetchProductById(params.id);
  if (!product) return {};

  return {
    title: `${product.title} | Leather Store BD`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await fetchProductById(params.id);
  if (!product) return notFound();

  return <ProductDetailClient product={product} />;
}
