// src/app/products/[id]/generateMetadata.ts

import { fetchProductById } from "@/lib/api/product";
import type { Metadata } from "next";

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
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images.map((img: string) => ({ url: img })),
    },
  };
}
