import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/lib/queryProvider";

export const metadata: Metadata = {
  title: "ESSENCE — Luxury Fragrances",
  description:
    "Discover the finest luxury fragrances. ESSENCE offers curated perfumes crafted with the rarest ingredients for the discerning connoisseur.",
  keywords: ["luxury perfume", "fragrance", "essence", "premium scent"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--color-brand-black)] text-[var(--color-brand-white)] antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
