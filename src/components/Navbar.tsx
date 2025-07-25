"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, LogOut, User, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import CartDrawer from "./CartDrawer";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  const router = useRouter();
  const { user, logout } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/products/all?search=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
      setQuery("");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setShowSuggestions(false);
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch("/api/products/all", { cache: "no-store" });
        const data = await res.json();
        const matched = data.products.filter((p: any) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(matched.slice(0, 5));
        setShowSuggestions(true);
      } catch (err) {
        console.error("Failed to fetch search suggestions", err);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } bg-white/60 backdrop-blur-md border-b border-gray-200 shadow-sm`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl md:text-2xl font-serif font-bold tracking-tight text-[var(--color-brand)]"
        >
          LeatherStore<span className="text-xs ml-1">BD</span>
        </Link>

        {/* Mobile Search */}
        <div className="flex-1 mx-4 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search products..."
              className="w-full pl-10 pr-3 py-2 border rounded-full text-sm shadow-sm"
            />
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={handleSearch}
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-20 mt-1 bg-white rounded shadow border w-full text-sm max-h-60 overflow-y-auto">
                {suggestions.map((p: any) => (
                  <li
                    key={p._id}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setQuery("");
                      setShowSuggestions(false);
                      router.push(`/products/${p.slug}`);
                    }}
                  >
                    {p.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Cart Drawer */}
        <div className="md:hidden items-center mx-1">
          <CartDrawer />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 flex-1 justify-end">
          {/* Home */}
          <Link href="/" className="text-sm relative group">
            <span className="text-gray-700 group-hover:text-[var(--color-brand)] transition">
              Home
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[var(--color-brand)] transition-all duration-300 group-hover:w-full" />
          </Link>

          {/* Products with Submenu */}
          <div className="relative group">
            <span className="text-sm text-gray-700 group-hover:text-[var(--color-brand)] cursor-pointer flex items-center gap-1">
              Products <ChevronDown size={14} />
            </span>
            <div className="absolute top-full left-0 mt-2 w-44 bg-white shadow-lg rounded border opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200 z-30">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/products/category/${encodeURIComponent(
                    cat.toLowerCase().replace(/\s+/g, "-")
                  )}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 capitalize"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/about" className="text-sm relative group">
            <span className="text-gray-700 group-hover:text-[var(--color-brand)] transition">
              About
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[var(--color-brand)] transition-all duration-300 group-hover:w-full" />
          </Link>

          <Link href="/contact" className="text-sm relative group">
            <span className="text-gray-700 group-hover:text-[var(--color-brand)] transition">
              Contact
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[var(--color-brand)] transition-all duration-300 group-hover:w-full" />
          </Link>

          {/* Search */}
          <div className="relative w-56">
            <input
              type="text"
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search..."
              className="w-full pl-9 pr-3 py-1.5 rounded-full border bg-white text-sm shadow-sm focus:outline-none"
            />
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={handleSearch}
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-20 mt-1 bg-white rounded shadow border w-full text-sm max-h-60 overflow-y-auto">
                {suggestions.map((p: any) => (
                  <li
                    key={p._id}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setQuery("");
                      setShowSuggestions(false);
                      router.push(`/products/${p.slug}`);
                    }}
                  >
                    {p.title}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Auth Buttons */}
          {user ? (
            <>
              <Button
                variant="outline"
                className="text-sm flex items-center gap-1 px-3"
                onClick={() => router.push("/dashboard")}
              >
                <User size={14} />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className="text-sm text-red-500 flex items-center gap-1"
                onClick={handleLogout}
              >
                <LogOut size={14} />
                Logout
              </Button>
            </>
          ) : (
            <Button
              className="bg-[var(--color-brand)] text-white text-sm px-4 py-2 rounded-full hover:bg-[#2a1f1f]"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          )}

          <CartDrawer />
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden ml-1" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden px-4 pb-4 pt-2 bg-white shadow-md border-t space-y-4">
          <Link
            href="/"
            className="block text-sm"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <details className="text-sm">
            <summary className="cursor-pointer">Products</summary>
            <div className="ml-3 mt-2 space-y-1">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/products/category/${encodeURIComponent(
                    cat.toLowerCase().replace(/\s+/g, "-")
                  )}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 capitalize"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </details>
          <Link
            href="/about"
            className="block text-sm"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block text-sm"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>

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
