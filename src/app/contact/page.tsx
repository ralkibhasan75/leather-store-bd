import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";
import Script from "next/script";

<Script
  type="application/ld+json"
  id="contact-structured-data"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      mainEntity: {
        "@type": "Organization",
        name: "Leather Store BD",
        url: "https://leatherstorebd.com",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+8801827189625", 
          contactType: "Customer Support",
          areaServed: "BD",
          availableLanguage: ["English", "Bengali"],
        },
      },
    }),
  }}
/>;

export const metadata: Metadata = {
  title: "Contact Leather Store BD | Customer Support & Inquiries",
  description:
    "Need help with your order? Contact Leather Store BD for fast customer support. Call, email, or send a message directly from our website.",
  keywords: [
    "Leather Store BD contact",
    "customer support",
    "leather goods help",
    "Dhaka leather store",
    "online store contact",
    "Bangladesh ecommerce support",
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
  twitter: {
    card: "summary",
    title: "Contact Leather Store BD",
    description: "Need help with your leather product order or inquiry?",
  },
  alternates: {
    canonical: "https://leatherstorebd.com/contact",
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
