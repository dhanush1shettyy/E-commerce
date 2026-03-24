"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ShoppingBag, Heart } from "lucide-react";
import type { Product } from "@/lib/api";
import { resolveProductImage } from "@/lib/productImages";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative bg-[var(--color-brand-dark)] rounded-lg overflow-hidden border border-white/5 hover:border-[var(--color-brand-gold)]/30 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(200,169,106,0.1)]"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-black">
        <Image
          src={resolveProductImage({ name: product.name, image: product.image })}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Wishlist Icon */}
        <button
          aria-label={`Add ${product.name} to wishlist`}
          className="absolute top-4 right-4 w-9 h-9 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white/60 hover:text-[var(--color-brand-gold)] hover:bg-black/80 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
        >
          <Heart size={16} />
        </button>

        {/* Quick Add */}
        <button
          aria-label={`Add ${product.name} to cart`}
          className="absolute bottom-4 left-4 right-4 py-3 bg-[var(--color-brand-gold)] text-black text-xs tracking-wider uppercase font-semibold flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-[var(--color-brand-gold-light)]"
        >
          <ShoppingBag size={14} />
          Add to Cart
        </button>
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-2">
        {product.category && (
          <p className="text-[10px] tracking-[0.25em] uppercase text-[var(--color-brand-gold)] opacity-70">
            {product.category}
          </p>
        )}
        <h3 className="font-[var(--font-playfair)] text-lg font-semibold tracking-wide">
          {product.name}
        </h3>
        <div className="flex items-center justify-between pt-1">
          <p className="text-lg font-light gold-text">
            ${product.price.toFixed(2)}
          </p>
          <div className="flex items-center gap-1" aria-label={`Rating: ${product.rating} out of 5`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={
                  i < Math.floor(product.rating)
                    ? "fill-[var(--color-brand-gold)] text-[var(--color-brand-gold)]"
                    : "text-white/20"
                }
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
