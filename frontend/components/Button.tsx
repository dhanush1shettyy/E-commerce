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
  const baseStyles = "relative flex w-full justify-center items-center rounded-lg px-4 py-2.5 font-medium transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[var(--color-brand-red)] text-white hover:bg-[var(--color-brand-red-hover)] active:scale-[0.98] shadow-md hover:shadow-lg",
    outline: "border-2 border-[var(--color-brand-dark)] text-[var(--color-brand-dark)] hover:bg-gray-50 active:scale-[0.98]"
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
