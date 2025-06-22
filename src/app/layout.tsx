import "@fontsource/playfair-display/400.css";
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Leather Store BD",
  description: "Luxury handcrafted leather products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[var(--color-bg)] text-[var(--color-brand)] font-serif antialiased">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="pt-20">{children}</main>
            <Footer />
            <Toaster position="top-center" reverseOrder={false} />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
