import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Luxury Perfume Auth',
  description: 'Authentication system for luxury perfumes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--color-brand-pink)] antialiased transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
