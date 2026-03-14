"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchBestsellers, type Product } from "@/lib/api";
import ProductCard from "./ProductCard";

function GridSkeleton() {
  return (
    <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <div className="h-4 w-24 bg-white/5 rounded animate-pulse mx-auto mb-4" />
        <div className="h-10 w-64 bg-white/5 rounded animate-pulse mx-auto" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="aspect-square bg-white/5 rounded-lg animate-pulse" />
            <div className="h-4 w-3/4 bg-white/5 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-white/5 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </section>
  );
}

function ErrorState() {
  return (
    <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto text-center">
      <p className="text-white/40 text-lg">
        Unable to load bestsellers. Please try again later.
      </p>
    </section>
  );
}

export default function BestSellers() {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["bestsellers"],
    queryFn: fetchBestsellers,
  });

  if (isLoading) return <GridSkeleton />;
  if (isError || !products) return <ErrorState />;

  return (
    <section
      className="py-24 px-6 lg:px-12 max-w-7xl mx-auto"
      aria-label="Best selling products"
    >
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="text-sm tracking-[0.4em] uppercase text-[var(--color-brand-gold)] mb-3">
          Curated Selection
        </p>
        <h2 className="font-[var(--font-playfair)] text-4xl md:text-5xl font-bold">
          Best Sellers
        </h2>
      </motion.div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
