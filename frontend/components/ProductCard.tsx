"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingBag, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import type { Product } from "@/lib/api";
import { resolveProductImage } from "@/lib/productImages";
import { addToCart } from "@/lib/cartStorage";
import { toggleFavourite, isFavourite } from "@/lib/favoritesStorage";
import { Perfume } from "@/types/perfume";

interface ProductCardProps {
  product: Product;
  index?: number;
  from?: string;
}

export default function ProductCard({ product, index = 0, from }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const [favourited, setFavourited] = useState(false);
  
  const productUrl = `/shop/${product.id}${from ? `?from=${from}` : ""}`;

  useEffect(() => {
    setFavourited(isFavourite(product.id));
  }, [product.id]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Map Product to Perfume for total compatibility with backend types
    const perfume: Perfume = {
      id: product.id,
      brand_name: product.brand_name,
      model_name: product.model_name,
      description: product.description,
      price: product.price,
      image_url: resolveProductImage({ name: product.name, image: product.image }),
      gender: product.gender || 'male'
    };
    
    addToCart(perfume);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleToggleFavourite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite(product);
    setFavourited(!favourited);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative bg-[var(--color-brand-dark)] rounded-lg overflow-hidden border border-white/5 hover:border-[var(--color-brand-gold)]/30 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(200,169,106,0.1)]"
    >
      {/* Product Image & Actions Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-black">
        <Link href={productUrl} className="block w-full h-full">
          <Image
            src={resolveProductImage({ name: product.name, image: product.image })}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>

        {/* Wishlist Icon */}
        <button
          aria-label={favourited ? `Remove ${product.name} from favourites` : `Add ${product.name} to favourites`}
          onClick={handleToggleFavourite}
          className={`absolute top-4 right-4 w-9 h-9 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 z-10 ${
            favourited 
              ? "bg-[var(--color-brand-gold)] text-black" 
              : "bg-black/60 text-white/60 hover:text-[var(--color-brand-gold)] hover:bg-black/80"
          }`}
        >
          <Heart size={16} className={favourited ? "fill-current" : ""} />
        </button>

        {/* Quick Add */}
        <button
          aria-label={`Add ${product.name} to cart`}
          onClick={handleAddToCart}
          className={`absolute bottom-4 left-4 right-4 py-3 text-xs tracking-wider uppercase font-semibold flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 z-10 ${
            added 
              ? "bg-green-600 text-white" 
              : "bg-[var(--color-brand-gold)] text-black hover:bg-[var(--color-brand-gold-light)]"
          }`}
        >
          {added ? (
            "Added to Cart"
          ) : (
            <>
              <ShoppingBag size={14} />
              Add to Cart
            </>
          )}
        </button>
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-2">
        <Link href={productUrl}>
          {product.category && (
            <p className="text-[10px] tracking-[0.25em] uppercase text-[var(--color-brand-gold)] opacity-70">
              {product.category}
            </p>
          )}
          <h3 className="font-[var(--font-playfair)] text-lg font-semibold tracking-wide hover:text-[var(--color-brand-gold)] transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between pt-1">
          <p className="text-lg font-light gold-text">
            ₹{product.price.toLocaleString("en-IN")}
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

