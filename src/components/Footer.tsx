// src/components/Footer.tsx
"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#121212] text-white pt-20 pb-10 px-6 mt-32 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo + About */}
        <div>
          <h3 className="text-2xl font-serif font-bold mb-4 tracking-tight text-white">
            Leather Store
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Handcrafted leather essentials built for timeless elegance and
            modern lifestyle. Quality. Durability. Style.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-[#e5c68a] transition">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="hover:text-[#e5c68a] transition"
              >
                Products
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#e5c68a] transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#e5c68a] transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Support</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link href="/faq" className="hover:text-[#e5c68a] transition">
                FAQs
              </Link>
            </li>
            <li>
              <Link
                href="/shipping"
                className="hover:text-[#e5c68a] transition"
              >
                Shipping Info
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-[#e5c68a] transition">
                Return Policy
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="hover:text-[#e5c68a] transition"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Connect</h4>
          <div className="flex space-x-4 items-center">
            <Link
              href="https://www.facebook.com/share/173HkFCKrJ/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#e5c68a] transition"
            >
              <FaFacebookF size={20} />
            </Link>
            <Link
              href="https://wa.me/01827189625"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#e5c68a] transition"
            >
              <FaWhatsapp size={20} />
            </Link>
            <Link
              href="https://instagram.com/01827189625"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#e5c68a] transition"
            >
              <FaInstagram size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-16 border-t border-gray-800 pt-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-sm text-gray-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} Leather Store. All rights
            reserved.
          </p>

          {/* Developer Credit */}
          <p className="text-sm text-center md:text-right text-gray-400">
            Crafted with{" "}
            <span className="text-red-400 font-bold">&lt;/&gt;</span> by{" "}
            <a
              href="https://github.com/sabbir-offc"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white hover:text-[#e5c68a] underline decoration-dotted transition"
            >
              Sabbir
            </a>
          </p>
        </div>

        {/* Payment Icons */}
        <div className="mt-6 flex justify-center gap-6 items-center flex-wrap">
          <img
            src="/icons/bkash.svg"
            alt="Bkash"
            className="h-8 w-auto object-contain grayscale hover:grayscale-0 transition"
          />
          <img
            src="/icons/nagad.svg"
            alt="Nagad"
            className="h-8 w-auto object-contain grayscale hover:grayscale-0 transition"
          />
          <img
            src="/icons/rocket.png"
            alt="Rocket"
            className="h-8 w-auto object-contain grayscale hover:grayscale-0 transition"
          />
          <img
            src="/icons/cod.svg"
            alt="Cash on Delivery"
            className="h-8 w-auto object-contain grayscale hover:grayscale-0 transition"
          />
        </div>
      </div>
    </footer>
  );
}
