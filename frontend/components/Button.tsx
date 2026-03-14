import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'outline';
}

export function Button({ 
  children, 
  isLoading, 
  variant = 'primary', 
  className = '', 
  disabled, 
  ...props 
}: ButtonProps) {
  const baseStyles = "relative flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-[0.25em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-brand-black)] disabled:cursor-not-allowed disabled:opacity-70";
  
  const variants = {
    primary: "gold-gradient text-black shadow-[0_12px_30px_rgba(200,169,106,0.35)] hover:brightness-105 active:scale-[0.98]",
    outline: "border border-white/20 text-white/80 hover:border-[var(--color-brand-gold)] hover:text-white active:scale-[0.98]"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
      {children}
    </button>
  );
}
