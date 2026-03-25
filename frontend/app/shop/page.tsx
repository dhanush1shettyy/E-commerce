"use client";

import { useEffect, useState } from 'react';
import styles from './shop.module.css';
import { Perfume } from '../../types/perfume';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Footer from '@/components/Footer';

export default function Shop() {
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
                const data = await response.json();
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
        <>
            <div className={styles.pageContainer}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h1>LUXURY FRAGRANCES</h1>
                        <div className={styles.divider}></div>
                        <p>
                            {searchQuery
                                ? `Showing results for "${searchQuery}"`
                                : "Curated Collection of Premium Men's Perfumes"}
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
                        </div>
                    ) : (
                        perfumes.length === 0 ? (
                            <div className="rounded-md border border-[#D4AF37]/20 bg-black/30 p-8 text-center text-[#D4AF37]">
                                No perfumes matched your search.
                            </div>
                        ) : (
                            <div className={styles.productsGrid}>
                                {perfumes.map((perfume, index) => (
                                    <Link href={`/shop/${perfume.id}`} key={perfume.id}>
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
                                                <div className="text-[#D4AF37] mt-2 tracking-wider">₹{perfume.price.toLocaleString('en-IN')}</div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
