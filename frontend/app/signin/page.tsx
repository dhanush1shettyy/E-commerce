"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signinSchema, SigninFormData } from '@/lib/validation/authSchemas';
import api from '@/lib/api';
import { AuthCard } from '@/components/AuthCard';
import { InputField } from '@/components/InputField';
import { Button } from '@/components/Button';
import { FormError } from '@/components/FormError';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Signin() {
  const router = useRouter();
  const [globalError, setGlobalError] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SigninFormData) => {
    try {
      setGlobalError('');
      const response = await api.post('/auth/signin', data);
      
      localStorage.setItem('token', response.data.access_token);
      setIsSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (error: any) {
      setGlobalError(error.message || 'Sign in failed');
    }
  };

  if (isSuccess) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4 sm:p-8">
        <AuthCard title="Welcome Back">
          <div className="flex flex-col items-center justify-center py-12 text-center">
             <div className="mb-4 rounded-full bg-green-100 p-3">
              <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900">Signed In Successfully!</h3>
            <p className="mt-2 text-gray-500">Redirecting to dashboard...</p>
          </div>
        </AuthCard>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4 sm:p-8">
      <AuthCard 
        title="Welcome Back" 
        subtitle="Sign in to your Essence account"
      >
        <FormError message={globalError} />
        
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <InputField
            label="Email Address"
            type="email"
            placeholder="jane@example.com"
            {...register('email')}
            error={errors.email?.message}
          />
          
          <InputField
            label="Password"
            type="password"
            placeholder="••••••••"
            {...register('password')}
            error={errors.password?.message}
          />
          
          <div className="mt-8">
            <Button type="submit" isLoading={isSubmitting}>
              Sign In
            </Button>
          </div>
          
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="font-medium text-[var(--color-brand-red)] hover:underline">
              Create one
            </Link>
          </p>
        </form>
      </AuthCard>
    </main>
  );
}
