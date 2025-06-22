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
