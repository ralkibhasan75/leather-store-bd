"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { Trash2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const getDiscountedPrice = (price: number, discount: number) => {
    return discount > 0 ? price - (price * discount) / 100 : price;
  };

  const subtotal = cart.reduce(
    (acc, item) =>
      acc + getDiscountedPrice(item.price, item.discount) * item.quantity,
    0
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative hover:scale-105 transition-transform duration-200">
          <ShoppingCart className="w-6 h-6 text-[var(--color-brand)]" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
              {cart.length}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="w-full sm:w-[420px] px-5">
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold tracking-wide text-center text-[var(--color-brand)]">
            Your Cart
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex flex-col gap-4 h-[calc(100vh-200px)] overflow-y-auto pr-1">
          {cart.length === 0 ? (
            <div className="text-center text-sm text-gray-500 mt-10">
              <p>Your cart is empty.</p>
              <Link
                href="/products"
                className="text-[var(--color-brand)] underline mt-2 inline-block"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            cart.map((item) => {
              const discountedPrice = getDiscountedPrice(
                item.price,
                item.discount
              );
              return (
                <div
                  key={item._id + item.selectedSize} // ensure uniqueness per size variant
                  className="flex gap-4 border-b border-gray-200 pb-4"
                >
                  <div className="relative w-20 h-20 shrink-0">
                    <Image
                      src={item.thumbnail || item.images[0]}
                      alt={item.title}
                      fill
                      className="object-cover rounded shadow-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{item.title}</h4>
                    {item.selectedSize && (
                      <div className="mt-1">
                        <span className="inline-block text-xs text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-300 font-medium">
                          Size: {item.selectedSize}
                        </span>
                      </div>
                    )}

                    <p className="text-sm text-gray-500 mt-0.5">
                      ৳ {discountedPrice.toFixed(2)} × {item.quantity}
                    </p>
                    <div className="flex gap-2 items-center mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            item.quantity - 1,
                            item.selectedSize
                          )
                        }
                        className="w-7 h-7 border border-gray-300 rounded hover:bg-gray-100 transition"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          item.quantity < item.stock &&
                          updateQuantity(
                            item._id,
                            item.quantity + 1,
                            item.selectedSize
                          )
                        }
                        className="w-7 h-7 border border-gray-300 rounded hover:bg-gray-100 transition"
                        disabled={item.quantity >= item.stock}
                      >
                        +
                      </button>
                    </div>
                    {item.quantity >= item.stock && (
                      <p className="text-xs text-red-500 mt-1">
                        Max stock reached
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id, item.selectedSize)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="mt-6 border-t pt-4 space-y-3">
            <p className="text-sm font-medium text-gray-800 flex justify-between">
              Subtotal:
              <span className="font-bold text-[var(--color-brand)]">
                ৳ {subtotal.toFixed(2)}
              </span>
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="w-1/2 hover:bg-gray-100 transition"
              >
                <Link href="/cart">
                  <span className="flex items-center gap-2">
                    <ShoppingCart size={16} />
                    View Cart
                  </span>
                </Link>
              </Button>
              <Link href="/checkout" className="w-1/2">
                <Button className="w-full hover:bg-[#2a1f1f] text-white transition">
                  Checkout
                </Button>
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
