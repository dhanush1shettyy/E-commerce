"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getFavourites, FAVOURITES_UPDATED_EVENT } from "@/lib/favoritesStorage";
import { Product } from "@/lib/api";

export default function FavouritesPage() {
  const [favourites, setFavourites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavourites = () => {
      setFavourites(getFavourites());
      setLoading(false);
    };

    loadFavourites();

    window.addEventListener(FAVOURITES_UPDATED_EVENT, loadFavourites);
    return () => window.removeEventListener(FAVOURITES_UPDATED_EVENT, loadFavourites);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-brand-black)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-brand-gold)]"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[var(--color-brand-black)] pt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
          >
          <span className="text-sm tracking-[0.4em] uppercase text-[var(--color-brand-gold)] mb-4 block">
            Your Collection
          </span>
          <h1 className="font-[var(--font-playfair)] text-5xl md:text-7xl font-bold mb-6">
            My <span className="gold-text">Favourites</span>
          </h1>
        </motion.div>

        <AnimatePresence mode="popLayout">
          {favourites.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {favourites.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} from="favourites" />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl"
            >
              <Heart className="mx-auto mb-6 text-white/10" size={64} />
              <p className="text-xl text-white/40 mb-8">You haven't added any fragrances to your favourites yet.</p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 gold-gradient text-black px-8 py-4 rounded-full font-bold tracking-widest uppercase text-sm hover:opacity-90 transition-opacity"
              >
                <ShoppingBag size={18} />
                Start Exploring
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
    </>
  );
}
