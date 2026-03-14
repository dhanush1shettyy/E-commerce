"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero banner"
    >
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

      {/* Hero Image (Right Side) */}
      <div className="absolute right-0 top-0 w-full md:w-1/2 h-full z-0">
        <Image
          src="/hero-perfume.png"
          alt="Luxury perfume bottle"
          fill
          className="object-cover object-center"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Hero Content (Left Side) */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 w-full py-32">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm tracking-[0.4em] uppercase text-[var(--color-brand-gold)] mb-4"
          >
            Luxury Fragrances
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-[var(--font-playfair)] text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6"
          >
            <span className="gold-text">ESSENCE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-[var(--font-playfair)] text-xl md:text-2xl italic text-white/80 mb-10"
          >
            &ldquo;Scent of Sophistication&rdquo;
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="/shop"
              className="gold-gradient text-black font-semibold text-sm tracking-wider uppercase px-8 py-4 rounded-none hover:opacity-90 transition-opacity duration-300"
            >
              Shop Now
            </a>
            <a
              href="/collections"
              className="border border-[var(--color-brand-gold)] text-[var(--color-brand-gold)] font-semibold text-sm tracking-wider uppercase px-8 py-4 rounded-none hover:bg-[var(--color-brand-gold)] hover:text-black transition-all duration-300"
            >
              Explore Collection
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-[0.3em] uppercase text-white/40">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-[1px] h-8 bg-gradient-to-b from-[var(--color-brand-gold)] to-transparent"
        />
      </motion.div>
    </section>
  );
}
