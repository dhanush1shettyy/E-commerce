import React from 'react';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthCard({ children, title, subtitle }: AuthCardProps) {
  return (
    <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-brand-dark)] shadow-[0_24px_60px_rgba(0,0,0,0.55)] transition-all sm:flex-row flex-col">
      {/* Brand Side */}
      <div className="flex w-full flex-col justify-center bg-[var(--color-brand-dark)] p-12 text-white sm:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[url('/showcase-banner.png')] bg-cover bg-center mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/10 to-[var(--color-brand-gold)]/10" />
        <div className="relative z-10">
          <h1 className="mb-4 text-4xl font-[var(--font-playfair)] tracking-[0.35em] uppercase gold-text">Essence</h1>
          <p className="text-lg font-light text-white/70">
            Discover your signature scent. Experience luxury with our exclusive collection of fine fragrances.
          </p>
        </div>
      </div>
      
      {/* Auth Side */}
      <div className="flex w-full flex-col justify-center bg-[var(--color-brand-black)]/60 p-8 sm:w-1/2 sm:p-12 sm:border-l sm:border-white/5">
        <h2 className="mb-2 text-3xl font-[var(--font-playfair)] text-white">{title}</h2>
        {subtitle && <p className="mb-8 text-white/60">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}
