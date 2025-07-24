"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Product = {
  _id: string;
  title: string;
  price: number;
  thumbnail: string;
  discount: number;
  slug: string;
  sizes?: string[];
};

export default function ProductCard({ product }: { product: Product }) {
  const discountedPrice = (
    product.price -
    (product.price * product.discount) / 100
  ).toFixed(2);

  const hasSizes = Array.isArray(product.sizes) && product.sizes.length > 0;

  const handleBuyNow = () => {
    if (hasSizes) {
      window.location.href = `/products/${product.slug}`;
    } else {
      window.location.href = `/checkout?slug=${product.slug}&quantity=1`;
    }
  };

  return (
    <div className="flex flex-col border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition hover:-translate-y-1 duration-200">
      {/* Image Section */}
      <Link
        href={`/products/${product.slug}`}
        className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden"
      >
        <Image
          src={product.thumbnail || "/placeholder.jpg"}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded shadow">
            -{product.discount}%
          </div>
        )}
      </Link>

      {/* Content Section */}
      <div className="flex flex-col justify-between flex-grow px-4 py-3">
        <Link href={`/products/${product.slug}`}>
          <div>
            <h3 className="text-base sm:text-lg font-semibold font-serif text-gray-800 hover:text-amber-900 line-clamp-2 mb-2">
              {product.title}
            </h3>

            {product.discount > 0 ? (
              <div className="flex items-center gap-2 mb-1">
                <div className="text-lg font-bold text-red-600">
                  Tk. {discountedPrice}
                </div>
                <div className="text-sm text-gray-500 line-through">
                  Tk. {product.price.toFixed(2)}
                </div>
              </div>
            ) : (
              <div className="text-lg font-semibold text-gray-900 mb-1">
                Tk. {product.price.toFixed(2)}
              </div>
            )}
          </div>
        </Link>

        {/* Button */}
        <button
          onClick={handleBuyNow}
          className="mt-3 border border-amber-950 text-amber-950 hover:bg-amber-950 hover:text-white text-sm px-4 py-2 rounded transition"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

{
  /* <div className="flex gap-4 mt-6">
  <button
    onClick={() =>
      (window.location.href = `/checkout?productId=${product._id}&quantity=1`)
    }
    className="border border-amber-950 text-amber-950 hover:bg-amber-950 hover:text-white px-6 py-2 rounded transition cursor-pointer"
  >
    Buy Now
  </button>
</div> */
}
