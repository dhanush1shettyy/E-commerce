"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ShoppingBag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchFeaturedProduct, type Product } from "@/lib/api";

function SkeletonLoader() {
  return (
    <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="aspect-square bg-white/5 rounded-lg animate-pulse" />
        <div className="space-y-6">
          <div className="h-4 w-24 bg-white/5 rounded animate-pulse" />
          <div className="h-10 w-3/4 bg-white/5 rounded animate-pulse" />
          <div className="h-20 w-full bg-white/5 rounded animate-pulse" />
          <div className="h-8 w-32 bg-white/5 rounded animate-pulse" />
          <div className="h-5 w-40 bg-white/5 rounded animate-pulse" />
          <div className="h-14 w-48 bg-white/5 rounded animate-pulse" />
        </div>
      </div>
    </section>
  );
}

function ErrorState() {
  return (
    <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto text-center">
      <p className="text-white/40 text-lg">
        Unable to load featured product. Please try again later.
      </p>
    </section>
  );
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < Math.floor(rating)
              ? "fill-[var(--color-brand-gold)] text-[var(--color-brand-gold)]"
              : "text-white/20"
          }
        />
      ))}
      <span className="text-sm text-white/50 ml-2">{rating}</span>
    </div>
  );
}

export default function FeaturedProduct() {
  const { data: product, isLoading, isError } = useQuery<Product>({
    queryKey: ["featuredProduct"],
    queryFn: fetchFeaturedProduct,
  });

  if (isLoading) return <SkeletonLoader />;
  if (isError || !product) return <ErrorState />;

  return (
    <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto" aria-label="Featured product">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="text-sm tracking-[0.4em] uppercase text-[var(--color-brand-gold)] mb-3">
          Featured
        </p>
        <h2 className="font-[var(--font-playfair)] text-4xl md:text-5xl font-bold">
          Signature Scent
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-square bg-gradient-to-br from-[var(--color-brand-dark)] to-black rounded-lg overflow-hidden group"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </motion.div>

        {/* Product Details */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          {product.category && (
            <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-brand-gold)]">
              {product.category}
            </span>
          )}
          <h3 className="font-[var(--font-playfair)] text-3xl md:text-4xl font-bold">
            {product.name}
          </h3>
          <p className="text-white/60 leading-relaxed text-lg">
            {product.description}
          </p>
          <p className="text-3xl font-light gold-text">${product.price.toFixed(2)}</p>
          <RatingStars rating={product.rating} />
          <button
            className="flex items-center gap-3 gold-gradient text-black font-semibold text-sm tracking-wider uppercase px-8 py-4 hover:opacity-90 transition-opacity duration-300 mt-4"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag size={18} />
            Add to Cart
          </button>
        </motion.div>
      </div>
    </section>
  );
}
