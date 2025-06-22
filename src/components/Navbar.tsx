"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import CartDrawer from "./CartDrawer";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  return (
    <header
      className={`
        w-full fixed top-0 z-50
        border-b border-[#ddd]
        backdrop-blur-md bg-[var(--color-bg)]/80
        shadow-sm px-6 py-4
      `}
    >
      
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-serif font-bold tracking-tight">
          LeatherStore<span className="text-xs align-super ml-1">BD</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:underline text-sm">
            Home
          </Link>
          <Link href="/products" className="hover:underline text-sm">
            Products
          </Link>
          <Link href="/about" className="hover:underline text-sm">
            About
          </Link>
          <Link href="/contact" className="hover:underline text-sm">
            Contact
          </Link>

          {user ? (
            <>
              <Button
                variant="outline"
                className="text-sm"
                onClick={() => router.push("/dashboard")}
              >
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className="text-sm text-red-500"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              className="bg-[var(--color-brand)] text-white hover:bg-[#2a1f1f] text-sm px-4 py-2"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          )}

          <CartDrawer />
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden mt-4 space-y-4 px-2 pb-4 bg-white rounded shadow">
          {["Home", "Products", "About", "Contact"].map((text) => (
            <Link
              key={text}
              href={`/${text.toLowerCase()}`}
              className="block text-sm"
              onClick={() => setOpen(false)}
            >
              {text}
            </Link>
          ))}

          {user ? (
            <>
              <Button
                className="w-full"
                onClick={() => {
                  setOpen(false);
                  router.push("/dashboard");
                }}
              >
                Dashboard
              </Button>
              <Button
                className="w-full bg-red-100 text-red-600"
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              className="w-full bg-[var(--color-brand)] text-white"
              onClick={() => {
                setOpen(false);
                router.push("/login");
              }}
            >
              Login
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
