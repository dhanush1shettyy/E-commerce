"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  CART_STORAGE_KEY,
  CART_UPDATED_EVENT,
  ORDERS_STORAGE_KEY,
  ORDERS_UPDATED_EVENT,
  CartItem,
  OrderEntry,
  getCartItems,
  getOrders,
  normalizePrice,
} from "@/lib/cartStorage";

const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

export default function PaymentPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<OrderEntry[]>([]);

  useEffect(() => {
    const syncData = () => {
      setCartItems(getCartItems());
      setOrders(getOrders());
    };

    syncData();

    const handleStorage = (event: StorageEvent) => {
      if (event.key === CART_STORAGE_KEY || event.key === ORDERS_STORAGE_KEY) {
        syncData();
      }
    };

    window.addEventListener(CART_UPDATED_EVENT, syncData);
    window.addEventListener(ORDERS_UPDATED_EVENT, syncData);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, syncData);
      window.removeEventListener(ORDERS_UPDATED_EVENT, syncData);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + normalizePrice(item.price) * item.quantity,
        0
      ),
    [cartItems]
  );

  const ordersTotal = useMemo(
    () =>
      orders.reduce(
        (total, order) => total + normalizePrice(order.price) * order.quantity,
        0
      ),
    [orders]
  );

  const payableTotal = cartItems.length > 0 ? cartTotal : ordersTotal;

  return (
    <div className="min-h-screen bg-[var(--color-brand-black)] text-white">
      <Navbar />
      <main className="pt-28 pb-20 px-6 lg:px-12 max-w-4xl mx-auto">
        <div className="border border-white/10 rounded-2xl bg-[var(--color-brand-dark)] p-10">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40">
            Checkout
          </p>
          <h1 className="text-3xl md:text-4xl font-light tracking-wide mt-2">
            Payment
          </h1>

          {payableTotal > 0 ? (
            <div className="mt-6 space-y-6">
              <div className="rounded-xl border border-white/10 bg-black/30 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                  Total payable
                </p>
                <p className="mt-3 text-3xl font-light text-[var(--color-brand-gold)]">
                  {formatINR(payableTotal)}
                </p>
                <p className="mt-2 text-sm text-white/60">
                  {cartItems.length > 0
                    ? "Amount from items currently in your cart"
                    : "Amount from your current orders"}
                </p>
              </div>

              <div className="grid gap-3 text-sm text-white/70">
                <div className="flex items-center justify-between rounded-lg border border-white/10 px-4 py-3">
                  <span>Cart total</span>
                  <span>{formatINR(cartTotal)}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-white/10 px-4 py-3">
                  <span>Orders total</span>
                  <span>{formatINR(ordersTotal)}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-white/70 mt-4 leading-relaxed">
              There are no payable items yet. Add products to your cart or
              create an order to continue.
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/orders"
              className="text-xs uppercase tracking-widest text-white/60 hover:text-[var(--color-brand-gold)] transition-colors"
            >
              Back to my orders
            </Link>
            <Link
              href="/shop"
              className="border border-[var(--color-brand-gold)] text-[var(--color-brand-gold)] px-8 py-3 text-xs uppercase tracking-widest hover:bg-[var(--color-brand-gold)] hover:text-black transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
