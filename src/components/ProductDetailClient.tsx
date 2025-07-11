"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";
import toast from "react-hot-toast";

export default function ProductDetailClient({ product }: { product: Product }) {
  console.log("object", product);
  const [selectedImage, setSelectedImage] = useState(
    product.images[0] || product.thumbnail
  );
  const { addToCart } = useCart();
  const [related, setRelated] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("");

  const hasSizes = Array.isArray(product.sizes) && product.sizes.length > 0;

  useEffect(() => {
    const fetchRelated = async () => {
      const tagParam = encodeURIComponent(product.tags.join(","));
      const res = await fetch(
        `/api/products/related?tags=${tagParam}&id=${product._id}`
      );
      if (res.ok) {
        const data = await res.json();
        setRelated(data);
      }
    };
    fetchRelated();
  }, [product]);

  const handleAddToCart = () => {
    if (hasSizes && !selectedSize) {
      toast.error("Please select a size.");
      return;
    }

    addToCart({
      ...product,
      selectedSize: hasSizes ? selectedSize : undefined,
    });
    toast.success("Added to cart");
  };

  const handleBuyNow = () => {
    if (hasSizes && !selectedSize) {
      toast.error("Please select a size.");
      return;
    }

    const url = `/checkout?slug=${product.slug}&quantity=1${
      hasSizes ? `&size=${selectedSize}` : ""
    }`;
    window.location.href = url;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-5 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Images */}
        <div>
          <div className="relative w-full aspect-square overflow-hidden group rounded-xl border">
            <Image
              src={selectedImage}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex gap-2 mt-4 flex-wrap">
            {[product.thumbnail, ...product.images].map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`relative w-20 h-20 rounded overflow-hidden ring-2 ${
                  selectedImage === img ? "ring-brand" : "ring-transparent"
                }`}
              >
                <Image
                  src={img}
                  alt={`thumb-${i}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold font-serif mb-2">
            {product.title}
          </h1>
          <p className="text-gray-500 text-sm mb-4">
            Brand: {product.brand} | Model: {product.model}
          </p>

          <div className="mb-4">
            {product.discount > 0 ? (
              <>
                <div className="text-xl text-red-600 font-bold">
                  Tk.{" "}
                  {(
                    product.price -
                    (product.price * product.discount) / 100
                  ).toFixed(2)}
                </div>
                <div className="text-sm text-gray-500 line-through">
                  Tk. {product.price.toFixed(2)}
                </div>
                <div className="text-sm text-green-700 font-medium mt-1">
                  You save {product.discount}%!
                </div>
              </>
            ) : (
              <div className="text-xl text-brand font-semibold">
                Tk. {product.price.toFixed(2)}
              </div>
            )}
          </div>

          {/* Size Selection */}
          {hasSizes && (
            <>
              <label className="block text-sm font-medium mb-1">
                Select Size
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="border px-3 py-2 rounded w-40"
              >
                <option value="">-- Select Size --</option>
                {product.sizes!.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </>
          )}

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="bg-amber-950 text-white px-6 py-2 rounded hover:bg-[#2a1f1f] transition"
            >
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="border border-amber-950 text-amber-950 hover:bg-amber-950 hover:text-white px-6 py-2 rounded transition"
            >
              Buy Now
            </button>
          </div>

          <div
            className="rich-text mt-6 text-sm leading-relaxed text-gray-800 space-y-4"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

          <p className="text-sm text-gray-600 mb-2">
            Stock:{" "}
            {product.stock > 0 ? `${product.stock} Available` : "Out of stock"}
          </p>

          <p className="text-sm text-gray-600 mb-4">
            Category: <span className="text-black">{product.category}</span>
          </p>

          <div className="text-sm text-gray-600 mb-4">
            Tags:
            {product.tags.map((tag: string, i: number) => (
              <span
                key={i}
                className="ml-2 mb-0.5 inline-block px-3 py-1 rounded-full border border-amber-800 bg-amber-50 text-amber-900 text-xs font-medium shadow-sm hover:shadow-md transition"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <h2 className="text-xl font-bold my-4">Related Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {related.map((item) => (
          <Link
            key={item._id}
            href={`/products/${item.slug}`}
            className="block group border border-gray-200 hover:border-amber-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white"
          >
            <div className="relative w-full aspect-square bg-gray-100">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-800 group-hover:text-amber-800 transition line-clamp-2">
                {item.title}
              </h3>

              {item.discount > 0 ? (
                <>
                  <div className="text-xl text-red-600 font-bold">
                    Tk.{" "}
                    {(item.price - (item.price * item.discount) / 100).toFixed(
                      2
                    )}
                  </div>
                  <div className="text-sm text-gray-500 line-through">
                    Tk. {item.price.toFixed(2)}
                  </div>
                </>
              ) : (
                <div className="text-xl text-brand font-semibold">
                  Tk. {item.price.toFixed(2)}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
