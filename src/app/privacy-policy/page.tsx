// src/app/privacy/page.tsx
import {
  ShieldCheck,
  ClipboardList,
  Lock,
  CheckCircle2,
  PhoneCall,
  Mail,
} from "lucide-react";

export const metadata = {
  title: "Privacy Policy – Leather Store BD",
  description:
    "We value your privacy. Learn how Leather Store BD collects, uses, and protects your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
      <div className="text-center mb-12">
        <ShieldCheck className="mx-auto mb-4 w-10 h-10 text-[var(--color-brand)]" />
        <h1 className="text-4xl font-bold text-[var(--color-brand)]">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mt-2">
          Your privacy matters to us. We're committed to keeping your personal
          information safe and secure.
        </p>
      </div>

      <section className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <ClipboardList className="text-[var(--color-brand)]" />
          <h2 className="text-xl font-semibold">What We Collect</h2>
        </div>
        <ul className="ml-8 text-gray-700 list-disc space-y-1">
          <li>
            Your name, phone number, email, and address (for order & delivery)
          </li>
          <li>Payment info (securely handled via trusted gateways)</li>
          <li>Your preferences (to enhance your shopping experience)</li>
        </ul>
      </section>

      <section className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <Lock className="text-[var(--color-brand)]" />
          <h2 className="text-xl font-semibold">We NEVER</h2>
        </div>
        <ul className="ml-8 text-gray-700 list-disc space-y-1">
          <li>Sell or share your personal information with others</li>
          <li>Store your card or bKash/Nagad details</li>
        </ul>
      </section>

      <section className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle2 className="text-[var(--color-brand)]" />
          <h2 className="text-xl font-semibold">We Use Your Info To</h2>
        </div>
        <ul className="ml-8 text-gray-700 list-disc space-y-1">
          <li>Process your order and manage delivery</li>
          <li>Send order updates and promotional offers (if you agree)</li>
          <li>Improve your experience at Leather Store BD</li>
        </ul>
      </section>

      <section className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <ShieldCheck className="text-[var(--color-brand)]" />
          <h2 className="text-xl font-semibold">Your Info Is Safe</h2>
        </div>
        <p className="ml-8 text-gray-700">
          We use secure systems, encryption, and trusted third-party services to
          protect your data from unauthorized access.
        </p>
      </section>

      <div className="border-t pt-6 text-center text-gray-600">
        <PhoneCall className="mx-auto mb-2 text-[var(--color-brand)]" />
        <p className="font-medium">Have questions about our privacy policy?</p>
        <p>
          Call us:{" "}
          <a
            href="tel:+8801560042479"
            className="text-[var(--color-brand)] font-semibold hover:underline"
          >
            +8801560042479
          </a>
        </p>
        <p className="mt-1">
          <Mail className="inline-block mr-1 text-[var(--color-brand)]" />
          <a
            href="mailto:leatherstorebd@gmail.com"
            className="text-[var(--color-brand)] font-semibold hover:underline"
          >
            leatherstorebd@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
