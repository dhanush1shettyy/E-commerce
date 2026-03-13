import React from 'react';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthCard({ children, title, subtitle }: AuthCardProps) {
  return (
    <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl transition-all sm:flex-row flex-col">
      {/* Brand Side */}
      <div className="flex w-full flex-col justify-center bg-[var(--color-brand-dark)] p-12 text-white sm:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative z-10">
          <h1 className="mb-4 text-4xl font-serif tracking-widest uppercase">Essence</h1>
          <p className="text-lg font-light text-gray-300">
            Discover your signature scent. Experience luxury with our exclusive collection of fine fragrances.
          </p>
        </div>
      </div>
      
      {/* Auth Side */}
      <div className="flex w-full flex-col justify-center p-8 sm:w-1/2 sm:p-12">
        <h2 className="mb-2 text-3xl font-serif text-[var(--color-brand-dark)]">{title}</h2>
        {subtitle && <p className="mb-8 text-gray-500">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}
