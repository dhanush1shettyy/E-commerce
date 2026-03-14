import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="mb-4 w-full">
        <label
          htmlFor={inputId}
          className="mb-2 block text-xs font-medium uppercase tracking-[0.3em] text-white/50"
        >
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            className={`w-full rounded-lg border bg-[var(--color-brand-black)]/70 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-200 
            ${error 
              ? 'border-red-500/70 focus:border-red-500 focus:ring-1 focus:ring-red-500/70' 
              : 'border-white/10 focus:border-[var(--color-brand-gold)] focus:ring-1 focus:ring-[var(--color-brand-gold)]'
            } ${className}`}
            {...props}
          />
          {error && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
          )}
        </div>
        {error && (
          <p className="mt-2 text-xs text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
