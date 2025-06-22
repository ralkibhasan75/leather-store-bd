// src/app/contact/page.tsx
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact Leather Store BD | Customer Support & Inquiries",
  description:
    "Need help with your order? Contact Leather Store BD for fast customer support. Call, email, or send a message directly from our website.",
  keywords: [
    "Leather Store BD contact",
    "customer support",
    "leather goods help",
    "Dhaka leather store",
    "online store contact",
    "bangladesh ecommerce support",
  ],
  openGraph: {
    title: "Contact Leather Store BD",
    description:
      "Reach out to Leather Store BD for order help, questions, or support.",
    url: "https://leatherstorebd.com/contact",
    siteName: "Leather Store BD",
    locale: "en_BD",
    type: "website",
  },
  alternates: {
    canonical: "https://leatherstorebd.com/contact",
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
