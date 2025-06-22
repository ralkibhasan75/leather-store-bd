"use client";

import {
  MdPolicy,
  MdAccessTime,
  MdCheckCircle,
  MdReplay,
  MdLocalShipping,
  MdHelpOutline,
} from "react-icons/md";

export default function ReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-20">
      <div className="text-center mb-10">
        <MdPolicy className="mx-auto text-5xl text-[var(--color-brand)]" />
        <h1 className="text-4xl font-bold mt-3 text-gray-900">
          Returns & Refund Policy
        </h1>
        <p className="mt-2 text-gray-600 text-sm md:text-base">
          Customer satisfaction is our top priority at Leather Store BD.
        </p>
      </div>

      {/* Return Timeframe */}
      <section className="mb-10 bg-white/60 backdrop-blur-sm border rounded-xl p-6 shadow">
        <div className="flex items-center gap-3 mb-2 text-[var(--color-brand)] font-medium">
          <MdAccessTime className="text-2xl" />
          <h2 className="text-xl">Return Timeframe</h2>
        </div>
        <p className="text-gray-700 text-sm md:text-base">
          You can return a product within <strong>7 days</strong> from the date
          of delivery.
        </p>
      </section>

      {/* Return Conditions */}
      <section className="mb-10 bg-white/60 backdrop-blur-sm border rounded-xl p-6 shadow">
        <div className="flex items-center gap-3 mb-2 text-[var(--color-brand)] font-medium">
          <MdCheckCircle className="text-2xl" />
          <h2 className="text-xl">Return Conditions</h2>
        </div>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm md:text-base">
          <li>
            The product must be unused, undamaged, and in its original
            packaging.
          </li>
          <li>Please include the original invoice or receipt.</li>
          <li>
            Customized or personalized items (e.g. name engraving) are{" "}
            <strong>not eligible</strong> for return.
          </li>
          <li>
            If the product is defective or incorrect, please contact our support
            immediately.
          </li>
        </ul>
      </section>

      {/* Refund Process */}
      <section className="mb-10 bg-white/60 backdrop-blur-sm border rounded-xl p-6 shadow">
        <div className="flex items-center gap-3 mb-2 text-[var(--color-brand)] font-medium">
          <MdReplay className="text-2xl" />
          <h2 className="text-xl">Refund Process</h2>
        </div>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm md:text-base">
          <li>
            Once we receive and inspect your return, we’ll initiate the refund
            within <strong>7 business days</strong>.
          </li>
          <li>
            Refunds will be issued to the original payment method (e.g. bKash,
            Nagad, bank transfer).
          </li>
          <li>
            Refunds are <strong>not applicable</strong> for customized products.
          </li>
        </ul>
      </section>

      {/* Return Shipping */}
      <section className="mb-10 bg-white/60 backdrop-blur-sm border rounded-xl p-6 shadow">
        <div className="flex items-center gap-3 mb-2 text-[var(--color-brand)] font-medium">
          <MdLocalShipping className="text-2xl" />
          <h2 className="text-xl">Return Shipping</h2>
        </div>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm md:text-base">
          <li>
            Customers are responsible for the return shipping cost, unless the
            product is faulty or incorrect.
          </li>
          <li>
            In case of damaged, defective, or wrong items — we will bear the
            return shipping cost.
          </li>
        </ul>
      </section>

      {/* Contact Info */}
      <section className="mb-6 bg-white/60 backdrop-blur-sm border rounded-xl p-6 shadow">
        <div className="flex items-center gap-3 mb-2 text-[var(--color-brand)] font-medium">
          <MdHelpOutline className="text-2xl" />
          <h2 className="text-xl">Need Help?</h2>
        </div>
        <ul className="text-gray-700 text-sm md:text-base space-y-1">
          <li>
            <strong>Helpline:</strong>{" "}
            <a
              href="tel:+8801560042479"
              className="text-blue-600 hover:underline"
            >
              +8801560042479
            </a>
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:leatherstorebd@gmail.com"
              className="text-blue-600 hover:underline"
            >
              leatherstorebd@gmail.com
            </a>
          </li>
          <li>
            <strong>Contact Page:</strong>{" "}
            <a
              href="https://www.leatherstorebd.com/contact"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              leatherstorebd.com/contact
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
