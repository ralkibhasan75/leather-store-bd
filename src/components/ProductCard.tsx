"use client";
import Image from "next/image";
import Link from "next/link";

type Product = {
  _id: string;
  title: string;
  price: number;
  thumbnail: string;
  discount: number;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product._id}`}
      className="group block border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition bg-white"
    >
      <div className="relative w-full h-64">
        <Image
          src={product.thumbnail || "/placeholder.jpg"}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-serif font-semibold mb-1">
          {product.title}
        </h3>
        {/* <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {product.description}
        </p> */}
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
            </>
          ) : (
            <div className="text-xl text-brand font-semibold">
              Tk. {product.price.toFixed(2)}
            </div>
          )}
        </div>
        {/* <div className="flex gap-4 mt-6">
          <button
            onClick={() =>
              (window.location.href = `/checkout?productId=${product._id}&quantity=1`)
            }
            className="border border-amber-950 text-amber-950 hover:bg-amber-950 hover:text-white px-6 py-2 rounded transition cursor-pointer"
          >
            Buy Now
          </button>
        </div> */}
      </div>
    </Link>
  );
}
