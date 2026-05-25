"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
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
              Privacy <span className="gold-text">Policy</span>
            </h1>
            
            <div className="space-y-12 text-white/60 leading-relaxed text-sm">
              <section>
                <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">1. Data Collection</h2>
                <p>We collect information that you provide directly to us when you create an account, make a purchase, or subscribe to our newsletter. This includes your name, email address, shipping address, and payment information.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">2. Use of Information</h2>
                <p>Your information is used to process transactions, provide customer support, and improve your shopping experience. We may also send you promotional emails about our latest collections and exclusive offers.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">3. Data Security</h2>
                <p>We implement a variety of security measures to maintain the safety of your personal information. Your sensitive information is transmitted via Secure Socket Layer (SSL) technology and encrypted into our payment provider's database.</p>
              </section>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    </>
  );
}
