import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface FormErrorProps {
  message?: string;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;
  
  return (
    <div className="mb-4 flex items-center rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
      <AlertTriangle className="mr-2 h-4 w-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}
