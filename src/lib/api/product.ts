import { ProductType } from "@/types/Product";

export async function fetchProductById(
  id: string
): Promise<ProductType | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data as ProductType;
  } catch (err) {
    console.error("Failed to fetch product", err);
    return null;
  }
}

export async function fetchProductBySlug(
  slug: string
): Promise<ProductType | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.product as ProductType; // ✅ Correct
  } catch (err) {
    console.error("Failed to fetch product by slug:", err);
    return null;
  }
}

export async function fetchAllProducts(): Promise<ProductType[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/all`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) return [];

    const data = await res.json();
    return data.products as ProductType[];
  } catch (err) {
    console.error("Failed to fetch products", err);
    return [];
  }
}
