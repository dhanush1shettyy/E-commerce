"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
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
              Legal
            </span>
            <h1 className="font-[var(--font-playfair)] text-5xl font-bold mb-8">
              Terms of <span className="gold-text">Service</span>
            </h1>
            
            <div className="space-y-12 text-white/60 leading-relaxed text-sm">
              <section>
                <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">1. Agreement to Terms</h2>
                <p>By accessing or using the Essence website, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, please do not use our services.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">2. Product Availability</h2>
                <p>All products are subject to availability. We reserve the right to limit the quantity of any product we offer or to discontinue any product at any time without notice.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">3. Intellectual Property</h2>
                <p>The content on this website, including but not limited to text, images, logos, and fragrance descriptions, is the property of Essence and is protected by intellectual property laws.</p>
              </section>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    </>
  );
}
