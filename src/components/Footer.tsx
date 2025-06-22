// src/components/Footer.tsx
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-16 pb-8 px-6 mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + Description */}
        <div>
          <h3 className="text-2xl font-serif font-semibold mb-4">
            Leather Store
          </h3>
          <p className="text-sm text-gray-300">
            Premium leather goods designed with timeless craftsmanship and
            modern elegance.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-white">
                Products
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Customer Service</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/faq" className="hover:text-white">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-white">
                Shipping
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-white">
                Returns
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
          <div className="flex space-x-4">
            <Link
              href="https://facebook.com"
              target="_blank"
              className="hover:text-[#e5c68a]"
            >
              <FaFacebookF size={20} />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              className="hover:text-[#e5c68a]"
            >
              <FaInstagram size={20} />
            </Link>
            <Link
              href="https://tiktok.com"
              target="_blank"
              className="hover:text-[#e5c68a]"
            >
              <FaTiktok size={20} />
            </Link>
          </div>
        </div>
      </div>

      
      <div className="mt-12 border-t border-gray-700 pt-6 text-sm text-center text-gray-400 space-y-2">
        <p>
          &copy; {new Date().getFullYear()} Leather Store. All rights reserved.
        </p>
        <p>
          Developed by{" "}
          <a
            href="https://github.com/sabbir-offc" // change this to your preferred link
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white underline transition"
          >
            Md. Sabbir Howlader
          </a>
        </p>
      </div>
    </footer>
  );
}
