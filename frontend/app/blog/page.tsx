"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const posts = [
  {
    title: "The Art of Olfactory Layering",
    date: "May 15, 2024",
    category: "Masterclass",
    excerpt: "Learn how to combine different scents to create a unique signature fragrance that is exclusively yours.",
    image: "/featured-perfume.png",
  },
  {
    title: "Sourcing Rare Ingredients",
    date: "April 28, 2024",
    category: "Inside Essence",
    excerpt: "Journey with us to the fields of Grasse as we harvest the season's finest jasmine and lavender.",
    image: "/bestseller-perfume.png",
  },
  {
    title: "Summer Fragrance Trends 2024",
    date: "April 12, 2024",
    category: "Trends",
    excerpt: "From salty aquatic notes to vibrant citrus, explore the scents that will define this summer season.",
    image: "/hero-perfume.png",
  },
];

export default function BlogPage() {
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
              Fragrance Journal
            </span>
            <h1 className="font-[var(--font-playfair)] text-5xl md:text-7xl font-bold mb-6">
              The <span className="gold-text">Scent</span> Diary
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
              Explorations into the world of niche perfumery, expert advice, and behind-the-scenes stories from our perfumers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl mb-6">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-[10px] uppercase tracking-widest text-[var(--color-brand-gold)] border border-[var(--color-brand-gold)]/20">
                    {post.category}
                  </div>
                </div>
                <div className="space-y-3">
                  <span className="text-xs text-white/30 uppercase tracking-widest">{post.date}</span>
                  <h3 className="text-2xl font-bold font-[var(--font-playfair)] group-hover:text-[var(--color-brand-gold)] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-white/50 line-clamp-2 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  <Link href="#" className="inline-block text-xs uppercase tracking-widest text-[var(--color-brand-gold)] pt-2 border-b border-[var(--color-brand-gold)]/0 hover:border-[var(--color-brand-gold)] transition-all">
                    Read Article
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
