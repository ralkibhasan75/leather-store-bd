"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-24 text-center">
        <p className="text-xl">🛒 Your cart is empty</p>
        <Link href="/" className="text-brand underline mt-4 inline-block">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center border-b pb-4"
          >
            <div>
              <p className="text-lg font-medium">{item.title}</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() =>
                    item.quantity > 1 &&
                    updateQuantity(item._id, item.quantity - 1)
                  }
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-lg"
                >
                  −
                </button>
                <span className="text-base px-2">{item.quantity}</span>
                <button
                  onClick={() =>
                    item.quantity < item.stock &&
                    updateQuantity(item._id, item.quantity + 1)
                  }
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-lg"
                >
                  +
                </button>
              </div>
              {item.quantity >= item.stock && (
                <p className="text-sm text-red-500 mt-1">Max stock reached</p>
              )}
            </div>

            <div className="text-right">
              <p className="text-brand font-semibold text-lg">
                ৳ {item.price * item.quantity}
              </p>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-sm text-red-500 hover:underline mt-1"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-between items-center">
        <p className="text-xl font-bold">Total: ৳ {total.toFixed(2)}</p>
        <Link href="/checkout">
          <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900 transition">
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}
