"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const openings = [
  { title: "Senior Fragrance Specialist", location: "New York / Remote", type: "Full-time" },
  { title: "E-commerce Operations Manager", location: "London", type: "Full-time" },
  { title: "Junior Perfumer", location: "Grasse, France", type: "Contract" },
  { title: "Digital Marketing Strategist", location: "Paris / Remote", type: "Full-time" },
];

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[var(--color-brand-black)] pt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <span className="text-sm tracking-[0.4em] uppercase text-[var(--color-brand-gold)] mb-4 block">
              Work With Us
            </span>
            <h1 className="font-[var(--font-playfair)] text-5xl md:text-7xl font-bold mb-6">
              Join the <span className="gold-text">Essence</span> Team
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
              We are always looking for passionate individuals who understand the art of olfactory storytelling and the value of luxury craftsmanship.
            </p>
          </motion.div>

          <div className="grid gap-6 max-w-4xl mx-auto">
            {openings.map((job, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 rounded-xl hover:border-[var(--color-brand-gold)]/40 transition-colors group cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-brand-gold)] transition-colors">{job.title}</h3>
                  <div className="flex gap-4 text-sm text-white/40">
                    <span>{job.location}</span>
                    <span>•</span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <button className="text-[var(--color-brand-gold)] text-sm tracking-widest uppercase font-semibold border border-[var(--color-brand-gold)]/20 px-6 py-3 rounded-full hover:bg-[var(--color-brand-gold)] hover:text-black transition-all">
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
