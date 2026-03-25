"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  ORDERS_STORAGE_KEY,
  ORDERS_UPDATED_EVENT,
  OrderEntry,
  getOrders,
  normalizePrice,
  removeOrder,
  updateOrderQuantity,
} from "@/lib/cartStorage";

const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const formatPrice = (price: number | string) => formatINR(normalizePrice(price));

const formatTotal = (value: number) => formatINR(value);

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderEntry[]>([]);

  useEffect(() => {
    const syncOrders = () => setOrders(getOrders());
    syncOrders();

    const handleStorage = (event: StorageEvent) => {
      if (event.key === ORDERS_STORAGE_KEY) {
        syncOrders();
      }
    };

    window.addEventListener(ORDERS_UPDATED_EVENT, syncOrders);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(ORDERS_UPDATED_EVENT, syncOrders);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const totalSpent = useMemo(
    () =>
      orders.reduce(
        (total, order) => total + normalizePrice(order.price) * order.quantity,
        0
      ),
    [orders]
  );

  return (
    <div className="min-h-screen bg-[var(--color-brand-black)] text-white">
      <Navbar />
      <main className="pt-28 pb-20 px-6 lg:px-12 max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/40">
              Order History
            </p>
            <h1 className="text-3xl md:text-4xl font-light tracking-wide mt-2">
              My Orders
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/cart"
              className="text-xs uppercase tracking-widest text-white/60 hover:text-[var(--color-brand-gold)] transition-colors"
            >
              Back to cart
            </Link>
            <Link
              href="/shop"
              className="text-sm uppercase tracking-widest text-[var(--color-brand-gold)] hover:text-white transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="border border-white/10 rounded-2xl bg-[var(--color-brand-dark)] p-10 text-center">
            <p className="text-white/70 mb-6">
              No purchases yet. Your future favorites will show up here.
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
                  <th className="px-6 py-4">Order</th>
                  <th className="px-6 py-4">Perfume</th>
                  <th className="px-6 py-4">Qty</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Ordered</th>
                  <th className="px-6 py-4 text-right">Total</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.orderId}
                    className="border-t border-white/5 text-white/80"
                  >
                    <td className="px-6 py-6 text-xs tracking-widest text-white/50">
                      {order.orderId}
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-10 relative rounded-lg bg-black/40 border border-white/5 flex items-center justify-center">
                          <Image
                            src={order.image_url}
                            alt={`${order.brand_name} ${order.model_name}`}
                            fill
                            sizes="40px"
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                            {order.brand_name}
                          </p>
                          <p className="text-base text-white">
                            {order.model_name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            updateOrderQuantity(order.orderId, order.quantity - 1)
                          }
                          className="h-7 w-7 rounded-full border border-white/15 text-white/70 hover:border-[var(--color-brand-gold)] hover:text-[var(--color-brand-gold)] transition-colors"
                          aria-label={`Remove one ${order.model_name}`}
                        >
                          -
                        </button>
                        <span className="text-sm w-6 text-center">
                          {order.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateOrderQuantity(order.orderId, order.quantity + 1)
                          }
                          className="h-7 w-7 rounded-full border border-white/15 text-white/70 hover:border-[var(--color-brand-gold)] hover:text-[var(--color-brand-gold)] transition-colors"
                          aria-label={`Add one ${order.model_name}`}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-6">{formatPrice(order.price)}</td>
                    <td className="px-6 py-6 text-white/60">
                      {new Date(order.orderedAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-6 text-right">
                      {formatTotal(
                        normalizePrice(order.price) * order.quantity
                      )}
                    </td>
                    <td className="px-6 py-6 text-right">
                      <button
                        type="button"
                        onClick={() => removeOrder(order.orderId)}
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
              <Link
                href="/payment"
                className="border border-[var(--color-brand-gold)] text-[var(--color-brand-gold)] px-8 py-3 text-xs uppercase tracking-widest hover:bg-[var(--color-brand-gold)] hover:text-black transition-colors"
              >
                Pay now
              </Link>
              <div className="text-right">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                  Total Spent
                </p>
                <p className="text-2xl text-white">
                  {formatTotal(totalSpent)}
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
