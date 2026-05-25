"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ShippingPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[var(--color-brand-black)] pt-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <span className="text-sm tracking-[0.4em] uppercase text-[var(--color-brand-gold)] mb-4 block">
              Policy
            </span>
            <h1 className="font-[var(--font-playfair)] text-5xl font-bold mb-8">
              Shipping & <span className="gold-text">Delivery</span>
            </h1>
            
            <div className="space-y-12 text-white/70 leading-relaxed text-lg">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 font-[var(--font-playfair)]">Complimentary Shipping</h2>
                <p>Essence offers complimentary standard shipping on all orders over ₹5,000. For orders below this amount, a flat shipping fee of ₹250 will be applied.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 font-[var(--font-playfair)]">Delivery Times</h2>
                <ul className="list-disc pl-5 space-y-4">
                  <li><strong>Standard Delivery:</strong> 3-5 business days.</li>
                  <li><strong>Express Delivery:</strong> 1-2 business days (available for select locations).</li>
                  <li><strong>International Shipping:</strong> 7-14 business days depending on destination.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 font-[var(--font-playfair)]">Order Tracking</h2>
                <p>Once your order has been dispatched, you will receive a confirmation email containing your tracking number and a link to the courier's website to monitor your shipment's progress.</p>
              </section>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    </>
  );
}
