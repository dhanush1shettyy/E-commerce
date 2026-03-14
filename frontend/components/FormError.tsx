import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface FormErrorProps {
  message?: string;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;
  
  return (
    <div className="mb-4 flex items-center rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
      <AlertTriangle className="mr-2 h-4 w-4 flex-shrink-0 text-red-300" />
      <span>{message}</span>
    </div>
  );
}
