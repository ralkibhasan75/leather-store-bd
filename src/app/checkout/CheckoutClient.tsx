"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Product } from "@/types";

export default function CheckoutClient() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "",
    trxId: "",
  });

  const [directProduct, setDirectProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const quantity = parseInt(searchParams.get("quantity") || "1");

  useEffect(() => {
    const productId = searchParams.get("productId");
    if (productId) {
      fetch(`/api/products/${productId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?._id) setDirectProduct(data);
        })
        .catch(() => toast.error("Failed to load product"));
    }
  }, [searchParams]);

  const getDiscountedPrice = (price: number, discount: number) => {
    return discount > 0 ? price - (price * discount) / 100 : price;
  };

  const subtotal = directProduct
    ? getDiscountedPrice(directProduct.price, directProduct.discount) * quantity
    : cart.reduce(
        (acc, item) =>
          acc + getDiscountedPrice(item.price, item.discount) * item.quantity,
        0
      );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    const { name, email, phone, address, paymentMethod, trxId } = form;

    if (!name || !email || !phone || !address || !paymentMethod) {
      toast.error("Please fill out all required fields.");
      return;
    }

    if (paymentMethod !== "Cash on Delivery" && !trxId) {
      toast.error("Please enter the transaction ID (TrxID).");
      return;
    }

    setLoading(true);

    const orderData = {
      customerInfo: { name, email, phone, address },
      payment: {
        method: paymentMethod,
        trxId: paymentMethod === "Cash on Delivery" ? null : trxId,
      },
      items: directProduct
        ? [
            {
              productId: directProduct._id,
              title: directProduct.title,
              model: directProduct.model,
              price: getDiscountedPrice(
                directProduct.price,
                directProduct.discount
              ),
              quantity,
            },
          ]
        : cart.map((item) => ({
            productId: item._id,
            title: item.title,
            model: item.model,
            price: getDiscountedPrice(item.price, item.discount),
            quantity: item.quantity,
          })),
      total: subtotal,
    };

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to place order");

      if (!directProduct) clearCart();
      router.push("/thank-you");
    } catch (error) {
      toast.error((error as Error).message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const paymentNumbers = {
    bKash: "01827189625",
    Nagad: "01827189625",
    Rocket: "01827189625",
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-10">
      {/* Order Summary */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

        {directProduct ? (
          <div className="flex gap-4 items-center border-b pb-4 mb-4">
            <div className="relative w-16 h-16 shrink-0">
              <Image
                src={directProduct.thumbnail || directProduct.images[0]}
                alt={directProduct.title}
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{directProduct.title}</p>
              <p className="text-sm text-gray-500">
                {quantity} × ৳{" "}
                {getDiscountedPrice(
                  directProduct.price,
                  directProduct.discount
                ).toFixed(2)}
              </p>
            </div>
            <p className="text-sm font-semibold">
              ৳{" "}
              {(
                getDiscountedPrice(
                  directProduct.price,
                  directProduct.discount
                ) * quantity
              ).toFixed(2)}
            </p>
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item._id}
              className="flex gap-4 items-center border-b pb-4 mb-4"
            >
              <div className="relative w-16 h-16 shrink-0">
                <Image
                  src={item.thumbnail || item.images[0]}
                  alt={item.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">
                  {item.quantity} × ৳{" "}
                  {getDiscountedPrice(item.price, item.discount).toFixed(2)}
                </p>
              </div>
              <p className="text-sm font-semibold">
                ৳{" "}
                {(
                  getDiscountedPrice(item.price, item.discount) * item.quantity
                ).toFixed(2)}
              </p>
            </div>
          ))
        )}

        <div className="mt-4 flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>৳ {subtotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Shipping + Payment Info */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Shipping & Payment</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="Shipping Address"
            value={form.address}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
          />

          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">-- Select Payment Method --</option>
            <option value="bKash">bKash</option>
            <option value="Nagad">Nagad</option>
            <option value="Rocket">Rocket</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>

          {["bKash", "Nagad", "Rocket"].includes(form.paymentMethod) && (
            <>
              <div className="text-sm text-gray-700">
                Send payment to:{" "}
                <span className="font-bold text-[var(--color-brand)]">
                  {
                    paymentNumbers[
                      form.paymentMethod as keyof typeof paymentNumbers
                    ]
                  }
                </span>
              </div>
              <input
                type="text"
                name="trxId"
                placeholder="Transaction ID (TrxID)"
                value={form.trxId}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded"
              />
            </>
          )}

          <Button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full mt-4 bg-[#4b1c1c] hover:bg-[#2a1f1f] text-white transition"
          >
            {loading ? (
              <span className="flex items-center gap-2 justify-center">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8h4z"
                  ></path>
                </svg>
                Placing Order...
              </span>
            ) : (
              "Place Order"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
