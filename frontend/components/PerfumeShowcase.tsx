'use client';

import React from 'react';
import Image from 'next/image';

const products = [
  { 
    id: 1,
    brand: 'Dior', 
    title: 'Sauvage', 
    image: '/featured-perfume.png',
    color: 'from-blue-900 to-black'
  },
  { 
    id: 2,
    brand: 'Creed', 
    title: 'Aventus', 
    image: '/showcase-banner.png',
    color: 'from-gray-800 to-black'
  },
  { 
    id: 3,
    brand: 'Giorgio Armani', 
    title: 'Acqua Di Gio', 
    image: '/hero-perfume.png',
    color: 'from-stone-200 to-white'
  },
  { 
    id: 4,
    brand: 'Tom Ford', 
    title: 'Noir Extreme', 
    image: '/featured-perfume.png',
    color: 'from-amber-900 to-black'
  },
  { 
    id: 5,
    brand: 'Gucci', 
    title: 'Guilty Pour Homme', 
    image: '/showcase-banner.png',
    color: 'from-zinc-700 to-zinc-900'
  },
  { 
    id: 6,
    brand: 'Parfums de Marly', 
    title: 'Haltane', 
    image: '/bestseller-perfume.png',
    color: 'from-emerald-900 to-black'
  },
  { 
    id: 7,
    brand: 'Ralph Lauren', 
    title: 'Polo Blue', 
    image: '/hero-perfume.png',
    color: 'from-blue-700 to-blue-950'
  },
  { 
    id: 8,
    brand: 'Rasasi', 
    title: 'Hawas For Him', 
    image: '/showcase-banner.png',
    color: 'from-purple-900 to-black'
  },
  { 
    id: 9,
    brand: 'Viktor&Rolf', 
    title: 'Spicebomb Extreme', 
    image: '/featured-perfume.png',
    color: 'from-orange-900 to-black'
  },
  { 
    id: 10,
    brand: 'Yves Saint Laurent', 
    title: 'La Nuit de l\'Homme', 
    image: '/showcase-banner.png',
    color: 'from-gray-900 to-black'
  },
  { 
    id: 11,
    brand: 'Prada', 
    title: 'Luna Rossa Carbon', 
    image: '/hero-perfume.png',
    color: 'from-zinc-800 to-black'
  },
  { 
    id: 12,
    brand: 'Bond No. 9', 
    title: 'Bleecker Street', 
    image: '/bestseller-perfume.png',
    color: 'from-green-900 to-black'
  }
];

const PerfumeBottle = ({ product }: { product: any }) => {
  return (
    <div className={`w-full h-full relative overflow-hidden rounded-lg group`}>
      {/* Product Image */}
      <Image
        src={product.image} 
        alt={`${product.brand} ${product.title}`}
        fill
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      
      {/* Luxury Overlay */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
      
      {/* Brand Watermark (Optional classy touch) */}
      <div className="absolute top-4 left-4">
        <span className="text-[10px] tracking-[4px] text-white/40 uppercase font-light">
          {product.brand}
        </span>
      </div>
    </div>
  );
};

export default function PerfumeShowcase() {
  return (
    <section className="relative overflow-hidden bg-[#0B0B0B] py-24 px-6">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-[20%] w-[600px] h-[600px] rounded-full bg-[rgba(212,175,55,0.08)] blur-[120px]" />
        <div className="absolute bottom-0 right-[10%] w-[500px] h-[500px] rounded-full bg-[rgba(212,175,55,0.06)] blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-serif text-[#D4AF37] mb-6 tracking-[3px] drop-shadow-lg">
            LUXURY FRAGRANCES
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-6" />
          <p className="text-lg text-[rgba(212,175,55,0.7)] tracking-[2px] uppercase font-light">
            Curated Collection of Premium Men's Perfumes
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="group cursor-pointer transform transition-all duration-400 hover:-translate-y-4"
            >
              {/* Product Image Wrapper */}
              <div className="relative h-96 rounded-lg border border-[rgba(212,175,55,0.1)] overflow-hidden flex items-center justify-center mb-6 group-hover:border-[rgba(212,175,55,0.3)] group-hover:shadow-[0_0_40px_rgba(212,175,55,0.15),inset_0_0_60px_rgba(212,175,55,0.05)] transition-all duration-400">
                <PerfumeBottle product={product} />
              </div>

              {/* Product Info */}
              <div className="text-center">
                <div className="text-sm font-semibold tracking-[2px] text-[#D4AF37] mb-2 drop-shadow-md uppercase">
                  {product.brand}
                </div>
                <div className="text-lg text-[rgba(255,255,255,0.85)] font-light tracking-[1px] leading-relaxed">
                  {product.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .bottle-svg {
          width: 140px;
          height: auto;
        }
      `}</style>
    </section>
  );
}
