import Image from "next/image";
import Link from "next/link";

type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  thumbnail: string;
};

export default function ProductCard({ product }: { product: Product }) {
  console.log(product.title, product._id);
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
        <div className="text-brand font-medium">৳ {product.price}</div>
      </div>
    </Link>
  );
}
