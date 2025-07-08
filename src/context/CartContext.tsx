"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/types";
import { useAuth } from "@/context/AuthContext";

type CartItem = Product & {
  quantity: number;
  selectedSize?: string; // ✅ added
};

type CartContextType = { 
  cart: CartItem[];
  addToCart: (product: Product & { selectedSize?: string }) => void;
  updateQuantity: (
    productId: string,
    quantity: number,
    selectedSize?: string
  ) => void;
  removeFromCart: (productId: string, selectedSize?: string) => void;
  clearCart: () => void;
};   

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsed: CartItem[] = JSON.parse(savedCart);

        // 🔥 Remove duplicates based on _id + selectedSize
        const unique = parsed.filter(
          (item, index, self) =>
            index ===
            self.findIndex(
              (i) =>
                i._id === item._id &&
                (i.selectedSize ?? "") === (item.selectedSize ?? "")
            )
        );

        setCart(unique);
      } catch (e) {
        console.error("❌ Failed to parse savedCart:", e);
      }
    }
  }, []);

  useEffect(() => {
    const loadCartFromDB = async () => {
      if (!user) return;

      try {
        const res = await fetch("/api/cart/load");
        const data = await res.json();
        const dbCart: CartItem[] = data.cart;

        setCart((localCart) => {
          const merged: CartItem[] = [...localCart];

          for (const dbItem of dbCart) {
            const existing = merged.find(
              (item) =>
                item._id === dbItem._id &&
                (item.selectedSize ?? "") === (dbItem.selectedSize ?? "")
            );

            if (existing) {
              existing.quantity = Math.max(existing.quantity, dbItem.quantity);
            } else {
              merged.push(dbItem);
            }
          }

          // ✅ final deduplication
          const deduped = merged.filter(
            (item, index, self) =>
              index ===
              self.findIndex(
                (i) =>
                  i._id === item._id &&
                  (i.selectedSize ?? "") === (item.selectedSize ?? "")
              )
          );
          console.log("🧹 Deduped Cart:", deduped);

          return deduped;
        });
      } catch (error) {
        console.error("❌ Failed to load cart from DB:", error);
      }
    };

    loadCartFromDB();
  }, [user]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const saveCartToDB = async () => {
      if (!user) return;

      try {
        await fetch("/api/cart/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart }),
        });
      } catch (error) {
        console.error("❌ Failed to sync cart with DB:", error);
      }
    };

    saveCartToDB();
  }, [cart, user]);

  const addToCart = (product: Product & { selectedSize?: string }) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item._id === product._id &&
          (item.selectedSize ?? "") === (product.selectedSize ?? "")
      );

      if (existing) {
        const newQty = existing.quantity + 1;
        if (newQty > product.stock) return prev;
        return prev.map((item) =>
          item._id === product._id && item.selectedSize === product.selectedSize
            ? { ...item, quantity: newQty }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (
    productId: string,
    quantity: number,
    selectedSize?: string
  ) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === productId && item.selectedSize === selectedSize
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (productId: string, selectedSize?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item._id === productId && item.selectedSize === selectedSize)
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
};
