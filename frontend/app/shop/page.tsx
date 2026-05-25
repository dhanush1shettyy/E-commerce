"use client";

import { useEffect, useState, Suspense } from 'react';
import styles from './shop.module.css';
import { Perfume } from '../../types/perfume';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

function ShopContent() {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search')?.trim() ?? '';
    const [perfumes, setPerfumes] = useState<Perfume[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPerfumes = async () => {
            try {
                const endpoint = searchQuery
                    ? `http://localhost:8000/api/shop/perfumes?search=${encodeURIComponent(searchQuery)}`
                    : 'http://localhost:8000/api/shop/perfumes';
                const response = await fetch(endpoint);
                const data: Perfume[] = await response.json();
                setPerfumes(data);
            } catch (error) {
                console.error('Failed to fetch perfumes', error);
            } finally {
                setLoading(false);
            }
        };

        setLoading(true);
        fetchPerfumes();
    }, [searchQuery]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className="font-[var(--font-playfair)] text-4xl md:text-6xl font-bold tracking-tight mb-4">LUXURY <span className="gold-text">FRAGRANCES</span></h1>
                <div className={styles.divider}></div>
                <p className="text-white/60 tracking-wider">
                    {searchQuery
                        ? `Showing results for "${searchQuery}"`
                        : 'Explore our complete fragrance collection'}
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-brand-gold)]"></div>
                </div>
            ) : (
                perfumes.length === 0 ? (
                    <div className="rounded-2xl border border-[var(--color-brand-gold)]/20 bg-white/5 p-12 text-center text-[var(--color-brand-gold)]">
                        No perfumes matched your search.
                    </div>
                ) : (
                    <div className={styles.productsGrid}>
                        {perfumes.map((perfume, index) => (
                            <Link href={`/shop/${perfume.id}?from=shop`} key={perfume.id}>
                                <div
                                    className={styles.productCard}
                                    style={{ animationDelay: `${(index % 4) * 0.1}s` }}
                                >
                                    <div className={styles.productImageWrapper}>
                                        <Image
                                            src={perfume.image_url}
                                            alt={`${perfume.brand_name} ${perfume.model_name}`}
                                            width={140}
                                            height={200}
                                            className={styles.bottleImg}
                                        />
                                    </div>
                                    <div className={styles.productInfo}>
                                        <div className={styles.productBrand}>{perfume.brand_name}</div>
                                        <div className={styles.productTitle}>{perfume.model_name}</div>
                                        <div className="text-[var(--color-brand-gold)] mt-2 tracking-wider font-medium">₹{perfume.price.toLocaleString('en-IN')}</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )
            )}
        </div>
    );
}

export default function Shop() {
    return (
        <>
            <Navbar />
            <div className={styles.pageContainer + " pt-32"}>
                <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center bg-[var(--color-brand-black)]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-brand-gold)]"></div>
                    </div>
                }>
                    <ShopContent />
                </Suspense>
            </div>
            <Footer />
        </>
    );
}
