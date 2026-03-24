"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-[var(--color-brand-black)] text-white">
      <Navbar />
      <main className="pt-28 pb-20 px-6 lg:px-12 max-w-4xl mx-auto">
        <div className="border border-white/10 rounded-2xl bg-[var(--color-brand-dark)] p-10">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40">
            Checkout
          </p>
          <h1 className="text-3xl md:text-4xl font-light tracking-wide mt-2">
            Payment
          </h1>
          <p className="text-white/70 mt-4 leading-relaxed">
            This is a placeholder for the payment experience. If you want a
            full checkout flow, tell me which payment gateway you plan to use
            and I will wire it up.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/orders"
              className="text-xs uppercase tracking-widest text-white/60 hover:text-[var(--color-brand-gold)] transition-colors"
            >
              Back to my orders
            </Link>
            <Link
              href="/shop"
              className="border border-[var(--color-brand-gold)] text-[var(--color-brand-gold)] px-8 py-3 text-xs uppercase tracking-widest hover:bg-[var(--color-brand-gold)] hover:text-black transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
