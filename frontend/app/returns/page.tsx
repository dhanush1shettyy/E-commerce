"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ReturnsPage() {
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
              Returns & <span className="gold-text">Exchanges</span>
            </h1>
            
            <div className="space-y-12 text-white/70 leading-relaxed text-lg">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 font-[var(--font-playfair)]">Our Guarantee</h2>
                <p>We take immense pride in the quality of our fragrances. If you are not completely satisfied with your purchase, you may return the item within 14 days of delivery.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 font-[var(--font-playfair)]">Return Conditions</h2>
                <p>To be eligible for a return, the product must be:</p>
                <ul className="list-disc pl-5 mt-4 space-y-2">
                  <li>In its original, unopened packaging.</li>
                  <li>The cellophane seal must be intact.</li>
                  <li>Accompanying gifts or samples must also be returned.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 font-[var(--font-playfair)]">Processing Your Refund</h2>
                <p>Refunds will be processed to the original method of payment within 7-10 business days of our warehouse receiving the returned items.</p>
              </section>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    </>
  );
}
