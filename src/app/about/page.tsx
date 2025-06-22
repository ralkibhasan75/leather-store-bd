"use client";

import {
  FaCheckCircle,
  FaLeaf,
  FaTruck,
  FaTools,
  FaUserShield,
  FaGift,
} from "react-icons/fa";
import { PiHandWavingBold } from "react-icons/pi";
import { GiLeatherBoot, GiCutDiamond } from "react-icons/gi";
import { MdOutlineLocalOffer } from "react-icons/md";

export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-20 space-y-24">
      {/* Welcome Section */}
      <section className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4 text-4xl text-[var(--color-brand)]">
          <PiHandWavingBold />
          <h1 className="text-4xl md:text-5xl font-serif font-bold">
            Welcome to Leather Store BD
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
          Premium Leather Products in Bangladesh — handcrafted with elegance,
          built for everyday life.
        </p>
      </section>

      {/* Mission Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-semibold font-serif mb-4">
            Timeless Craftsmanship Meets Modern Style
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            Leather Store BD is your trusted destination for premium,
            handcrafted leather goods in Bangladesh. We specialize in{" "}
            <strong>100% full-grain leather</strong> wallets, belts, bags, and
            durable accessories — designed to blend timeless elegance with
            everyday practicality. Rooted in tradition and driven by detail, our
            promise is simple:{" "}
            <em>
              to deliver durable, functional, and elegant products that grow
              better with time
            </em>
            .
          </p>
        </div>
        <div className="rounded-lg overflow-hidden">
          <img
            src="https://res.cloudinary.com/dc8vqk4vw/image/upload/v1750539017/mvi88kcvlnwb0av78cnq.webp"
            alt="Crafted Leather Goods"
            className="w-full h-full object-cover shadow-md"
          />
        </div>
      </section>

      {/* Product Highlights */}
      <section className="bg-[#f9f8f6] rounded-xl p-10 shadow-sm">
        <h3 className="text-center text-2xl font-serif font-semibold mb-8">
          What Makes Our Leather Products Stand Out?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <GiLeatherBoot />,
              title: "100% Full-Grain Leather",
              desc: "Top-quality leather that improves with age.",
            },
            {
              icon: <FaTools />,
              title: "Handcrafted Locally",
              desc: "Every product is made by skilled Bangladeshi artisans.",
            },
            {
              icon: <FaLeaf />,
              title: "Eco-Friendly Sourcing",
              desc: "Ethically sourced leather for a greener future.",
            },
            {
              icon: <MdOutlineLocalOffer />,
              title: "Personalization",
              desc: "Add names or initials for a personal touch.",
            },
            {
              icon: <FaTruck />,
              title: "Nationwide Delivery",
              desc: "Fast and reliable delivery across Bangladesh.",
            },
            {
              icon: <FaUserShield />,
              title: "Assured Quality",
              desc: "Each item undergoes strict quality checks.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition"
            >
              <div className="text-3xl text-[var(--color-brand)] mb-4">
                {item.icon}
              </div>
              <h4 className="font-semibold mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Section */}
      <section>
        <h3 className="text-2xl font-serif font-semibold text-center mb-6">
          Why Choose Leather Store BD?
        </h3>
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto text-sm text-gray-700">
          {[
            "100% genuine full-grain leather",
            "Handcrafted by skilled local artisans",
            "Personalization available (name or initials)",
            "Eco-friendly and ethically sourced leather",
            "Fast home delivery across Bangladesh",
            "Quality assurance on every product",
            "Warranty provided for selected items",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <FaCheckCircle className="text-green-500 mt-1" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Gifting Section */}
      <section className="text-center bg-[var(--color-brand)] text-white py-16 px-6 rounded-xl shadow-md">
        <div className="max-w-2xl mx-auto">
          <GiCutDiamond className="text-4xl mx-auto mb-4" />
          <h3 className="text-2xl font-serif font-bold mb-2">
            Perfect for Gifting
          </h3>
          <p className="text-md mb-4">
            Whether it’s a birthday, wedding, anniversary, or corporate gift —
            our products offer a blend of beauty, function, and lasting value.
          </p>
          <FaGift className="mx-auto text-3xl" />
        </div>
      </section>

      {/* Final Call */}
      <section className="text-center">
        <h3 className="text-xl font-semibold mb-2">
          Shop Authentic Leather in Bangladesh
        </h3>
        <p className="text-gray-600">
          Explore our collection online and discover your next go-to leather
          piece at Leather Store BD.
        </p>
      </section>
    </main>
  );
}
