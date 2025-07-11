import { fetchProductBySlug } from "@/lib/api/product";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await fetchProductBySlug(params.slug);
  if (!product) return {};

  const image = product.images?.[0] || product.thumbnail || "/default-og.jpg";
  const url = `https://leatherstorebd.com/products/${params.slug}`;

  return {
    title: `${product.title} | Leather Store BD`,
    description: product.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title: product.title,
      description: product.description,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: [image],
    },
  };
}
