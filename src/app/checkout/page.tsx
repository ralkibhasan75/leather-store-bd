// /src/app/checkout/page.tsx
import { Suspense } from "react";
import CheckoutClient from "./CheckoutClient";

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={<div className="p-10 text-center">Loading checkout...</div>}
    >
      <CheckoutClient />
    </Suspense>
  );
}
