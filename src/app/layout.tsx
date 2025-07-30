import "@fontsource/playfair-display/400.css";
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import Footer from "@/components/Footer";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
export const metadata: Metadata = {
  title: {
    default: "Leather Store BD",
    template: "%s | Leather Store BD",
  },
  description: "Luxury handcrafted leather products made in Bangladesh.",
  metadataBase: new URL("https://leatherstorebd.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Leather Store BD",
    description: "Explore handcrafted leather wallets, belts, and accessories.",
    url: "https://leatherstorebd.com",
    siteName: "Leather Store BD",
    type: "website",
    images: [
      {
        url: "https://leatherstorebd.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Leather Store BD - Luxury Handcrafted Leather",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leather Store BD",
    description: "Explore handcrafted leather wallets, belts, and accessories.",
    images: ["https://leatherstorebd.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Schema.org Organization JSON-LD */}
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Leather Store BD",
              url: "https://leatherstorebd.com",
              logo: "https://leatherstorebd.com/logo.jpg",
              sameAs: [
                "https://www.facebook.com/profile.php?id=100089757583905",
                "https://www.instagram.com/leather_store_bd",
              ],
            }),
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-08Q7EQD2DT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-08Q7EQD2DT');
  `}
        </Script>
      </head>
      <body className="bg-[var(--color-bg)] text-[var(--color-brand)] font-serif antialiased">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="pt-20">{children}</main>
            <Footer />
            <Toaster position="top-center" reverseOrder={false} />
          </CartProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
