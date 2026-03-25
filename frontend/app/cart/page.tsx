"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  addOrdersFromCart,
  CART_STORAGE_KEY,
  CART_UPDATED_EVENT,
  CartItem,
  clearCart,
  getCartItems,
  normalizePrice,
  updateCartQuantity,
} from "@/lib/cartStorage";
import { useRouter } from "next/navigation";

const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const formatPrice = (price: number | string) => formatINR(normalizePrice(price));

const formatTotal = (value: number) => formatINR(value);

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const syncItems = () => setItems(getCartItems());
    syncItems();

    const handleStorage = (event: StorageEvent) => {
      if (event.key === CART_STORAGE_KEY) {
        syncItems();
      }
    };

    window.addEventListener(CART_UPDATED_EVENT, syncItems);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, syncItems);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const cartTotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + normalizePrice(item.price) * item.quantity,
        0
      ),
    [items]
  );

  return (
    <div className="min-h-screen bg-[var(--color-brand-black)] text-white">
      <Navbar />
      <main className="pt-28 pb-20 px-6 lg:px-12 max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/40">
              Shopping Cart
            </p>
            <h1 className="text-3xl md:text-4xl font-light tracking-wide mt-2">
              Your Cart
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/orders"
              className="text-xs uppercase tracking-widest text-white/60 hover:text-[var(--color-brand-gold)] transition-colors"
            >
              My orders
            </Link>
            <Link
              href="/shop"
              className="text-sm uppercase tracking-widest text-[var(--color-brand-gold)] hover:text-white transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="border border-white/10 rounded-2xl bg-[var(--color-brand-dark)] p-10 text-center">
            <p className="text-white/70 mb-6">
              Your cart is empty. Explore the collection to add fragrances.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center border border-[var(--color-brand-gold)] text-[var(--color-brand-gold)] px-8 py-3 text-sm uppercase tracking-widest hover:bg-[var(--color-brand-gold)] hover:text-black transition-colors"
            >
              Browse Shop
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-brand-dark)]">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/40 text-xs uppercase tracking-[0.3em] text-white/50">
                <tr>
                  <th className="px-6 py-4">Perfume</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Quantity</th>
                  <th className="px-6 py-4">Subtotal</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-white/5 text-white/80"
                  >
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-12 relative rounded-lg bg-black/40 border border-white/5 flex items-center justify-center">
                          <Image
                            src={item.image_url}
                            alt={`${item.brand_name} ${item.model_name}`}
                            fill
                            sizes="48px"
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                            {item.brand_name}
                          </p>
                          <p className="text-base text-white">
                            {item.model_name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">{formatPrice(item.price)}</td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            updateCartQuantity(item.id, item.quantity - 1)
                          }
                          className="h-8 w-8 rounded-full border border-white/15 text-white/70 hover:border-[var(--color-brand-gold)] hover:text-[var(--color-brand-gold)] transition-colors"
                          aria-label={`Remove one ${item.model_name}`}
                        >
                          -
                        </button>
                        <span className="text-sm w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateCartQuantity(item.id, item.quantity + 1)
                          }
                          className="h-8 w-8 rounded-full border border-white/15 text-white/70 hover:border-[var(--color-brand-gold)] hover:text-[var(--color-brand-gold)] transition-colors"
                          aria-label={`Add one ${item.model_name}`}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      {formatTotal(
                        normalizePrice(item.price) * item.quantity
                      )}
                    </td>
                    <td className="px-6 py-6 text-right">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.id, 0)}
                        className="text-xs uppercase tracking-widest text-white/50 hover:text-[var(--color-brand-gold)] transition-colors"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-6 py-6 text-base">
              <button
                type="button"
                onClick={() => {
                  addOrdersFromCart(items);
                  clearCart();
                  router.push("/orders");
                }}
                className="border border-[var(--color-brand-gold)] text-[var(--color-brand-gold)] px-8 py-3 text-xs uppercase tracking-widest hover:bg-[var(--color-brand-gold)] hover:text-black transition-colors"
              >
                Buy now
              </button>
              <div className="text-right">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                  Total
                </p>
                <p className="text-2xl text-white">
                  {formatTotal(cartTotal)}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
