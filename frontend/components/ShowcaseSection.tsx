"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ShowcaseSection() {
  return (
    <section className="relative py-32 overflow-hidden" aria-label="Product showcase">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/showcase-banner.png"
          alt="Luxury perfume showcase"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <p className="text-sm tracking-[0.4em] uppercase text-[var(--color-brand-gold)]">
            Exclusive Collection
          </p>
          <h2 className="font-[var(--font-playfair)] text-4xl md:text-6xl lg:text-7xl font-bold max-w-3xl mx-auto leading-tight">
            Discover{" "}
            <span className="gold-text italic">Signature</span>{" "}
            Scents
          </h2>
          <p className="text-white/50 text-lg max-w-lg mx-auto">
            Each fragrance is a masterpiece, crafted with the rarest ingredients
            from around the globe.
          </p>
          <a
            href="/collections"
            className="inline-block border border-[var(--color-brand-gold)] text-[var(--color-brand-gold)] font-semibold text-sm tracking-wider uppercase px-10 py-4 hover:bg-[var(--color-brand-gold)] hover:text-black transition-all duration-500 mt-4"
          >
            Explore Collection
          </a>
        </motion.div>
      </div>
    </section>
  );
}
