"use client";

import { motion } from "framer-motion";
import { Search, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = [
  "Order Status", "Shipping & Delivery", "Returns & Exchanges", 
  "Product Information", "Account & Privacy", "Fragrance Advisory"
];

export default function HelpCenterPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[var(--color-brand-black)] pt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-sm tracking-[0.4em] uppercase text-[var(--color-brand-gold)] mb-4 block">
              Support
            </span>
            <h1 className="font-[var(--font-playfair)] text-5xl md:text-7xl font-bold mb-10">
              How Can We <span className="gold-text">Assist</span> You?
            </h1>
            
            <div className="max-w-xl mx-auto relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[var(--color-brand-gold)] transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search for answers..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-5 pl-12 pr-6 text-white outline-none focus:border-[var(--color-brand-gold)]/50 transition-all text-lg"
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white/5 border border-white/10 p-10 rounded-2xl hover:bg-white/10 transition-all group cursor-pointer"
              >
                <h3 className="text-xl font-bold mb-4 font-[var(--font-playfair)] group-hover:text-[var(--color-brand-gold)] transition-colors">{cat}</h3>
                <p className="text-white/40 text-sm mb-6 leading-relaxed">
                  Frequently asked questions and detailed information about {cat.toLowerCase()}.
                </p>
                <div className="flex items-center gap-2 text-[var(--color-brand-gold)] text-xs uppercase tracking-widest font-semibold">
                  Browse Articles <ChevronRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
