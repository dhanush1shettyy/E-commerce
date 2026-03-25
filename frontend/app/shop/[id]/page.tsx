"use client";

import { useEffect, useState, use } from 'react';
import styles from '../shop.module.css';
import { PerfumeDetailInfo } from '../../../types/perfume';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { addOrder, addToCart } from '@/lib/cartStorage';
import Footer from '@/components/Footer';

export default function PerfumeDetail({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [perfume, setPerfume] = useState<PerfumeDetailInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [actionMessage, setActionMessage] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchPerfume = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/shop/perfumes/${resolvedParams.id}`);
                const data = await response.json();
                setPerfume(data);
            } catch (error) {
                console.error('Failed to fetch perfume', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPerfume();
    }, [resolvedParams.id]);

    if (loading) {
        return (
            <>
                <div className={styles.pageContainer}>
                    <div className="flex justify-center items-center h-screen">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (!perfume) {
        return (
            <>
                <div className={styles.pageContainer}>
                    <h1 className="text-white text-center mt-20">Perfume Not Found</h1>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <div className={styles.pageContainer}>
                <div className={styles.container}>
                    <Link href="/shop" className="text-[#D4AF37] hover:text-white transition-colors mb-8 inline-block">
                        &larr; Back to Shop
                    </Link>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
                        <div className={styles.productImageWrapper} style={{ height: '600px' }}>
                            <Image 
                                src={perfume.image_url} 
                                alt={`${perfume.brand_name} ${perfume.model_name}`}
                                width={320}
                                height={450}
                                className={styles.bottleImg}
                                style={{ width: 'auto', height: '80%', objectFit: 'contain' }}
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className={styles.productBrand} style={{ textAlign: 'left', fontSize: '1.4rem' }}>{perfume.brand_name}</div>
                            <h1 className={styles.productTitle} style={{ textAlign: 'left', fontSize: '3.5rem', margin: '10px 0 20px', color: '#D4AF37', fontWeight: 300 }}>{perfume.model_name}</h1>
                            <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light tracking-wide">{perfume.description}</p>
                            
                            <div className="grid grid-cols-2 gap-4 mb-8 text-gray-400">
                                <div><span className="text-[#D4AF37]">Form:</span> {perfume.item_form}</div>
                                <div><span className="text-[#D4AF37]">Volume:</span> {perfume.item_volume}</div>
                                <div><span className="text-[#D4AF37]">Audience:</span> {perfume.target_audience}</div>
                                <div><span className="text-[#D4AF37]">Scent:</span> {perfume.scent}</div>
                            </div>

                            <div className="text-4xl text-white font-light mb-10 tracking-widest">
                                ₹{perfume.price.toLocaleString('en-IN')}
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        addToCart(perfume);
                                        setActionMessage("Added to cart.");
                                    }}
                                    className="bg-[#D4AF37] text-black font-semibold py-4 px-10 rounded hover:bg-white transition-colors uppercase tracking-widest text-sm w-max shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                                >
                                    Add to Cart
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        addOrder(perfume);
                                        router.push("/orders");
                                    }}
                                    className="border border-[#D4AF37] text-[#D4AF37] font-semibold py-4 px-10 rounded hover:bg-[#D4AF37] hover:text-black transition-colors uppercase tracking-widest text-sm w-max"
                                >
                                    Buy Now
                                </button>
                            </div>
                            {actionMessage && (
                                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/70">
                                    <span>{actionMessage}</span>
                                    <Link
                                        href="/cart"
                                        className="uppercase tracking-widest text-[var(--color-brand-gold)] hover:text-white transition-colors text-xs"
                                    >
                                        View cart
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
