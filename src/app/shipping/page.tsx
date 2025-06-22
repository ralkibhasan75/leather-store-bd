// src/app/shipping/page.tsx
import {
  Truck,
  PackageCheck,
  Timer,
  BadgeDollarSign,
  RefreshCcw,
  PhoneCall,
} from "lucide-react";

export const metadata = {
  title: "Shipping Policy – Leather Store BD",
  description:
    "Fast and safe delivery of your leather goods across Bangladesh.",
};

export default function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
      <div className="text-center mb-12">
        <Truck className="mx-auto mb-4 w-10 h-10 text-[var(--color-brand)]" />
        <h1 className="text-4xl font-bold text-[var(--color-brand)]">
          Shipping Policy
        </h1>
        <p className="text-gray-600 mt-2">
          We deliver your leather goods with <strong>care</strong> and{" "}
          <strong>speed</strong> — right to your doorstep.
        </p>
      </div>

      <section className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <Timer className="text-[var(--color-brand)]" />
          <h2 className="text-xl font-semibold">Order Processing Time</h2>
        </div>
        <p className="ml-8 text-gray-700">
          All orders are processed within <strong>1–2 business days</strong>{" "}
          after confirmation.
        </p>
      </section>

      <section className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <PackageCheck className="text-[var(--color-brand)]" />
          <h2 className="text-xl font-semibold">Delivery Time</h2>
        </div>
        <ul className="ml-8 text-gray-700 list-disc space-y-1">
          <li>
            <strong>Inside Dhaka:</strong> 1-2 business days
          </li>
          <li>
            <strong>Outside Dhaka:</strong> 3–5 business days
          </li>
          <li className="text-sm italic text-gray-500">
            Delivery time may vary slightly depending on courier service
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <BadgeDollarSign className="text-[var(--color-brand)]" />
          <h2 className="text-xl font-semibold">Shipping Charges</h2>
        </div>
        <ul className="ml-8 text-gray-700 list-disc space-y-1">
          <li>
            <strong>Inside Dhaka:</strong> ৳60
          </li>
          <li>
            <strong>Outside Dhaka:</strong> ৳100
          </li>
          <li className="text-green-600 font-semibold">
            FREE delivery on orders over ৳2000!
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <RefreshCcw className="text-[var(--color-brand)]" />
          <h2 className="text-xl font-semibold">Cash on Delivery (COD)</h2>
        </div>
        <ul className="ml-8 text-gray-700 list-disc space-y-1">
          <li>Available across Bangladesh</li>
          <li>
            Please check the parcel before payment (if allowed by the courier)
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <div className="text-gray-700">
          We work with reliable courier services such as
          <span className="font-semibold text-black"> Sundarban</span>,
          <span className="font-semibold text-black"> SteadFast</span>,
          <span className="font-semibold text-black"> SA Paribahan</span>, and
          <span className="font-semibold text-black"> Pathao</span> to ensure
          safe & fast delivery.
        </div>
      </section>

      <div className="border-t pt-6 text-center text-gray-600">
        <PhoneCall className="mx-auto mb-2 text-[var(--color-brand)]" />
        <p className="font-medium">Need help with your order?</p>
        <p>
          Call us:{" "}
          <a
            href="tel:01560042479"
            className="text-[var(--color-brand)] font-semibold hover:underline"
          >
            +8801560042479
          </a>
        </p>
      </div>
    </div>
  );
}
